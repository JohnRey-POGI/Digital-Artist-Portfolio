import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { fadeUp } from "../utils/animations";

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE,
        import.meta.env.VITE_EMAIL_TEMPLATE,
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormState({ name: '', email: '', message: '' });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          alert("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <motion.section id="contact"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
      className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gray-800 z-0" />
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Get In Touch</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formState.name}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formState.email}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              value={formState.message}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-md py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500"
            />

            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;