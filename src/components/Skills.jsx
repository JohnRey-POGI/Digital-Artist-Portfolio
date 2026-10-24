import React from "react";
import { skills } from "../content";
import { getSkillIcon } from "../utils/icons";

const SkillRow = ({ items, direction }) => (
  <div className="overflow-hidden mb-6">
    <div className={`flex gap-8 ${direction} w-max pt-6 pb-6`}>
    {[...items, ...items].map((skill, index) => {
      const Icon = getSkillIcon(skill.icon, skill.name);
      return (
        <div
          key={index}
          className="group flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl shadow-lg
                    hover:shadow-cyan-500/30 hover:-translate-y-2 transition-all duration-300"
        >
          <div className="text-5xl mb-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
            <Icon />
          </div>
          <h3 className="text-lg font-semibold text-gray-200 text-center">
            {skill.name}
          </h3>
        </div>
      );
    })}
    </div>
  </div>
);

const Skills = () => {
  const technicalSkills = skills.technical || [];
  const softwareSkills = skills.software || [];

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
        {technicalSkills.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-gray-200 text-center">
              Technical / Creative
            </h3>
            <SkillRow items={technicalSkills} direction="scroll-left" />
          </>
        )}

        {/* Software Skills */}
        {softwareSkills.length > 0 && (
          <>
            <h3 className="text-2xl font-semibold text-gray-200 text-center">
              Software
            </h3>
            <SkillRow items={softwareSkills} direction="scroll-right" />
          </>
        )}
      </div>
    </section>
  );
};

export default Skills;
