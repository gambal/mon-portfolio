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


// import axios from "axios";

export async function fetchMylife() {
  const res = await axios.get(
    "https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?populate=*"
  );

  return res.data.data
    .filter(
      (item) =>
        item?.mylifeAnnee ||
        item?.mylifeAction ||
        item?.mylifeExplication
    )
    .map((item) => ({
      annee: item?.mylifeAnnee || null,
      action: item?.mylifeAction || null,
      explication: item?.mylifeExplication || null,
      images:
        item?.mylifeImages?.map((img) => {
          if (!img) return null;
          const originalUrl = img?.url || img?.formats?.original?.url;
          // Si c'est un GIF => on garde l'original
          if (originalUrl?.toLowerCase().endsWith(".gif")) {
            return originalUrl;
          }
          // Sinon => on garde la version optimisée
          return img?.formats?.medium?.url || originalUrl;
        }) || [],
    }));
}




export async function fetchProjectBySlug(slug) {
  const res = await axios.get(`https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?filters[Slug][$eq]=${slug}&populate=*`);
  return res.data.data[0] || null;
}
