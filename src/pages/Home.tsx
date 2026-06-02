/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ThreeBackground } from '../components/ThreeBackground';
import { artistBio } from '../data';
import { ArrowRight, Compass, ShieldAlert, Cpu, MonitorPlay, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: 'portfolio' | 'resume') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex items-center justify-center py-10 px-4 overflow-hidden">
      {/* Immersive 3D wireframe background overlay */}
      <ThreeBackground />

      <div className="relative max-w-4xl mx-auto w-full z-10 text-center">
        {/* Cinematic welcome badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#FF4E00]/15 border border-[#FF4E00]/30 text-[#FF4E00] font-mono text-xs uppercase tracking-widest mb-6 shadow-lg shadow-[#FF4E00]/5"
        >
          <Sparkles size={13} className="animate-pulse" />
          <span>PORTFOLIO // DIGITAL BUSINESS CARD</span>
        </motion.div>

        {/* Hero Name & Occupation display */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tighter text-white select-none leading-none mb-4 uppercase"
        >
          {artistBio.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl font-serif italic text-[#FF4E00] tracking-wider mb-8"
        >
          {artistBio.title}
        </motion.p>

        {/* Short atmospheric bio description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="max-w-2xl mx-auto text-[#E0E0E0]/80 text-sm sm:text-base leading-relaxed font-sans mb-12 backdrop-blur-md bg-[#0D0D0D]/90 p-6 rounded-sm border border-white/5 shadow-inner"
        >
          {artistBio.bioDescription}
        </motion.div>

        {/* Primary and secondary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono text-sm"
        >
          <button
            onClick={() => onNavigate('portfolio')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#FF4E00] hover:bg-[#E04500] text-white font-bold rounded-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FF4E00]/10 duration-205 flex items-center justify-center gap-2 group cursor-pointer tracking-wider"
          >
            <Compass size={17} />
            <span>LAUNCH GALLERY PORTFOLIO</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => onNavigate('resume')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0D0D0D] hover:bg-[#121212] text-slate-300 rounded-sm border border-white/10 hover:border-white/20 transition duration-200 flex items-center justify-center gap-2 cursor-pointer tracking-wider"
          >
            <span>VIEW RESUME / SKILLS</span>
          </button>
        </motion.div>

        {/* Quick technical badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px] font-mono text-white/35 uppercase tracking-widest text-left"
        >
          <div className="flex items-center gap-2 border-r border-white/5 pr-2">
            <Cpu size={14} className="text-[#FF4E00]" />
            <div>
              <p className="text-[9px] text-white/30">Primary Core</p>
              <p className="text-[#E0E0E0]">Modular Layouts</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border-r border-white/5 pr-2">
            <MonitorPlay size={14} className="text-[#FF4E00]" />
            <div>
              <p className="text-[9px] text-white/30">Baking Tech</p>
              <p className="text-[#E0E0E0]">Substance PBR</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border-r border-white/5 pr-2 col-span-1">
            <Compass size={14} className="text-[#FF4E00]" />
            <div>
              <p className="text-[9px] text-white/30">Graphics Eng</p>
              <p className="text-[#E0E0E0]">Unreal Engine 5</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-550 animate-pulse"></span>
            <div>
              <p className="text-[9px] text-white/30">Render Pipeline</p>
              <p className="text-[#E0E0E0]">Real-Time WebGL</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
