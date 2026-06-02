/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { artistBio, skillsData, experienceData } from '../data';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, LayoutGrid, Sliders, CheckSquare, Send, Check } from 'lucide-react';

export const Resume: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'Modeling' | 'Texturing' | 'Technical' | 'Software'>('Modeling');
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Divide skills for modular grid filters
  const skillCategories = ['Modeling', 'Texturing', 'Technical', 'Software'] as const;
  const filteredSkills = skillsData.filter((s) => s.category === activeCategory);

  // Contact form simulated transmission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      setTimeout(() => setSubmitSuccess(false), 5000); // clear success alert
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Profiling Layout */}
      <div className="bg-[#0D0D0D] rounded-sm border border-white/5 p-6 md:p-10 shadow-xl flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
        {/* Avatar portrait frame */}
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-sm overflow-hidden bg-black border border-white/5 shrink-0 shadow-lg relative group">
          <img
            src={artistBio.avatarUrl}
            alt={artistBio.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
          />
        </div>

        {/* Bios Specs and contact triggers */}
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-sans font-extrabold text-white tracking-tight uppercase">
              {artistBio.name}
            </h2>
            <p className="text-[#FF4E00] font-mono text-sm tracking-widest mt-1 uppercase font-bold">
              {artistBio.title}
            </p>
          </div>

          <p className="text-[#E0E0E0]/80 text-sm max-w-2xl leading-relaxed">
            Highly structured 3D game environment professional graduated from the **{artistBio.education}**. Focused on real-world reference study, photorealistic micro-detatiling and low-latency game engine constraints to create optimal environment kitbashes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2 text-xs font-mono text-white/40">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-[#FF4E00] shrink-0" />
              <span>{artistBio.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-[#FF4E00] shrink-0" />
              <span>{artistBio.phone}</span>
            </div>
            <div className="flex items-center gap-2 col-span-1">
              <MapPin size={13} className="text-[#FF4E00] shrink-0" />
              <span>{artistBio.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main timeline content grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Timeline History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Timeline Experience */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-sans font-black text-white flex items-center gap-2 pb-2 border-b border-white/5 uppercase tracking-wide">
              <Briefcase size={20} className="text-[#FF4E00]" />
              <span>Professional Studio Records</span>
            </h3>

            <div className="relative border-l border-white/5 ml-3.5 pl-6 space-y-8 pt-2">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline point badge */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-[#FF4E00] group-hover:scale-125 transition-transform duration-200" />
                  
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <h4 className="text-sm font-mono text-white font-bold tracking-tight">
                        {exp.role} @ <span className="text-[#FF4E00] font-bold">{exp.company}</span>
                      </h4>
                      <span className="text-[10px] font-mono bg-black text-white/40 px-2.5 py-0.5 rounded-sm border border-white/5 mt-1 sm:mt-0 tracking-widest font-semibold">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="list-disc pl-4 space-y-2 text-white/60 text-xs sm:text-sm leading-relaxed">
                      {exp.description.map((bullet, buIdx) => (
                        <li key={buIdx} className="marker:text-[#FF4E00]">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Education */}
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-sans font-black text-white flex items-center gap-2 pb-2 border-b border-white/5 uppercase tracking-wide">
              <GraduationCap size={20} className="text-[#FF4E00]" />
              <span>Academic Foundation</span>
            </h3>
            <div className="bg-[#0D0D0D] rounded-sm border border-white/5 p-5 flex items-center gap-4">
              <div className="p-3 rounded-sm bg-[#FF4E00]/10 text-[#FF4E00] border border-[#FF4E00]/25">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">China Academy of Art (中国美术学院)</h4>
                <p className="text-xs text-[#FF4E00] font-mono mt-0.5">Undergraduate Degree, Game Art Major</p>
                <p className="text-xs text-white/50 mt-1">Specialized in Environmental Architecture Modeling, Unreal Shader systems, and UV Mapping rules.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns: Technical engine skills dials & quick form */}
        <div className="space-y-8">
          
          {/* Interactive Skill Panel */}
          <div className="bg-[#0D0D0D] rounded-sm border border-white/5 p-6 space-y-5 shadow-lg">
            <h3 className="text-lg font-sans font-black text-white border-b border-white/5 pb-2.5 flex items-center gap-2 uppercase tracking-wide">
              <Sliders size={18} className="text-[#FF4E00]" />
              <span>Skill Matrix Dashboard</span>
            </h3>

            {/* Sub-selectors */}
            <div className="flex gap-1 bg-black/80 p-1 rounded-sm border border-white/5 font-mono text-[10px]">
              {skillCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 py-1 rounded-sm text-center cursor-pointer uppercase tracking-wider transition ${
                    activeCategory === cat
                      ? 'bg-[#FF4E00]/15 text-white border border-[#FF4E00]/30 font-bold'
                      : 'text-white/40 hover:text-[#FF4E00]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Progressive Skill levels */}
            <div className="space-y-4">
              {filteredSkills.map((skill, si) => (
                <div key={si} className="space-y-1.5 focus:outline-none">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#E0E0E0] font-medium">{skill.name}</span>
                    <span className="text-[#FF4E00] font-bold">{skill.level}%</span>
                  </div>
                  {/* Skill level slide background tracker */}
                  <div className="w-full h-1.5 bg-black rounded-sm overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-[#FF4E00]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Business Enquiry Digital Slot */}
          <div className="bg-[#0D0D0D] rounded-sm border border-white/5 p-6 space-y-4 shadow-lg">
            <h3 className="text-lg font-sans font-black text-white border-b border-white/5 pb-2.5 flex items-center gap-2 uppercase tracking-wide">
              <CheckSquare size={17} className="text-[#FF4E00]" />
              <span>Contact Console</span>
            </h3>

            <p className="text-white/40 text-xs font-mono leading-relaxed uppercase">
              Available for full-time job offers, indie collaborations, or modular prop freelancing commissions.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Name (Chinese/English)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full border border-white/5 bg-black/60 p-2.5 rounded-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4E00]/50 focus:bg-black transition text-xs font-semibold"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder="contact.email@domains.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full border border-white/5 bg-black/60 p-2.5 rounded-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4E00]/50 focus:bg-black transition text-xs font-semibold"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide reference details or project specs..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full border border-white/5 bg-black/60 p-2.5 rounded-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF4E00]/50 focus:bg-black transition resize-none leading-relaxed text-xs font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="w-full py-2.5 bg-[#FF4E00] hover:bg-[#E04500] disabled:bg-[#FF4E00]/25 text-white font-bold rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-widest"
              >
                {submitSuccess ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Enquiry Transmitted!</span>
                  </>
                ) : isSubmitting ? (
                  <span>Encrypting Packets...</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
