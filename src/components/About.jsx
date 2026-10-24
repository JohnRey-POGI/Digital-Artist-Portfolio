import React from 'react';
import { settings } from '../content';
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

const About = () => {
  return (
    <section id="about" className="relative min-h-screen py-24 container mx-auto" >
      {/* className="py-16 md:py-24 bg-gray-800" */}
      <motion.div 
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">About Me</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 flex justify-center" data-aos="fade-right">
            <img
              src={settings.aboutPhoto}
              alt="Digital Artist"
              className="rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover shadow-2xl border-4 border-cyan-500"
            />
          </div>
          <div className="lg:w-2/3 text-center lg:text-left" data-aos="fade-left">
            {(settings.aboutText || '').split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-300 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;