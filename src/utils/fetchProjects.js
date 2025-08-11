//---\mon-portfolio\src\utils\fetchProjects.js

import axios from 'axios';

export async function fetchProjects() {
  const res = await axios.get(
    'https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets', 
    {
      params: {
        populate: '*',
        'filters[Titre][$notNull]': true
      }
    }
  );
  return res.data.data;
}


export async function fetchMylife() {
  const res = await axios.get(
    'https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?populate=*'
  );

  return res.data.data
    .filter((item) =>
      item?.mylifeAnnee || 
      item?.mylifeAction || 
      item?.mylifeExplication
    ) // On ne garde que ceux qui ont au moins un champ mylife
    .map((item) => ({
      annee: item?.mylifeAnnee || null,
      action: item?.mylifeAction || null,
      explication: item?.mylifeExplication || null,
      images: item?.mylifeImages?.map(img => img?.formats?.medium?.url || img?.url) || [],
    }));
}



export async function fetchProjectBySlug(slug) {
  const res = await axios.get(`https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?filters[Slug][$eq]=${slug}&populate=*`);
  return res.data.data[0] || null;
}
