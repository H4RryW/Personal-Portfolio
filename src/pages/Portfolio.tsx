/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioWorks } from '../data';
import { WorkItem } from '../types';
import { ThreeModelViewer } from '../components/ThreeModelViewer';
import { X, Layers, Box, Maximize2, Sparkles, Terminal, Info, Zap } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);
  const [viewMode, setViewMode] = useState<'ren' | '3d'>('ren'); // 'ren' for static renders, '3d' for real-time sandbox

  const categories = ['All', 'Environment', 'Modular Kit'];

  const filteredProjects = activeCategory === 'All'
    ? portfolioWorks
    : portfolioWorks.filter(w => w.category === activeCategory);

  const openProjectDetails = (project: WorkItem) => {
    setSelectedProject(project);
    setViewMode('ren'); // reset to high-res render static view by default
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Intro Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-sans font-extrabold text-white tracking-tight mb-2 uppercase">
          Masterpiece Showcase
        </h2>
        <p className="text-white/40 font-mono text-sm max-w-2xl uppercase tracking-wider">
          GAME-READY ENVIRONMENTS // MODULAR KITS // HARD-SURFACE PROPS
        </p>

        {/* Categories Tab Filter */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-5 rounded-sm border transition cursor-pointer uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-[#FF4E00]/15 border-[#FF4E00]/30 text-white font-bold'
                  : 'bg-[#0D0D0D] border-white/5 text-white/60 hover:border-white/10 hover:text-white'
              }`}
            >
              {cat.toUpperCase()}s
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Portfolio Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((work, idx) => (
            <motion.div
              layout
              key={work.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => openProjectDetails(work)}
              className="bg-[#0D0D0D] rounded-sm overflow-hidden border border-white/5 hover:border-[#FF4E00]/30 p-4 transition duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Image Showcase */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#050505]">
                  <img
                    src={work.thumbnailUrl}
                    alt={work.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 animate-fade-in"
                  />
                  {work.has3DViewer && (
                    <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur text-white border border-[#FF4E00]/40 text-[10px] font-mono py-1 px-2 rounded-sm flex items-center gap-1.5 font-bold">
                      <Box size={11} className="text-[#FF4E00] animate-spin" style={{ animationDuration: '6s' }} />
                      <span className="tracking-wide">3D VIEWPORT</span>
                    </div>
                  )}
                  {/* Category Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-[#050505]/85 backdrop-blur text-white border border-white/5 text-[9px] font-mono py-0.5 px-2 rounded-sm uppercase tracking-wider">
                    {work.category}
                  </div>
                </div>

                {/* Info block */}
                <div className="space-y-2">
                  <h3 className="text-lg font-sans font-extrabold text-white group-hover:text-[#FF4E00] transition-colors duration-200 uppercase tracking-tight">
                    {work.title}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </div>

              {/* Specs & Launcher Footer */}
              <div className="space-y-3 pt-4 mt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1">
                  {work.softwareUsed.slice(0, 3).map((sw, i) => (
                    <span key={i} className="text-[10px] font-mono bg-black text-white/55 px-1.5 py-0.5 rounded-sm border border-white/5">
                      {sw}
                    </span>
                  ))}
                  {work.softwareUsed.length > 3 && (
                    <span className="text-[10px] font-mono bg-black text-white/30 px-1.5 py-0.5 rounded-sm border border-white/5">
                      +{work.softwareUsed.length - 3} More
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-[11px] font-mono text-[#FF4E00] font-bold tracking-wider uppercase group-hover:translate-x-1 transition-transform duration-200">
                  <span>Inspect Specifications</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Overlapping Detail Inspector overlay (Marmoset Viewer Portal Modal) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#0D0D0D] w-full max-w-6xl rounded-sm border border-white/5 shadow-2xl overflow-hidden flex flex-col relative max-h-[95vh]"
            >
              {/* Modal Control Header Bar */}
              <div className="flex justify-between items-center border-b border-white/5 px-6 py-4 bg-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF4E00]" />
                  <span className="font-mono text-xs text-[#FF4E00] tracking-widest uppercase font-bold">
                    PROJECT VIEWPORT INTEGRATION
                  </span>
                </div>
                <button
                  onClick={closeProjectDetails}
                  className="rounded-sm p-1.5 bg-[#050505] hover:bg-black text-[#E0E0E0] hover:text-white border border-white/5 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body Scroll container */}
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                
                {/* VIEW MODE CHOICES */}
                {selectedProject.has3DViewer && (
                  <div className="flex bg-black/70 p-1 rounded-sm border border-white/5 font-mono text-xs max-w-sm mx-auto">
                    <button
                      onClick={() => setViewMode('ren')}
                      className={`flex-1 py-2 rounded-sm text-center transition cursor-pointer uppercase font-bold tracking-wider ${
                        viewMode === 'ren'
                          ? 'bg-[#FF4E00]/15 text-white border border-[#FF4E00]/30 font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      RENDER VIEWS
                    </button>
                    <button
                      onClick={() => setViewMode('3d')}
                      className={`flex-1 py-2 rounded-sm text-center transition flex items-center justify-center gap-1.5 cursor-pointer uppercase font-bold tracking-wider ${
                        viewMode === '3d'
                          ? 'bg-[#FF4E00]/15 text-white border border-[#FF4E00]/30 font-bold'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Zap size={13} className="animate-pulse text-[#FF4E00]" />
                      <span>Live 3D VIEWPORT</span>
                    </button>
                  </div>
                )}

                {/* ACTIVE STAGE DISPLAY CONTAINER */}
                <div className="w-full">
                  {viewMode === '3d' && selectedProject.viewerModelType ? (
                    <div className="p-1 rounded-sm bg-black border border-white/5">
                      <ThreeModelViewer modelType={selectedProject.viewerModelType} />
                    </div>
                  ) : (
                    <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-black border border-white/5 shadow-inner">
                      <img
                        src={selectedProject.thumbnailUrl}
                        alt={selectedProject.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* PROJECT SPECS & DETAILS SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                  {/* Left columns: Description Details */}
                  <div className="lg:col-span-2 space-y-5">
                    <div>
                      <h3 className="text-2xl font-sans font-extrabold text-white mb-2 uppercase tracking-wide">
                        {selectedProject.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed p-4 bg-black/40 rounded-sm border border-white/5">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    {/* Software badges */}
                    <div>
                      <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-2.5 flex items-center gap-1.5 font-bold">
                        <Terminal size={12} className="text-[#FF4E00]" />
                        <span>Interactive Tools Employed</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.softwareUsed.map((sw, i) => (
                          <span key={i} className="text-xs font-mono bg-black text-[#E0E0E0] px-3 py-1 rounded-sm border border-white/5">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right columns: Game Engine Technical specs sheet */}
                  <div className="bg-[#0A0A0A] rounded-sm p-5 border border-white/5 space-y-4 font-mono text-xs">
                    <h4 className="text-xs font-mono text-[#FF4E00] uppercase tracking-widest pb-2 border-b border-white/5 flex items-center gap-1.5 font-bold">
                      <Info size={13} />
                      <span>Hardware Diagnostics</span>
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">Engine Target</p>
                        <p className="text-white mt-0.5 font-bold text-[13px]">{selectedProject.specs.engine}</p>
                      </div>
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">Poly Count Budget</p>
                        <p className="text-[#E0E0E0] mt-0.5">{selectedProject.specs.polygonCount}</p>
                      </div>
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">Texture Dimensions</p>
                        <p className="text-[#E0E0E0] mt-0.5">{selectedProject.specs.textures}</p>
                      </div>
                      <div>
                        <p className="text-white/30 text-[10px] uppercase tracking-wider">Unwrapped non-overlapping UVs</p>
                        <span className="inline-block mt-1 focus:outline-none px-2.5 py-1 text-[9px] font-bold rounded-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {selectedProject.specs.unwrappedUVs}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
