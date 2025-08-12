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

  if (!projets.length) {
    return <p className="p-8">Chargement des projets...</p>;
  }

  return (
      <main className="projects-container">
        <div className='graphiqueProject'></div>
      {projets.map((projet, projetIndex) => {
        const imageUrls =
          projet.Image?.map(
            (img) => img.formats?.medium?.url || img.url
          ) || [];

        const preset = widthPresets[projetIndex % widthPresets.length];

        return (
          <div key={projet.id} className="project-card">
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

            <div className="project-images">
                {imageUrls.length > 0 ? (
                    imageUrls.slice(0, 3).map((url, index) => {
                    const randomZIndex = Math.random() < 0.5 ? 9 : 11; // 50% chance

                    return (
                        <img
                        key={index}
                        src={url}
                        alt={`Image ${index + 1}`}
                        style={{
                            width: preset[index] || '30%',
                            position: 'relative',
                            zIndex: randomZIndex
                        }}
                        />
                    );
                    })
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
