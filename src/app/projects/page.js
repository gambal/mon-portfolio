// src/app/projects/page.js

import Link from 'next/link';
import { fetchProjects } from '../../utils/fetchProjects';
import './projects.css';

const widthPresets = [
  ['40%', '30%', '30%'],
  ['30%', '50%', '20%'],
  ['50%', '20%', '30%'],
];

export default async function Projects() {
  const projets = await fetchProjects();

  // Tri par année croissante (conversion en nombre)
  projets.sort((a, b) => parseInt(a.Annee, 10) - parseInt(b.Annee, 10));

  if (!projets.length) {
    return <p className="p-8">Chargement des projets...</p>;
  }

  return (
    <main className="projects-container">
      <div className='graphiqueProject'></div>

      {projets.map((projet, projetIndex) => {
        const mediaItems = projet.Media || [];
        const preset = widthPresets[projetIndex % widthPresets.length];

        return (
          <div key={projet.id} className="project-card">
            {/* Texte du projet */}
            <div className="project-text">
              <div className="project-meta">
                <h2 className="project-title">
                  <div className={projet.Titre?.length > 9 ? 'scroll-wrapper' : ''}>
                    <span className={projet.Titre?.length > 9 ? 'scroll-text' : ''}>
                      <Link href={`/projects/${projet.Slug}`}>
                        {projet.Titre}
                      </Link>
                    </span>
                  </div>
                </h2>
                <span className="project-year">
                  <strong>→ {projet.Annee}</strong>
                </span>
              </div>

              <div className="project-category-container">
                {projet.Categorie &&
                  projet.Categorie.split(' - ').map((cat, index) => (
                    <p key={index} className="project-category">
                      {cat.trim()}
                    </p>
                  ))
                }
              </div>

              <p className="project-description">
                {projet.Description?.[0]?.children?.[0]?.text || 'Pas de description'}
              </p>
            </div>

            {/* Médias du projet */}
            <div className="project-media">
              {mediaItems.length > 0 ? (
                mediaItems.slice(0, 3).map((media, index) => {
                  const randomZIndex = Math.random() < 0.5 ? 9 : 11;

                  if (media.type === 'image') {
                    return (
                      <img
                        key={index}
                        src={media.url}
                        alt={`Media ${index + 1}`}
                        style={{
                          width: preset[index] || '30%',
                          position: 'relative',
                          zIndex: randomZIndex,
                        }}
                      />
                    );
                  }

                  if (media.type === 'video') {
                    return (
                      <video
                        key={index}
                        src={media.url}
                        // controls
                        muted
                        autoPlay
                        loop
                        playsInLine
                        style={{
                          width: preset[index] || '30%',
                          position: 'relative',
                          zIndex: randomZIndex,
                        }}
                      />
                    );
                  }

                  return null;
                })
              ) : (
                <p className="text-gray-500">Aucun média</p>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
