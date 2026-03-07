import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3d';

const App = () => {
  return (
    <div className="bg-gray-900 text-white font-sans relative">
      <Background3D />
      
      <Navbar />
      <main className="relative">
        {/* 3D object stays behind page */}
        <Hero className="min-h-screen flex items-center"/>
        <About className="min-h-screen flex items-center"/>
        <Skills className="min-h-screen flex items-center"/>
        <Gallery className="min-h-screen flex items-center"/>
        <Services className="min-h-screen flex items-center"/>
        <Contact className="min-h-screen flex items-center"/>
      </main>
      <Footer />
    </div>
  );
};

export default App;