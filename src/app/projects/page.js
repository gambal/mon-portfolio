'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProjects } from '../../utils/fetchProjects';
import './projects.css'; // On importe le CSS externe

export default function Projects() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjets);
  }, []);

  if (projets.length === 0) {
    return <p className="p-8">Chargement des projets...</p>;
  }

  return (
    <main className="projects-container">
      {projets.map((projet) => {
        const imageUrls =
          projet.Image?.map(
            (img) => img.formats?.medium?.url || img.url
          ) || [];

        return (
          <div key={projet.id} className="project-card">
            {/* Colonne gauche */}
            <div className="project-text">
              <div className="project-meta">
                <h2 className="project-title">
                  <Link href={`/projects/${projet.Slug}`}>
                    {projet.Titre}
                  </Link>
                </h2>
                <span><strong>{projet.Annee}</strong></span>
              </div>

              {projet.Categorie && (
                <p className="project-category">
                  {projet.Categorie}
                </p>
              )}

              <p className="project-description">
                {projet.Description?.[0]?.children?.[0]?.text || 'Pas de description'}
              </p>
            </div>

            {/* Colonne droite : max 3 images */}
            <div className="project-images">
              {imageUrls.length > 0 ? (
                imageUrls.slice(0, 3).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
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
