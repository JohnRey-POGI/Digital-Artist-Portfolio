import React from 'react';

const servicesData = [
  {
    title: 'Character Commissions',
    description: 'Bring your original characters to life with a custom illustration.',
    icon: '👤',
  },
  {
    title: 'Fan Art',
    description: 'Commission a unique piece of your favorite characters from games, anime, or movies.',
    icon: '⭐',
  },
  {
    title: 'Commercial Work',
    description: 'Professional illustrations for your business, including marketing materials and product art.',
    icon: '💼',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Services & Commissions</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110"
          >
            Inquire About a Commission
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;