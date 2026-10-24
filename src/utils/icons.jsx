import React from "react";
import {
  FaPaintBrush, FaPenNib, FaCircle, FaCamera, FaVideo, FaFilm, FaImage, FaPalette,
  FaGamepad, FaMagic, FaCube, FaPencilAlt, FaTwitter, FaInstagram, FaArtstation,
  FaLinkedin, FaFacebook, FaYoutube, FaTiktok, FaBehance, FaDribbble, FaDeviantart,
  FaGithub, FaGlobe, FaPatreon, FaDiscord,
} from "react-icons/fa";
import { TbBox, Tb3DCubeSphere } from "react-icons/tb";
import { MdCampaign, MdPhotoCamera } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import {
  SiAdobeaftereffects, SiAdobeillustrator, SiAdobephotoshop, SiAdobepremierepro,
  SiAdobelightroom, SiAdobeindesign, SiBlender, SiAdobe, SiFigma, SiAutodesk,
  SiUnrealengine, SiUnity, SiKrita, SiHoudini, SiCanva, SiSketchfab, SiInkscape,
  SiGimp, SiAffinitydesigner, SiAffinityphoto,
} from "react-icons/si";

// NOTE: the keys below are the choices shown in the /admin editor
// (public/admin/index.html). Keep both lists in sync when adding icons.
export const skillIcons = {
  brush: FaPaintBrush,
  pen: FaPenNib,
  pencil: FaPencilAlt,
  circle: FaCircle,
  box: TbBox,
  "cube-sphere": Tb3DCubeSphere,
  cube: FaCube,
  camera: MdPhotoCamera,
  "photo-camera": FaCamera,
  video: RiVideoFill,
  "video-camera": FaVideo,
  film: FaFilm,
  image: FaImage,
  palette: FaPalette,
  gamepad: FaGamepad,
  magic: FaMagic,
  campaign: MdCampaign,
};

// eslint-disable-next-line react-refresh/only-export-components
const DavinciIcon = (props) => (
  <img
    src="https://cdn.jsdelivr.net/npm/simple-icons@16/icons/davinciresolve.svg"
    alt="DaVinci Resolve"
    className="w-[1em] h-[1em] filter-[invert(100%)_sepia(100%)_saturate(10000%)_hue-rotate(145deg)_brightness(100%)_contrast(100%)]"
    {...props}
  />
);

// Matched by name, so "Premiere", "Premiere Pro" and "premiere pro" all work.
const softwareIconMap = {
  aftereffects: SiAdobeaftereffects,
  illustrator: SiAdobeillustrator,
  photoshop: SiAdobephotoshop,
  premiere: SiAdobepremierepro,
  premierepro: SiAdobepremierepro,
  lightroom: SiAdobelightroom,
  indesign: SiAdobeindesign,
  blender: SiBlender,
  animate: SiAdobe,
  figma: SiFigma,
  maya: SiAutodesk,
  "3dsmax": SiAutodesk,
  unrealengine: SiUnrealengine,
  unity: SiUnity,
  krita: SiKrita,
  houdini: SiHoudini,
  canva: SiCanva,
  sketchfab: SiSketchfab,
  inkscape: SiInkscape,
  gimp: SiGimp,
  affinitydesigner: SiAffinitydesigner,
  affinityphoto: SiAffinityphoto,
  davinciresolve: DavinciIcon,
};

export const socialIcons = {
  twitter: FaTwitter,
  instagram: FaInstagram,
  artstation: FaArtstation,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  behance: FaBehance,
  dribbble: FaDribbble,
  deviantart: FaDeviantart,
  github: FaGithub,
  patreon: FaPatreon,
  discord: FaDiscord,
  website: FaGlobe,
};

const normalize = (name = "") => name.toLowerCase().replace(/[^a-z0-9]/g, "");

export function getSoftwareIcon(name) {
  return softwareIconMap[normalize(name)] || null;
}

export function getSkillIcon(key, name) {
  return skillIcons[key] || getSoftwareIcon(name) || FaPaintBrush;
}

export function getSocialIcon(platform) {
  return socialIcons[platform] || FaGlobe;
}
