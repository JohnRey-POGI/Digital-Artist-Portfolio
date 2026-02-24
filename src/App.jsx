import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="bg-gray-900 text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Gallery />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;