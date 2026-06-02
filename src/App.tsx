/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Resume } from './pages/Resume';
import { Compass, FileText, UserCheck, Orbit, Github, Linkedin } from 'lucide-react';

type Tab = 'home' | 'portfolio' | 'resume';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-[#080808] text-[#E0E0E0] flex flex-col justify-between selection:bg-[#FF4E00]/30 selection:text-white antialiased font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="p-1.5 bg-[#FF4E00]/10 rounded-sm border border-[#FF4E00]/20 group-hover:bg-[#FF4E00]/20 transition duration-300">
              <Orbit size={18} className="text-[#FF4E00] animate-spin" style={{ animationDuration: '10s' }} />
            </div>
            <div>
              <h1 className="text-sm font-sans font-extrabold tracking-tight text-white uppercase group-hover:text-[#FF4E00] transition-colors duration-200">
                Leo Zheng
              </h1>
              <p className="text-[9px] font-mono text-[#FF4E00] font-semibold tracking-[0.2em] uppercase">
                3D ENVIRONMENT ARTIST
              </p>
            </div>
          </div>

          {/* Navigation Tab Menu */}
          <nav className="flex items-center gap-1.5 bg-[#0D0D0D] p-1 rounded-sm border border-white/5 font-mono text-xs select-none shadow-sm">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-2 px-3.5 rounded-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#FF4E00]/10 text-white border border-[#FF4E00]/30 font-bold'
                  : 'text-white/60 hover:text-[#FF4E00] border border-transparent'
              }`}
            >
              <Orbit size={13} />
              <span>CORE</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`py-2 px-3.5 rounded-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'portfolio'
                  ? 'bg-[#FF4E00]/10 text-white border border-[#FF4E00]/30 font-bold'
                  : 'text-white/60 hover:text-[#FF4E00] border border-transparent'
              }`}
            >
              <Compass size={13} />
              <span>PORTFOLIO</span>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`py-2 px-3.5 rounded-sm flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'resume'
                  ? 'bg-[#FF4E00]/10 text-white border border-[#FF4E00]/30 font-bold'
                  : 'text-white/60 hover:text-[#FF4E00] border border-transparent'
              }`}
            >
              <FileText size={13} />
              <span>RESUME</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Subpage Render Section with Smooth Motion Animations */}
      <main className="flex-1 w-full bg-[#080808]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {activeTab === 'home' && <Home onNavigate={(tab) => setActiveTab(tab)} />}
            {activeTab === 'portfolio' && <Portfolio />}
            {activeTab === 'resume' && <Resume />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Aesthetic Footer */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 py-6 px-6 text-center select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30">
          <div>
            <p>© {new Date().getFullYear()} LEO ZHENG. ALL RIGHTS RESERVED.</p>
            <p className="text-[10px] text-white/20 mt-0.5">Built with Modular JS & React 19</p>
          </div>

          {/* Social Platform Connections */}
          <div className="flex gap-6">
            <a 
              href="https://artstation.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase tracking-widest"
            >
              ArtStation
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase tracking-widest"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase tracking-widest"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
