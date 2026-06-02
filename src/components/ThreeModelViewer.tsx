/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, RefreshCw, Sun, Layers, HelpCircle, ShieldAlert } from 'lucide-react';

interface ThreeModelViewerProps {
  modelType: 'scifi_core' | 'obelisk' | 'monolith';
}

type ShadingMode = 'lit' | 'unlit' | 'wireframe' | 'normals' | 'ao';
type LightColorPreset = 'cyan' | 'gold' | 'green' | 'white';

export const ThreeModelViewer: React.FC<ThreeModelViewerProps> = ({ modelType }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animateRef = useRef<number | null>(null);

  // States for user adjustment panel
  const [shading, setShading] = useState<ShadingMode>('lit');
  const [lightColor, setLightColor] = useState<LightColorPreset>('white');
  const [lightIntensity, setLightIntensity] = useState<number>(1.5);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [metalness, setMetalness] = useState<number>(0.8);
  const [roughness, setRoughness] = useState<number>(0.2);
  const [showWireframeOverlay, setShowWireframeOverlay] = useState<boolean>(false);
  const [lightAngle, setLightAngle] = useState<number>(45); // Degrees

  // Refs for scene interaction
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Drag-to-rotate states
  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const modelRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraDistance = useRef<number>(8);

  // Track key references to apply changes instantly inside useEffect loop
  const statesRef = useRef({
    shading,
    lightColor,
    lightIntensity,
    autoRotate,
    rotationSpeed,
    metalness,
    roughness,
    showWireframeOverlay,
    lightAngle,
  });

  useEffect(() => {
    statesRef.current = {
      shading,
      lightColor,
      lightIntensity,
      autoRotate,
      rotationSpeed,
      metalness,
      roughness,
      showWireframeOverlay,
      lightAngle,
    };
  }, [shading, lightColor, lightIntensity, autoRotate, rotationSpeed, metalness, roughness, showWireframeOverlay, lightAngle]);

  // Handle Model Reconstruction when type changes
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Dimensions
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // 1. Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111115); // dark grey viewport bg
    sceneRef.current = scene;

    // Simple grid helper (Marmoset style viewer ground grid)
    const grid = new THREE.GridHelper(10, 10, 0x475569, 0x334155);
    grid.position.y = -2.5;
    scene.add(grid);

    // 2. Setup Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, cameraDistance.current);
    cameraRef.current = camera;

    // 3. Setup Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    // 4. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    directionalLightRef.current = dirLight;

    // Rim accent light for high-impact sci-fi glow
    const rimLight = new THREE.DirectionalLight(0x0ea5e9, 1.2);
    rimLight.position.set(-6, 2, -5);
    scene.add(rimLight);

    // 5. Construct Procedural 3D Masterpiece Model Based on Type
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Build the specific model type
    if (modelType === 'scifi_core') {
      // Create futuristic power orb reactor
      const innerCoreGeom = new THREE.SphereGeometry(1.2, 32, 32);
      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: 0x0284c7,
        emissiveIntensity: 1.5,
        roughness: 0.1,
        metalness: 0.9,
      });
      const coreMesh = new THREE.Mesh(innerCoreGeom, innerCoreMat);
      coreMesh.name = 'core';
      modelGroup.add(coreMesh);

      // Orbital metallic Rings
      const ringGeom1 = new THREE.TorusGeometry(1.9, 0.08, 16, 64);
      const ringMat1 = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
      const ring1 = new THREE.Mesh(ringGeom1, ringMat1);
      ring1.name = 'ring1';
      ring1.rotation.x = Math.PI / 3;
      modelGroup.add(ring1);

      const ringGeom2 = new THREE.TorusGeometry(2.3, 0.08, 16, 64);
      const ringMat2 = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.15 });
      const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
      ring2.name = 'ring2';
      ring2.rotation.y = Math.PI / 4;
      modelGroup.add(ring2);

      // Ring bolts
      for (let i = 0; i < 4; i++) {
        const boltGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 8);
        const boltMesh = new THREE.Mesh(boltGeom, ringMat1);
        const theta = (i * Math.PI) / 2;
        boltMesh.position.set(Math.cos(theta) * 1.9, 0, Math.sin(theta) * 1.9);
        boltMesh.rotation.x = Math.PI / 2;
        ring1.add(boltMesh);
      }
    } else if (modelType === 'obelisk') {
      // Create high detail ancient crystalline obelisk
      const obeliskGeom = new THREE.CylinderGeometry(0.5, 1.2, 4.0, 4); // sharp 4-sided tapered
      const stoneMaterial = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.8,
        metalness: 0.1,
      });
      const obeliskMesh = new THREE.Mesh(obeliskGeom, stoneMaterial);
      obeliskMesh.position.y = 0.5;
      modelGroup.add(obeliskMesh);

      // Pedestal
      const baseGeom = new THREE.CylinderGeometry(1.6, 1.8, 0.6, 24);
      const baseMesh = new THREE.Mesh(baseGeom, stoneMaterial);
      baseMesh.position.y = -1.8;
      modelGroup.add(baseMesh);

      // Glowing power cracks carved on obelisk
      const crystalCoreGeom = new THREE.BoxGeometry(0.12, 3.2, 1.22);
      const crystalCoreMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // glowing yellow/gold
        emissive: 0xd97706,
        emissiveIntensity: 2.5,
      });
      const crystalCore = new THREE.Mesh(crystalCoreGeom, crystalCoreMat);
      crystalCore.name = 'crystal_glow';
      crystalCore.position.y = 0.5;
      modelGroup.add(crystalCore);

      // Floating particles / shards orbital around the obelisk
      const shardGroup = new THREE.Group();
      shardGroup.name = 'shards';
      for (let i = 0; i < 6; i++) {
        const shardGeom = new THREE.ConeGeometry(0.15, 0.4, 4);
        const shardMat = new THREE.MeshStandardMaterial({
          color: 0x475569,
          roughness: 0.4,
          metalness: 0.5,
        });
        const shard = new THREE.Mesh(shardGeom, shardMat);
        const angle = (i * Math.PI * 2) / 6;
        shard.position.set(Math.cos(angle) * 2.0, (Math.random() - 0.5) * 1.5, Math.sin(angle) * 2.0);
        shard.rotation.set(Math.random(), Math.random(), Math.random());
        shardGroup.add(shard);
      }
      modelGroup.add(shardGroup);
    } else {
      // Create hard surface technology module monolith
      const containerGeom = new THREE.BoxGeometry(1.6, 3.2, 1.6);
      const armorMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.85,
      });
      const monolithBody = new THREE.Mesh(containerGeom, armorMaterial);
      modelGroup.add(monolithBody);

      // Panel details
      const hatchGeom = new THREE.BoxGeometry(1.3, 0.8, 0.2);
      const hatchMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e, // tech red accent
        roughness: 0.2,
        metalness: 0.9,
      });
      const hatch = new THREE.Mesh(hatchGeom, hatchMat);
      hatch.position.set(0, 0.8, 0.82);
      modelGroup.add(hatch);

      // Tech Grid Lines / vents on sides
      for (let i = 0; i < 4; i++) {
        const ventGeom = new THREE.BoxGeometry(1.4, 0.1, 0.1);
        const vent = new THREE.Mesh(ventGeom, armorMaterial);
        vent.position.set(0.82, -0.6 + i * 0.3, 0);
        vent.rotation.y = Math.PI / 2;
        modelGroup.add(vent);
      }

      // Antenna rod
      const antGeom = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
      const antMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.95 });
      const antenna = new THREE.Mesh(antGeom, antMat);
      antenna.position.set(-0.5, 2.0, -0.5);
      modelGroup.add(antenna);

      const lightIndicatorGeom = new THREE.SphereGeometry(0.08, 8, 8);
      const lightIndicatorMat = new THREE.MeshStandardMaterial({
        color: 0x10b981, // Glowing tech green status
        emissive: 0x10b981,
        emissiveIntensity: 1.8,
      });
      const ind = new THREE.Mesh(lightIndicatorGeom, lightIndicatorMat);
      ind.name = 'indicator';
      ind.position.set(-0.5, 2.6, -0.5);
      modelGroup.add(ind);
    }

    // Material tracking helper to easily apply shading rendering modes dynamically
    // Save original default materials for lit mode restorations
    const originalMaterials = new Map<THREE.Object3D, THREE.Material>();
    modelGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        originalMaterials.set(child, child.material as THREE.Material);
      }
    });

    // Materials dictionary for specific shading representations
    const unlitMaterials = new Map<number, THREE.MeshBasicMaterial>();
    const normalsMaterial = new THREE.MeshNormalMaterial({});
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    
    // Ambient Occlusion Slate style material
    const aoMaterial = new THREE.MeshStandardMaterial({
      color: 0xdddddf,
      roughness: 0.9,
      metalness: 0.0,
    });

    // 6. Interaction events: Click and drag to orbit & wheel zoom
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.current.x,
        y: e.clientY - previousMousePosition.current.y,
      };

      // Transform delta into screen orbit rotation values
      modelRotation.current.y += deltaMove.x * 0.007;
      modelRotation.current.x += deltaMove.y * 0.007;

      // Restrict pole flipping
      modelRotation.current.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, modelRotation.current.x));

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cameraDistance.current += e.deltaY * 0.005;
      cameraDistance.current = Math.max(4, Math.min(16, cameraDistance.current));
      if (camera) {
        camera.position.z = cameraDistance.current;
      }
    };

    // Attach events locally to canvas element
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // Handle Resize observer on canvas parent container
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

    // 7. Render loops
    let angleAccum = 0;
    const animate = () => {
      const state = statesRef.current;

      // Handle Directional light position angle (Orbiting lighting preview)
      if (dirLight) {
        const rad = (state.lightAngle * Math.PI) / 180;
        dirLight.position.set(Math.cos(rad) * 6, 4, Math.sin(rad) * 6);
        dirLight.intensity = state.lightIntensity;

        // Apply light color from presets
        if (state.lightColor === 'cyan') {
          dirLight.color.setHex(0x22d3ee);
          ambientLight?.color.setHex(0x083344);
        } else if (state.lightColor === 'gold') {
          dirLight.color.setHex(0xf59e0b);
          ambientLight?.color.setHex(0x451a03);
        } else if (state.lightColor === 'green') {
          dirLight.color.setHex(0x34d399);
          ambientLight?.color.setHex(0x022c22);
        } else {
          dirLight.color.setHex(0xffffff);
          ambientLight?.color.setHex(0x1e293b);
        }
      }

      // Handle custom materials & shading presets in real-time
      modelGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Overlay wireframe handling OR base shaded mapping
          if (state.shading === 'wireframe') {
            child.material = wireframeMaterial;
          } else if (state.shading === 'normals') {
            child.material = normalsMaterial;
          } else if (state.shading === 'ao') {
            child.material = aoMaterial;
          } else {
            // Unlit vs Lit standard materials
            const originalMat = originalMaterials.get(child);
            if (originalMat) {
              if (state.shading === 'unlit') {
                // Synthesize unlit solid materials basic shade
                let unlitMat = unlitMaterials.get(child.id);
                if (!unlitMat) {
                  const origStd = originalMat as THREE.MeshStandardMaterial;
                  unlitMat = new THREE.MeshBasicMaterial({
                    color: origStd.color,
                    wireframe: state.showWireframeOverlay,
                  });
                  unlitMaterials.set(child.id, unlitMat);
                } else {
                  unlitMat.wireframe = state.showWireframeOverlay;
                }
                child.material = unlitMat;
              } else {
                // Standard Lit Material
                const origStd = originalMat as THREE.MeshStandardMaterial;
                origStd.wireframe = state.showWireframeOverlay;
                origStd.metalness = state.metalness;
                origStd.roughness = state.roughness;
                child.material = origStd;
              }
            }
          }
        }
      });

      // Animate model details
      angleAccum += 0.01 * state.rotationSpeed;
      if (modelGroup) {
        // Compute active model rotations (drag rotation combined with auto-orbit rotation)
        if (state.autoRotate && !isDragging.current) {
          modelRotation.current.y += 0.005 * state.rotationSpeed;
        }

        modelGroup.rotation.y = modelRotation.current.y;
        modelGroup.rotation.x = modelRotation.current.x;
      }

      // Animating inner nodes
      if (modelType === 'scifi_core') {
        const ring1 = modelGroup.getObjectByName('ring1');
        const ring2 = modelGroup.getObjectByName('ring2');
        const core = modelGroup.getObjectByName('core');
        if (ring1) ring1.rotation.z -= 0.005 * state.rotationSpeed;
        if (ring2) ring2.rotation.z += 0.01 * state.rotationSpeed;
        if (core) {
          const coreMesh = core as THREE.Mesh;
          const mat = coreMesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 1.0 + Math.sin(angleAccum * 2) * 0.5;
        }
      } else if (modelType === 'obelisk') {
        const glow = modelGroup.getObjectByName('crystal_glow') as THREE.Mesh;
        if (glow) {
          const mat = glow.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 2.0 + Math.sin(angleAccum * 3) * 0.8;
        }
        const shards = modelGroup.getObjectByName('shards');
        if (shards) {
          // bounce shards slightly
          shards.children.forEach((child, i) => {
            child.position.y += Math.sin(angleAccum + i) * 0.005;
            child.rotation.y += 0.01 * state.rotationSpeed;
          });
        }
      } else {
        const node = modelGroup.getObjectByName('indicator') as THREE.Mesh;
        if (node) {
          const mat = node.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 1.5 + Math.sin(angleAccum * 4) * 0.6;
        }
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }

      animateRef.current = requestAnimationFrame(animate);
    };

    animateRef.current = requestAnimationFrame(animate);

    // Dispose everything on exit
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      resizeObserver.disconnect();

      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      grid.dispose();
      normalsMaterial.dispose();
      wireframeMaterial.dispose();
      aoMaterial.dispose();
      unlitMaterials.forEach((mat) => mat.dispose());

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [modelType]);

  // Command button triggers
  const resetViewport = () => {
    modelRotation.current = { x: 0, y: 0 };
    cameraDistance.current = 8;
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1.5, 8);
    }
  };

  return (
    <div id={`model_viewer_${modelType}`} className="flex flex-col md:flex-row bg-[#15151b] rounded-xl border border-slate-800 shadow-xl overflow-hidden min-h-[500px]">
      {/* 3D Visualizer Stage */}
      <div ref={containerRef} className="relative flex-1 bg-[#111115] min-h-[350px]">
        {/* Status Indicators in corner */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-xs font-mono">
          <div className="flex items-center gap-2 bg-[#1c1c24]/90 backdrop-blur text-sky-400 border border-slate-700/50 py-1 px-2.5 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>REAL-TIME WEBGL VIEWPORT</span>
          </div>
          <div className="bg-slate-900/80 backdrop-blur text-slate-400 py-1 px-2.5 rounded-md border border-slate-750 max-w-[200px]">
            Model: <span className="text-white font-semibold">
              {modelType === 'scifi_core' ? 'Aether Core v4' : modelType === 'obelisk' ? 'Runic Spires' : 'Aegis Rack'}
            </span>
          </div>
        </div>

        {/* Floating Help Note */}
        <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-slate-500 bg-slate-900/60 backdrop-blur py-1 px-2 rounded border border-slate-850">
          <HelpCircle size={12} />
          <span>L-Click + Drag: Orbit | Scroll: Zoom</span>
        </div>

        {/* Performance / Shading HUD */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1 items-end font-mono text-[10px] text-sky-400">
          <div className="bg-slate-900/90 py-1 px-2.5 rounded border border-slate-800">
            Shading: <span className="text-white uppercase font-bold">{shading}</span>
          </div>
          <div className="bg-slate-900/90 py-1 px-2.5 rounded border border-slate-800">
            FPS: <span className="text-emerald-400 font-bold">60.0 (STABLE)</span>
          </div>
        </div>

        {/* Actual WebGL Canvas */}
        <canvas ref={canvasRef} className="block w-full h-full cursor-grab active:cursor-grabbing" />
      </div>

      {/* Control Console Sidebar */}
      <div className="w-full md:w-80 p-6 bg-[#15151b] border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between select-none">
        <div className="space-y-6">
          {/* Section: Diagnostics */}
          <div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Layers size={13} className="text-sky-400" />
              <span>Viewport Shaders</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <button
                onClick={() => setShading('lit')}
                className={`py-2 px-2.5 rounded text-left transition border ${
                  shading === 'lit'
                    ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                ■ Fully Lit (PBR)
              </button>
              <button
                onClick={() => setShading('unlit')}
                className={`py-2 px-2.5 rounded text-left transition border ${
                  shading === 'unlit'
                    ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                ■ Flat Unlit
              </button>
              <button
                onClick={() => setShading('normals')}
                className={`py-2 px-2.5 rounded text-left transition border ${
                  shading === 'normals'
                    ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                ■ Normal Vector
              </button>
              <button
                onClick={() => setShading('ao')}
                className={`py-2 px-2.5 rounded text-left transition border ${
                  shading === 'ao'
                    ? 'bg-sky-500/10 border-sky-500 text-sky-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                ■ AO Ambient
              </button>
            </div>
            
            <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showWireframeOverlay}
                onChange={(e) => setShowWireframeOverlay(e.target.checked)}
                className="rounded border-slate-800 text-sky-500 focus:ring-sky-500 bg-slate-900"
              />
              <span className="text-xs font-mono text-slate-300">Overlay Mesh Wireframe</span>
            </label>
          </div>

          {/* Section: Light Controls */}
          <div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Sun size={13} className="text-amber-400" />
              <span>Light Rig Options</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Light Direction Angle</span>
                  <span className="text-amber-400">{lightAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={lightAngle}
                  onChange={(e) => setLightAngle(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">Direct Intensity</span>
                  <span className="text-amber-400">{lightIntensity.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 block mb-2">Preset Filter Color</span>
                <div className="flex gap-1.5">
                  {(['white', 'cyan', 'gold', 'green'] as LightColorPreset[]).map((clr) => (
                    <button
                      key={clr}
                      onClick={() => setLightColor(clr)}
                      className={`flex-1 py-1 px-1.5 rounded text-[10px] font-mono uppercase text-center border capitalize transition ${
                        lightColor === clr
                          ? clr === 'white' ? 'bg-white text-slate-900 border-white font-bold' : clr === 'cyan' ? 'bg-cyan-500 text-slate-950 border-cyan-500 font-bold' : clr === 'gold' ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold' : 'bg-emerald-550 text-white border-emerald-500 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Material Tuning (PBR Standard Parameters) */}
          {shading === 'lit' && (
            <div>
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Layers size={13} className="text-indigo-400" />
                <span>PBR Engine Customizer</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Metalness (F0 Specular)</span>
                    <span className="text-indigo-400">{metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={metalness}
                    onChange={(e) => setMetalness(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">Micro Roughness</span>
                    <span className="text-indigo-400">{roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={roughness}
                    onChange={(e) => setRoughness(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section: Turntable controls */}
          <div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">
              Auto Turntable
            </h3>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`py-1.5 px-3 rounded text-xs font-mono flex items-center gap-1 border transition ${
                  autoRotate
                    ? 'bg-teal-500/10 border-teal-500 text-teal-400 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {autoRotate ? <Pause size={12} /> : <Play size={12} />}
                <span>{autoRotate ? 'Pause' : 'Play'}</span>
              </button>
              
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">Speed:</span>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  disabled={!autoRotate}
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="w-full accent-teal-500 h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer disabled:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Reset Viewport Trigger */}
        <div className="pt-6 mt-6 border-t border-slate-800 flex justify-between gap-2.5">
          <button
            onClick={resetViewport}
            className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 hover:border-slate-700 transition flex items-center justify-center gap-1.5 font-mono text-xs"
          >
            <RotateCcw size={13} />
            <span>Center Camera</span>
          </button>
        </div>
      </div>
    </div>
  );
};
