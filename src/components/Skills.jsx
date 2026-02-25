import React from "react";
import {
  SiAdobephotoshop,
  SiBlender,
  SiAdobeillustrator,
  SiFigma,
  SiKrita,
} from "react-icons/si";
import { FaPaintBrush } from "react-icons/fa";

const skillsData = [
  { name: "Character Design", icon: <FaPaintBrush /> },
  { name: "Concept Art", icon: <FaPaintBrush /> },
  { name: "Illustration", icon: <FaPaintBrush /> },

  // Real Industry Software
  { name: "Adobe Photoshop", icon: <SiAdobephotoshop /> },
  { name: "Adobe Illustrator", icon: <SiAdobeillustrator /> },
  { name: "Blender", icon: <SiBlender /> },
  { name: "Figma", icon: <SiFigma /> },
  { name: "Krita", icon: <SiKrita /> },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Software & Skills</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300"
              data-aos="zoom-in"
            >
              <div className="text-5xl mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-200">
                {skill.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;