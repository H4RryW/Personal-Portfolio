/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WorkItem {
  id: string;
  title: string;
  category: 'Environment' | 'Prop' | 'Modular Kit' | 'Hard Surface';
  thumbnailUrl: string;
  description: string;
  fullDescription: string;
  softwareUsed: string[];
  specs: {
    polygonCount: string;
    textures: string;
    engine: string;
    unwrappedUVs: 'Yes' | 'No' | 'Optimized';
  };
  has3DViewer: boolean;
  viewerModelType?: 'monolith' | 'scifi_core' | 'obelisk';
  highResImages?: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100
  category: 'Modeling' | 'Texturing' | 'Technical' | 'Software';
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
}
