import React, { useState } from 'react';

const galleryImages = [
  { id: 1, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+1' },
  { id: 2, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+2' },
  { id: 3, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+3' },
  { id: 4, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+4' },
  { id: 5, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+5' },
  { id: 6, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+6' },
  { id: 7, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+7' },
  { id: 8, url: 'https://placehold.co/600x600/1a202c/cyan?text=Art+8' },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => setSelectedImage(imageUrl);
  const closeModal = () => setSelectedImage(null);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Portfolio Gallery</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(image.url)}
              data-aos="fade-up"
            >
              <img
                src={image.url}
                alt={`Artwork ${image.id}`}
                className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl max-h-full"
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
          >
            <img src={selectedImage} alt="Enlarged artwork" className="rounded-lg shadow-2xl" />
            <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 text-white bg-cyan-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-cyan-600 transition-colors duration-300"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
