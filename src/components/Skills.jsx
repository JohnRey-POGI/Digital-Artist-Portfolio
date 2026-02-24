import React from 'react';

const skillsData = [
  { name: 'Character Design', icon: '🎨' },
  { name: 'Concept Art', icon: '🌍' },
  { name: 'Illustration', icon: '🖌️' },
  { name: 'Adobe Photoshop', icon: 'PS' },
  { name: 'Procreate', icon: '✍️' },
  { name: 'Blender', icon: '🧊' },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Skills</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300"
              data-aos="zoom-in"
            >
              <div className="text-4xl mb-4 text-cyan-400">{skill.icon}</div>
              <h3 className="text-lg font-semibold">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
