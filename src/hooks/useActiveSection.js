import { useState, useEffect } from 'react';

const useActiveSection = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observerOptions = {
      root: null,
      // This creates a 1px trigger line in the exact center of the viewport.
      // It ensures symmetrical switching when scrolling up or down.
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections, or specific ones if provided
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      if (!sectionIds || sectionIds.includes(section.id)) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;