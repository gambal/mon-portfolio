'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProjects } from '../../utils/fetchProjects';

export default function Projects() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjets);
  }, []);

  if (projets.length === 0) {
    return <p className="p-8">Chargement des projets...</p>;
  }

  return (
    <main className="min-h-screen bg-white p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Mes projets 🎨</h1>

      {projets.map(projet => {
        const imageUrls = projet.Image?.map(
          img => img.formats?.medium?.url || img.url
        ) || [];

        return (
          <div key={projet.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-pink-100 rounded shadow h-[20vh] overflow-hidden">
            {/* Colonne gauche */}
            <div className="p-4 overflow-auto">
              <h2 className="text-xl font-semibold mb-1">
                <Link href={`/projects/${projet.Slug}`} className="text-blue-700 hover:underline">
                  {projet.Titre}
                </Link>
              </h2>
              <p className="text-sm text-gray-700 mb-1">
                {projet.Description?.[0]?.children?.[0]?.text || 'Pas de description'}
              </p>
              {projet.Categorie && (
                <p className="text-sm mb-1"><strong>Catégorie :</strong> {projet.Categorie}</p>
              )}
              <p className="text-sm"><strong>Année :</strong> {projet.Annee}</p>

            </div>

            {/* Colonne droite : images */}
            <div className="md:col-span-2 overflow-x-auto flex items-center space-x-4 px-4">
              {imageUrls.length > 0 ? (
                imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Image ${index + 1}`}
                    className="h-full object-contain rounded shadow"
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
