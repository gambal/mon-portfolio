'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProjects } from '../../utils/fetchProjects';
import './projects.css';

const widthPresets = [
  ['40%', '30%', '30%'],
  ['30%', '50%', '20%'],
  ['50%', '20%', '30%'],
];

export default function Projects() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjets);
  }, []);

  useEffect(() => {
    const titles = document.querySelectorAll('.project-title');

    titles.forEach(title => {
      const link = title.querySelector('a');
      if (!link) return;

      const maxChars = 25;
      if (link.textContent.trim().length > maxChars) {
        link.classList.add('scroll-on-hover');
      } else {
        link.classList.remove('scroll-on-hover');
      }
    });
  }, [projets]);

  if (projets.length === 0) {
    return <p className="p-8">Chargement des projets...</p>;
  }

  return (
    <main className="projects-container">
      {projets.map((projet, projetIndex) => {
        const imageUrls =
          projet.images?.map(
            (img) => img.formats?.medium?.url || img.url
          ) || [];

        const preset = widthPresets[projetIndex % widthPresets.length];

        return (
          <div key={projet.id} className="project-card">
            <div className="project-text">
              <div className="project-meta">
                <h2 className="project-title">
                  <Link href={`/projects/${projet.slug}`}>
                    {projet.titre}
                  </Link>
                </h2>
                <span className="project-year"><strong>→ {projet.annee}</strong></span>
              </div>
              <div className="project-category-container">
                {projet.categorie &&
                  projet.categorie.split(' - ').map((cat, index) => (
                    <p key={index} className="project-category">
                      {cat.trim()}
                    </p>
                  ))
                }
              </div>
              <p className="project-description">
                {projet.description?.[0]?.children?.[0]?.text || 'Pas de description'}
              </p>
            </div>

            <div className="project-images">
              {imageUrls.length > 0 ? (
                imageUrls.slice(0, 3).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    style={{ width: preset[index] || '30%' }}
                  />
                ))
              ) : (
                <p className="text-gray-500">Aucune image</p>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
