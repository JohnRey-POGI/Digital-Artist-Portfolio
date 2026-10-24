// All editable content lives in this folder and is managed from /admin.
// Every file in ./projects is one portfolio item.
import settings from './settings.json';
import skills from './skills.json';
import servicesFile from './services.json';

const projectFiles = import.meta.glob('./projects/*.json', { eager: true, import: 'default' });

export const projects = Object.entries(projectFiles)
  .map(([path, data]) => ({ ...data, id: path.split('/').pop().replace('.json', '') }))
  .filter((p) => p.published !== false)
  // Newest first; changing the date in the editor moves a project.
  .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || a.title.localeCompare(b.title));

export const services = servicesFile.services || [];

export { settings, skills };
