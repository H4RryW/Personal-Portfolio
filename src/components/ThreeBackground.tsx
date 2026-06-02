/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);

  // References to keep track of scene components during animation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const wireMeshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshOuterRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Mouse hover state for parallax effect
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Initial Dimensions via container bounds
    let width = container.clientWidth || 300;
    let height = container.clientHeight || 300;

    // 2. Setup standard Three.js pipeline
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Ambient dark fog for depth cueing
    scene.fog = new THREE.FogExp2(0x080808, 0.035);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 4, 10);
    camera.lookAt(0, 1, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // 3. Add game editor infinite Grid
    const gridHelper = new THREE.GridHelper(40, 40, 0xff4e00, 0x1c1c1c);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // 4. Create geometric wireframe shapes representing architectural design
    const innerGeom = new THREE.IcosahedronGeometry(2, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff4e00,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(innerGeom, innerMat);
    wireMesh.position.y = 1;
    scene.add(wireMesh);
    wireMeshRef.current = wireMesh;

    const outerGeom = new THREE.DodecahedronGeometry(3.5, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xff6622,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireMeshOuter = new THREE.Mesh(outerGeom, outerMat);
    wireMeshOuter.position.y = 1;
    scene.add(wireMeshOuter);
    wireMeshOuterRef.current = wireMeshOuter;

    // 5. Create atmospheric particle dust (representing engine micro-particles)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      // spread in a box around the scene
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 12 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speeds.push(0.01 + Math.random() * 0.015);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff4e00,
      size: 0.06,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 6. Handle Mouse Movement for parallax orbit
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      // scale limits
      mouseRef.current.targetX = x * 2.5;
      mouseRef.current.targetY = y * 1.5;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // 7. Resize Observer for fluid responsiveness without hardcoded windows sizes
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const w = entry.contentRect.width || container.clientWidth;
      const h = entry.contentRect.height || container.clientHeight;

      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 8. Animation loop
    const animate = () => {
      // Interpolate mouse targets for cinematic inertia (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Slowly rotate 3D wireframe models
      if (wireMesh) {
        wireMesh.rotation.y += 0.003;
        wireMesh.rotation.x += 0.0015;
      }
      if (wireMeshOuter) {
        wireMeshOuter.rotation.y -= 0.0015;
        wireMeshOuter.rotation.z += 0.001;
      }

      // Slightly orbit camera based on mouse coordinates (Parallax effect)
      if (camera) {
        camera.position.x = mouseRef.current.x;
        camera.position.y = 4 + mouseRef.current.y;
        camera.lookAt(0, 1, 0);
      }

      // Update and lift particles
      if (particles) {
        const positionAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
        const array = positionAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          array[i * 3 + 1] += speeds[i]; // lift up
          if (array[i * 3 + 1] > 10) {
            array[i * 3 + 1] = -2; // restart at the grid floor
          }
        }
        positionAttr.needsUpdate = true;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    // Cleanup resources
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      innerGeom.dispose();
      innerMat.dispose();
      outerGeom.dispose();
      outerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full min-h-[500px] overflow-hidden -z-10 bg-[#080808]">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent pointer-none" />
    </div>
  );
};
