import React, { useState, useEffect} from 'react';
import ModelViewer from './ModelViewer';
import dragonModel from "../assets/models/Dragon.glb";
import sniperModel from "../assets/models/sniper-rifle.glb";
import dragonModelPreview from "../assets/models/Dragon-Preview.jpg";
import sniperModelPreview from "../assets/models/sniper-rifle-preview.jpg";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../utils/animations";

import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiBlender,
  SiAdobe,
  SiFigma,
} from "react-icons/si";

const galleryImages = [
  {
    id: 0,
    url: "https://cdnb.artstation.com/p/assets/images/images/093/407/877/large/xr37-4rt-adventure-time-ghibli-burger.webp?1762442042",
    title: "Ghibli Burger",
    description: "A whimsical burger design inspired by Studio Ghibli's art style.",
    software: ["Photoshop"],
  },
  {
    id: 1,
    url: "https://cdnb.artstation.com/p/assets/images/images/052/608/023/large/xr37-4rt-140678006-458823468453692-8250497788887134883-n.jpg?1660225707",
    title: "Ethereal Elegance",
    description: "A mysterious, dark-haired elven woman in a flowing navy gown poses gracefully within a moody, shadowed setting.",
    software: ["Photoshop"],
  },
  { id: 2,
    url: 'https://cdnb.artstation.com/p/assets/images/images/065/406/957/large/xr37-4rt-126898695-2054729124697064-2372128118680061979-n.jpg?1690296107',
    title: "Reality",
    description: "A Desolate Urban Corridor Submerged in Deep Violet Shadows and Toxic Effluence, Where the Chained Doors of a Forgotten Merchant Stand Silent Witness to Decay",
    software: ["Photoshop"],
  },
  { id: 3,
    url: 'https://cdna.artstation.com/p/assets/images/images/052/605/746/large/xr37-4rt-244614964-1311209639308512-2419731661266482703-n.jpg?1660221248',
    title: "Miniature House Interior",
    description: "A Meticulously Crafted Sanctuary in Miniature, Capturing Every Intricate Detail of a Sun-Drenched Living Space Where Tiny Domestic Splendor Meets the Art of Infinite Smallness",
    software: ["Blender"],
  },
  { id: 4,
    url: 'https://cdnb.artstation.com/p/assets/images/images/065/406/047/large/xr37-4rt-129081032-181337300321712-8791784131082915855-n.jpg?1690294886',
    title: "Jungle",
    description: "Living with nature is a privilege that some of us appreciate, even a two-top in a food chain can live to their fullest if they choose to live peacefully. Life is unpredictable",
    software: ["Photoshop"],
  },
  { id: 5,
    url: 'https://cdna.artstation.com/p/assets/images/images/052/606/130/large/xr37-4rt-architect-sideview.jpg?1660221999',
    title: "Architectural Design",
    description: "A detailed architectural rendering of a futuristic building.",
    software: ["Blender"],
  },
  { id: 6,
    url: 'https://cdna.artstation.com/p/assets/images/images/062/801/358/large/xr37-4rt-knight-landscape.jpg?1683982807',
    title: "Commitment and Devotion",
    description: "The Everlasting Vigil: A Testament of Unyielding Resolve and Sacred Vow",
    software: ["Photoshop"],
  },
  { id: 7,
    url: 'https://cdnb.artstation.com/p/assets/images/images/065/405/031/large/xr37-4rt-busines-playing-cardblue.jpg?1690293441',
    title: "Business Playing Card",
    description: "A stylized playing card with a futuristic business theme.",
    software: ["Illustrator", "Photoshop"],
  },
];

const models3D = [
  {
    id: 50,
    preview: dragonModelPreview,
    modelUrl: dragonModel,
    title: "3D Dragon Model",
    description: "A detailed 3D model of a dragon, perfect for games and animations.",
    software: ["Blender"],
  },
  {
    id: 51,
    preview: sniperModelPreview,
    modelUrl: sniperModel,
    title: "3D Sniper Rifle Model",
    description: "A detailed 3D model of a sniper rifle, perfect for games and animations.",
    software: ["Blender"],
  },
];

const softwareIcons = {
  AfterEffects: <SiAdobeaftereffects/>,
  Illustrator: <SiAdobeillustrator/>,
  Photoshop: <SiAdobephotoshop/>,
  Premiere: <SiAdobepremierepro/>,
  Blender: <SiBlender/>,
  Animate: <SiAdobe/>,
  Figma: <SiFigma/>,
};

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [type, setType] = useState(null);

  const selectedItem = (() => {
    if (currentIndex === null) return null;
    if (type === "image") return galleryImages[currentIndex] || null;
    if (type === "3d") return models3D.find((m) => m.id === currentIndex) || null;
    return null;
  })();

  const openModal = (index, itemType) => {
    setCurrentIndex(index);
    setType(itemType);
  };

  const closeModal = () => {
    setCurrentIndex(null);
    setType(null);
  };

  {/* Prev & Next */}
  const nextItem = () => {
    if (type === "image") {
      setCurrentIndex((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1
      );
    } else if (type === "3d") {
      const currentIdx = models3D.findIndex((m) => m.id === currentIndex);
      const nextIdx = (currentIdx + 1) % models3D.length;
      setCurrentIndex(models3D[nextIdx].id);
    }
  };

  const prevItem = () => {
    if (type === "image") {
      setCurrentIndex((prev) =>
        prev === 0 ? galleryImages.length - 1 : prev - 1
      );
    } else if (type === "3d") {
      const currentIdx = models3D.findIndex((m) => m.id === currentIndex);
      const prevIdx = (currentIdx - 1 + models3D.length) % models3D.length;
      setCurrentIndex(models3D[prevIdx].id);
    }
  };

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [currentIndex]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Portfolio Gallery</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>
        <motion.div variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2">
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={fadeUp}
              whileHover={{ scale: 1.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(image.id, "image")}
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
            </motion.div>
          ))}
        </motion.div>
        <h2 className="text-3xl font-bold text-cyan-400 mt-16 mb-8 text-center">
          3D Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {models3D.map((model) => (
            <div
              key={model.id}
              className="relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openModal(model.id, "3d")}
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
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
          onClick={closeModal}
        >{/* flex items-center justify-center p-4*/}
          <div className="min-h-screen flex items-center justify-center p-4">
          <div
            className="relative w-full max-w-6xl bg-gray-900 rounded-xl p-6 flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous */}
            <button
              onClick={prevItem}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-cyan-500 
              text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50"
            >
              &#10094;
            </button>

            {/* Next */}
            <button
              onClick={nextItem}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-cyan-500 
              text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50"
            >
              &#10095;
            </button>

            {/* Left: Image / 3D Viewer */}
            <div className="flex-1 flex items-center justify-center max-h-[80vh]">
              {type === "image" && (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />
              )}
                {type === "3d" && (
                  <ModelViewer modelUrl={selectedItem.modelUrl} />
                )}
              {/* <div className="w-full h-full">
              </div> */}
            </div>

            {/* Right / Bottom: Description */}
            <div className="flex-1 overflow-auto text-white max-h-[80vh]">
              <h3 className="text-3xl font-bold text-cyan-400 mb-3">
                {selectedItem.title}
              </h3>
              <p className="text-gray-300">{selectedItem.description}</p>

              <hr className="border-t border-cyan-500/30 w-full mt-6" />

              {/* Software Used */}
              {selectedItem.software && (
                <div>
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Software Used
                  </h4>

                  <div className="flex flex-wrap gap-4">
                    {selectedItem.software.map((tool, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition"
                      >
                        <div className="text-2xl text-cyan-400">
                          {softwareIcons[tool]}
                        </div>

                        <span className="text-gray-200 text-sm">
                          {tool}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
        </div>
      )}
    </section>
  );
};

export default Gallery;
