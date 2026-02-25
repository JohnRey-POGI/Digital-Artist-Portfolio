import React, { useState } from 'react';
import ModelViewer from './ModelViewer';
import modelFile from "../assets/models/Dragon 2.5_glb.glb";
import sniperModel from "../assets/models/sniper-rifle.glb";

const galleryImages = [
  {
    id: 1,
    url: "https://cdnb.artstation.com/p/assets/images/images/093/407/877/large/xr37-4rt-adventure-time-ghibli-burger.webp?1762442042",
    title: "Ghibli Burger",
    description: "A whimsical burger design inspired by Studio Ghibli's art style.",
  },
  {
    id: 2,
    url: "https://cdnb.artstation.com/p/assets/images/images/052/608/023/large/xr37-4rt-140678006-458823468453692-8250497788887134883-n.jpg?1660225707",
    title: "Cyberpunk Cityscape",
    description: "A vibrant cityscape with neon lights and futuristic architecture.",
  },
  { id: 3,
    url: 'https://cdnb.artstation.com/p/assets/images/images/065/406/957/large/xr37-4rt-126898695-2054729124697064-2372128118680061979-n.jpg?1690296107',
    title: "Mystic Forest",
    description: "An enchanted forest scene with glowing elements.",
  },
  { id: 4,
    url: 'https://cdna.artstation.com/p/assets/images/images/052/605/746/large/xr37-4rt-244614964-1311209639308512-2419731661266482703-n.jpg?1660221248',
    title: "Space Explorer",
    description: "A lone astronaut venturing into the unknown cosmos.",
  },
  { id: 5,
    url: 'https://cdnb.artstation.com/p/assets/images/images/065/406/047/large/xr37-4rt-129081032-181337300321712-8791784131082915855-n.jpg?1690294886',
    title: "City of the Future",
    description: "A sprawling metropolis with towering skyscrapers and flying cars.",
  },
  { id: 6,
    url: 'https://cdna.artstation.com/p/assets/images/images/052/606/130/large/xr37-4rt-architect-sideview.jpg?1660221999',
    title: "Architectural Design",
    description: "A detailed architectural rendering of a futuristic building.",
  },
  { id: 7,
    url: 'https://cdna.artstation.com/p/assets/images/images/062/801/358/large/xr37-4rt-knight-landscape.jpg?1683982807',
    title: "Knight in the Forest",
    description: "A brave knight exploring a mysterious enchanted forest.",
  },
  { id: 8,
    url: 'https://cdnb.artstation.com/p/assets/images/images/065/405/031/large/xr37-4rt-busines-playing-cardblue.jpg?1690293441',
    title: "Business Playing Card",
    description: "A stylized playing card with a futuristic business theme.",
  },
];

const models3D = [
  {
    id: 1,
    preview: "src/assets/models/Dragon 2.5_jpg.jpg",
    modelUrl: {modelFile},
    title: "3D Dragon Model",
    description: "A detailed 3D model of a dragon, perfect for games and animations.",
  },
  {
    id: 2,
    preview: "src/assets/models/sniper-rifle-preview.jpg",
    modelUrl: {sniperModel},
    title: "3D Sniper Rifle Model",
    description: "A detailed 3D model of a sniper rifle, perfect for games and animations.",
  },
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState(null);

  const openModal = (item, itemType) => {
    setSelectedItem(item);
    setType(itemType);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setType(null);
  };

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
              onClick={() => openModal(image, "image")}
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
        <h2 className="text-3xl font-bold text-cyan-400 mt-16 mb-8 text-center">
          3D Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {models3D.map((model) => (
            <div
              key={model.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openModal(model, "3d")}
            >
              <img
                src={model.preview}
                alt={model.title}
                className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300">
                <p className="text-white opacity-0 group-hover:opacity-100 font-bold">
                  View 3D
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl bg-gray-900 rounded-xl p-6 flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Image / 3D Viewer */}
            <div className="flex-1 flex items-center justify-center max-h-[80vh]">
              {type === "image" && (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              )}
              {type === "3d" && (
                <ModelViewer modelUrl={selectedItem.modelUrl} />
              )}
            </div>

            {/* Right / Bottom: Description */}
            <div className="flex-1 overflow-auto text-white max-h-[80vh]">
              <h3 className="text-3xl font-bold text-cyan-400 mb-3">
                {selectedItem.title}
              </h3>
              <p className="text-gray-300">{selectedItem.description}</p>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-cyan-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-cyan-600"
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
