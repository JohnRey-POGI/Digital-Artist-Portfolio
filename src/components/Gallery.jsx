import React, { useState, useEffect, useCallback } from 'react';
import ModelViewer from './ModelViewer';
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../utils/animations";
import { projects } from "../content";
import { getSoftwareIcon } from "../utils/icons";
import { FaCube, FaPlay } from "react-icons/fa";

// Projects are added from /admin. Each "type" gets its own group on the page;
// projects missing their main file are skipped instead of showing broken.
const isReady = {
  image: (p) => p.image,
  video: (p) => p.video || p.videoUrl,
  "3d": (p) => p.model,
};

const itemsByType = Object.fromEntries(
  Object.keys(isReady).map((type) => [type, projects.filter((p) => p.type === type && isReady[type](p))])
);

const getYouTubeId = (url = "") =>
  url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/)?.[1];

const getVimeoId = (url = "") => url.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1];

const getEmbedUrl = (url) => {
  const youtubeId = getYouTubeId(url);
  if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
  const vimeoId = getVimeoId(url);
  if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
  return null;
};

const getThumbnail = (project) => {
  if (project.image) return project.image;
  const youtubeId = getYouTubeId(project.videoUrl);
  return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : null;
};

const CardOverlay = ({ label }) => (
  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </p>
  </div>
);

const VideoCard = ({ project, onOpen }) => {
  const thumbnail = getThumbnail(project);

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group bg-gray-900"
      onClick={onOpen}
    >
      {thumbnail ? (
        <img
          src={thumbnail}
          alt={project.title}
          className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <video
          src={`${project.video}#t=0.5`}
          muted
          playsInline
          loop
          preload="metadata"
          onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
          onMouseLeave={(e) => e.currentTarget.pause()}
          className="w-full aspect-video object-cover"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="bg-black/60 text-white w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300">
          <FaPlay className="ml-1" />
        </span>
      </div>
      <p className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white font-semibold truncate">
        {project.title}
      </p>
    </div>
  );
};

const ModelCard = ({ project, onOpen }) => (
  <div
    className="relative overflow-hidden rounded-lg cursor-pointer group"
    onClick={onOpen}
  >
    {project.image ? (
      <img
        src={project.image}
        alt={project.title}
        className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-300"
      />
    ) : (
      <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center gap-4 text-cyan-400">
        <FaCube size={64} />
        <span className="text-gray-300 font-semibold px-4 text-center">{project.title}</span>
      </div>
    )}
    <CardOverlay label="View 3D" />
  </div>
);

const ModalMedia = ({ item }) => {
  if (item.type === "3d") return <ModelViewer modelUrl={item.model} />;

  if (item.type === "video") {
    const embedUrl = item.video ? null : getEmbedUrl(item.videoUrl);
    if (embedUrl) {
      return (
        <iframe
          src={embedUrl}
          title={item.title}
          className="w-full aspect-video rounded-lg"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <video
        key={item.id}
        src={item.video || item.videoUrl}
        poster={item.image}
        controls
        autoPlay
        playsInline
        className="max-h-[80vh] w-full rounded-lg bg-black"
      />
    );
  }

  return (
    <img
      src={item.image}
      alt={item.title}
      className="max-h-[80vh] max-w-full object-contain rounded-lg"
    />
  );
};

const Gallery = () => {
  const [current, setCurrent] = useState(null); // { type, index }

  const currentList = current ? itemsByType[current.type] : [];
  const selectedItem = current ? currentList[current.index] : null;

  const openModal = (type, index) => setCurrent({ type, index });
  const closeModal = () => setCurrent(null);

  // Prev & Next (wraps around within the same group)
  const step = useCallback((direction) => {
    setCurrent((prev) => {
      if (!prev) return prev;
      const length = itemsByType[prev.type].length;
      return { ...prev, index: (prev.index + direction + length) % length };
    });
  }, []);

  useEffect(() => {
    if (current === null) return;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") setCurrent(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [current, step]);

  const images = itemsByType.image;
  const videos = itemsByType.video;
  const models = itemsByType["3d"];

  return (
    <section id="gallery" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-gray-800 z-0" />
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-400">Portfolio Gallery</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mt-4 rounded"></div>
        </div>

        {/* Artworks */}
        {images.length > 0 && (
          <motion.div variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 md:gap-4 gap-2">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeUp}
                whileHover={{ scale: 1.1 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openModal("image", index)}
              >
                <img
                  src={image.image}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square transform group-hover:scale-110 transition-transform duration-300"
                />
                <CardOverlay label="View" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-cyan-400 mt-16 mb-8 text-center">
              Videos & Animations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <VideoCard key={video.id} project={video} onOpen={() => openModal("video", index)} />
              ))}
            </div>
          </>
        )}

        {/* 3D Models */}
        {models.length > 0 && (
          <>
            <h2 className="text-3xl font-bold text-cyan-400 mt-16 mb-8 text-center">
              3D Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <ModelCard key={model.id} project={model} onOpen={() => openModal("3d", index)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 overflow-y-auto"
          onClick={closeModal}
        >
          <div className="min-h-screen flex items-center justify-center p-4">
          <div
            className="relative w-full max-w-6xl bg-gray-900 rounded-xl p-6 pt-16 md:pt-6 flex flex-col md:flex-row gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {currentList.length > 1 && (
              <>
                {/* Previous */}
                <button
                  onClick={() => step(-1)}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-cyan-500
                  text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50"
                >
                  &#10094;
                </button>

                {/* Next */}
                <button
                  onClick={() => step(1)}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-cyan-500
                  text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl z-50"
                >
                  &#10095;
                </button>
              </>
            )}

            {/* Left: Image / Video / 3D Viewer */}
            <div className="flex-1 flex items-center justify-center max-h-[80vh] min-w-0">
              <ModalMedia item={selectedItem} />
            </div>

            {/* Right / Bottom: Description */}
            <div className="flex-1 overflow-auto text-white max-h-[80vh]">
              <h3 className="text-3xl font-bold text-cyan-400 mb-3">
                {selectedItem.title}
              </h3>
              {selectedItem.description && (
                <p className="text-gray-300 whitespace-pre-line">{selectedItem.description}</p>
              )}

              {/* Software Used */}
              {selectedItem.software?.length > 0 && (
                <div>
                  <hr className="border-t border-cyan-500/30 w-full my-6" />
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Software Used
                  </h4>

                  <div className="flex flex-wrap gap-4">
                    {selectedItem.software.map((tool, index) => {
                      const Icon = getSoftwareIcon(tool);
                      return (
                        <span
                          key={index}
                          className="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition"
                        >
                          {Icon && (
                            <div className="text-2xl text-cyan-400">
                              <Icon />
                            </div>
                          )}

                          <span className="text-gray-200 text-sm">
                            {tool}
                          </span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-white bg-cyan-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-cyan-600 z-50"
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
