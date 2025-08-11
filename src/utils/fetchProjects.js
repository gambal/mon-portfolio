//---\mon-portfolio\src\utils\fetchProjects.js

import axios from 'axios';

export async function fetchProjects() {
  const res = await axios.get('https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?populate=*');
  return res.data.data;
}

export async function fetchMylife() {
  const res = await axios.get('https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?populate=*');
  return res.data.data;
}

export async function fetchProjectBySlug(slug) {
  const res = await axios.get(`https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?filters[Slug][$eq]=${slug}&populate=*`);
  return res.data.data[0] || null;
}
