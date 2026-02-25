import React from 'react';
import bgVideo from '../assets/jabber.mp4';

const Hero = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('')" }}
    > 
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center text-white px-6" data-aos="fade-up">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          Reynaldo
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Digital Illustrator & Concept Artist
        </p>
        <button
          onClick={() => scrollToSection('gallery')}
          className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300"
        >
          View My Work
        </button>
      </div>
    </section>
  );
};

export default Hero;