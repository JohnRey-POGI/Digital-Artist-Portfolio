import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">About Me</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 flex justify-center" data-aos="fade-right">
            <img
              src="src/assets/me.png"
              alt="Digital Artist"
              className="rounded-full w-64 h-64 lg:w-80 lg:h-80 object-cover shadow-2xl border-4 border-cyan-500"
            />
          </div>
          <div className="lg:w-2/3 text-center lg:text-left" data-aos="fade-left">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Hello! I'm a passionate digital artist specializing in character design and concept art. With a keen eye for detail and a love for storytelling, I bring ideas to life through vibrant and dynamic visuals. My work is heavily inspired by fantasy, sci-fi, and the endless beauty of the digital realm.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Over the years, I've had the pleasure of collaborating with various clients on exciting projects, ranging from video games to book illustrations. My goal is to create art that not only looks stunning but also resonates with its audience on an emotional level.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;