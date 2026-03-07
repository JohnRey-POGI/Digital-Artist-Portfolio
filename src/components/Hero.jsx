import React from 'react';
import bgVideo from '../assets/jabber.mp4';
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 300], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden flex items-center justify-center"
    > 
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1 }}
        animate={{ scale: 1.5 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full object-cover inset-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </motion.video>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Parallax Content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-20 text-center text-white px-6" data-aos="fade-up">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          XR37 4RT
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Digital Illustrator & Concept Artist
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('gallery')}
          className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          View My Work
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;