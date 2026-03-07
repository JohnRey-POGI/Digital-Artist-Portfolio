import React from "react";
import { FaPaintBrush, FaPenNib, FaCircle } from "react-icons/fa";
import { TbBox, Tb3DCubeSphere } from "react-icons/tb";
import { MdCampaign, MdPhotoCamera } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";


import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiBlender,
  //SiDavinciresolve,
  //SiAdobeanimate,
  SiAdobe,
  SiFigma,
} from "react-icons/si";

// Technical / Creative Skills
export const technicalSkills = [
  { name: "2D Animation", icon: <FaCircle /> },
  { name: "Concept Art", icon: <FaPaintBrush /> },
  { name: "3D Animation", icon: <Tb3DCubeSphere /> },
  { name: "3D Modeling", icon: <TbBox /> },
  { name: "Marketing Illustration", icon: <FaPenNib /> },
  { name: "Photo Manipulation", icon: <MdPhotoCamera /> },
  { name: "Video Editing", icon: <RiVideoFill /> },
];

// Software Skills
export const softwareSkills = [
  { name: "After Effects", icon: <SiAdobeaftereffects /> },
  { name: "Blender", icon: <SiBlender /> },
  { name: "Illustrator", icon: <SiAdobeillustrator /> },
  { name: "Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Premiere Pro", icon: <SiAdobepremierepro /> },
  { name: "Animate", icon: <SiAdobe /> },
  { name: "Figma", icon: <SiFigma /> },
  
  {
    name: "DaVinci Resolve",
    icon: (
      <img
        src="https://cdn.jsdelivr.net/npm/simple-icons@16/icons/davinciresolve.svg"
        alt="DaVinciResolve"
        className="w-10 h-10 filter-[invert(100%)_sepia(100%)_saturate(10000%)_hue-rotate(145deg)_brightness(100%)_contrast(100%)]" 
      />
    ),
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-16">
      <div className="absolute inset-0 bg-gray-900 z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">My Skills</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>

        {/* Technical Skills */}
        <h3 className="text-2xl font-semibold text-gray-200 text-center">
          Technical / Creative
        </h3>
        <div className="overflow-hidden mb-6">
          <div className="flex gap-8 scroll-left w-max pt-6 pb-6">
          {[...technicalSkills,...technicalSkills].map((skill, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl shadow-lg 
                        hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-200 text-center">
                {skill.name}
              </h3>
            </div>
          ))}
          </div>
        </div>

        {/* Software Skills */}
        <h3 className="text-2xl font-semibold text-gray-200 text-center">
          Software
        </h3>
        <div className="overflow-hidden mb-6">
          <div className="flex gap-8 scroll-right w-max pt-6 pb-6">
          {[...softwareSkills,...softwareSkills].map((skill, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl shadow-lg 
                        hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-200 text-center">
                {skill.name}
              </h3>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;