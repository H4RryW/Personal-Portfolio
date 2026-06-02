/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WorkItem, SkillItem, ExperienceItem } from './types';

export const portfolioWorks: WorkItem[] = [
  {
    id: 'cyberpunk-alley',
    title: 'Neon Drift: Cyberpunk Back-Alley',
    category: 'Environment',
    thumbnailUrl: '/src/assets/images/cyberpunk_alley_1780376066295.png',
    description: 'A atmospheric high-fidelity modular cyberpunk alleyway focusing on wet-surface shader configuration, emissive neon-light baking, and compact hard-surface details.',
    fullDescription: 'This environment was designed using modular building kits to achieve efficient memory footprint and scalability. The scene explores high-contrast night-time illumination with neon signs and realistic wet-ground materials using custom shader coordinates. Volumetric steam details are simulated via particle banners, and hard-surface clutter props (cables, wastebins, vending machines) were baked using Substance Painter to establish a gritty, weathered cyberpunk atmosphere.',
    softwareUsed: ['Maya', 'Substance Painter', 'ZBrush', 'Unreal Engine 5', 'Marmoset Toolbag'],
    specs: {
      polygonCount: '480,000 tris (optimized for real-time)',
      textures: '4x 4K sets, 6x 2K sets (Packed PBR Metallic/Roughness)',
      engine: 'Unreal Engine 5.3 (Lumen & Nanite enabled)',
      unwrappedUVs: 'Optimized'
    },
    has3DViewer: true,
    viewerModelType: 'scifi_core',
    highResImages: [
      '/src/assets/images/cyberpunk_alley_1780376066295.png'
    ]
  },
  {
    id: 'ancient-ruins',
    title: 'Forgotten Sanctuary: Moss Temple Ruins',
    category: 'Environment',
    thumbnailUrl: '/src/assets/images/ancient_ruins_1780376088515.png',
    description: 'An ancient overgrown temple sanctuary detailing organic asset workflows, stone weathering, moss-layer blending, and advanced volumetric god-rays.',
    fullDescription: 'This portfolio piece demonstrates the integration of high-resolution organic meshes sculptured in ZBrush with modular architecture blueprints. Utilizing virtual texturing techniques, a procedural blending material was written to automatically project moss on vertical stone surfaces. Sculptures are baked down from 40-million-poly ZBrush models, retaining detailed cracks, chisels, and fractures. Lighting relies on pre-computed GPU light-baking with deep atmospheric fog.',
    softwareUsed: ['ZBrush', 'Maya', 'Substance Designer', 'Unreal Engine 5', 'SpeedTree'],
    specs: {
      polygonCount: '350,000 tris (LOD optimized)',
      textures: 'Shared 2K trim sheets with high-resolution vertex painting blend',
      engine: 'Unreal Engine 5.2 (Volumetric Fog & Virtual Shadow Maps)',
      unwrappedUVs: 'Optimized'
    },
    has3DViewer: true,
    viewerModelType: 'obelisk',
    highResImages: [
      '/src/assets/images/ancient_ruins_1780376088515.png'
    ]
  },
  {
    id: 'scifi-corridor',
    title: 'Aegis Outpost: Modular Lab Corridor',
    category: 'Modular Kit',
    thumbnailUrl: '/src/assets/images/scifi_corridor_1780376102581.png',
    description: 'An industrial sci-fi research lab corridor utilizing strict modular grid guidelines, trim sheets, and detailed custom decals.',
    fullDescription: 'Designed from the ground up to follow strict architectural modular snapping units, this modular lab environment showcases efficiency in technical art. The entire structural kit comprises only 15 unique models including bulkheads, floors, doors, and electrical brackets. Using advanced trim-sheet methodologies, multiple complex wall panels are packed into a single UV space to maximize rendering performance. High-tech sci-fi decals are projected using camera projections to enrich surface details without geometry costs.',
    softwareUsed: ['Maya', 'Substance Designer', 'Substance Painter', 'Marmoset Toolbag', 'Unreal Engine 5'],
    specs: {
      polygonCount: '120,000 tris (Instanced static meshes)',
      textures: '1x 4K Trim Sheet, 1x 2K Decal Sheet, 1x Detail Normal Tile',
      engine: 'Unreal Engine 5.3',
      unwrappedUVs: 'Yes'
    },
    has3DViewer: true,
    viewerModelType: 'monolith',
    highResImages: [
      '/src/assets/images/scifi_corridor_1780376102581.png'
    ]
  }
];

export const skillsData: SkillItem[] = [
  // Modeling
  { name: 'Hard Surface Modeling', level: 95, category: 'Modeling' },
  { name: 'Environment Sculpture', level: 90, category: 'Modeling' },
  { name: 'Modular Kit Assembly', level: 95, category: 'Modeling' },
  { name: 'Low-Poly Game Optimization', level: 92, category: 'Modeling' },
  
  // Texturing
  { name: 'PBR Material Painting', level: 94, category: 'Texturing' },
  { name: 'Trim Sheet Creation', level: 90, category: 'Texturing' },
  { name: 'Substance Tool Designing', level: 85, category: 'Texturing' },
  { name: 'Vertex Weight Painting', level: 88, category: 'Texturing' },

  // Technical
  { name: 'Unreal Engine lighting & Lumen', level: 92, category: 'Technical' },
  { name: 'LOD & Draw Call Budgeting', level: 90, category: 'Technical' },
  { name: 'Shader Graph Programming', level: 84, category: 'Technical' },
  { name: 'Baking & Decal Projection', level: 93, category: 'Technical' },

  // Software
  { name: 'Autodesk Maya', level: 95, category: 'Software' },
  { name: 'ZBrush', level: 90, category: 'Software' },
  { name: 'Substance Painter', level: 95, category: 'Software' },
  { name: 'Substance Designer', level: 82, category: 'Software' },
  { name: 'Unreal Engine 5', level: 90, category: 'Software' },
  { name: 'Marmoset Toolbag', level: 88, category: 'Software' }
];

export const experienceData: ExperienceItem[] = [
  {
    role: 'Lead 3D Environment Artist',
    company: 'Shatterpoint Studios (AAA Game Developer)',
    period: '2024 - Present',
    description: [
      'Spearheading modular environment design and kitbashing frameworks for a high-profile sci-fi RPG built on Unreal Engine 5.',
      'Designed over 200+ re-usable structural meshes, optimized with Nanite and custom vertex-normal offsets to eliminate seam artifacts.',
      'Pioneered environmental shading guidelines that trimmed video memory footprints by 18% across multiple targeted platforms.'
    ]
  },
  {
    role: 'Junior Environment / Prop Artist',
    company: 'Neon Horizon Interactive',
    period: '2022 - 2024',
    description: [
      'Sculpted organic stone elements and created procedural, weather-based moss shaders using Substance Designer and vertex painting.',
      'Managed LOD mapping schedules, collision assets, and custom lighting setups for an open-world fantasy environment.',
      'Recognized for exceptional baking workflow speed and precision, delivering high-fidelity prop meshes within strict schedule limits.'
    ]
  },
  {
    role: '3D Artist Intern',
    company: 'Virtuos Game Division',
    period: '2021 - 2022',
    description: [
      'Assisted in high-to-low poly baking, UV layout optimization, and base-material coloring for background props in landmark titles.',
      'Polished asset libraries and performed rigorous geometry checks (non-manifolds, isolated vertices, ngons) ahead of game packaging.'
    ]
  }
];

export const artistBio = {
  name: 'Leo Zheng (郑立奥)',
  title: '3D Environment & Prop Artist for Games',
  email: 'leo.zheng.art@gmail.com',
  phone: '+86 182-XXXX-XXXX',
  address: 'Shanghai, China',
  education: 'BFA in Game Art & Digital Production, China Academy of Art (中国美术学院 - 游戏美术专业)',
  bioDescription: 'I am a passionate 3D Environment Artist with a dedicated focus on modular architecture, hard-surface detailing, and real-time environment construction in Unreal Engine 5. I love building immersive digital spaces that speak through their atmosphere, historical decay, and storytelling details. From modular high-tech corridors to ancient overgrown ruins, my work balances state-of-the-art visual fidelity with optimized technical performance.',
  avatarUrl: '/src/assets/images/artist_avatar_1780376116976.png'
};
