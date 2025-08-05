'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    axios
      .get('https://phenomenal-boat-7e7ba709d3.strapiapp.com/api/projets?populate=*')
      .then(res => {
        console.log('Données reçues:', res.data.data);
        setProjets(res.data.data);
      })
      .catch(console.error);
  }, []);

  if (projets.length === 0) {
    return <p className="p-8">Chargement des projets...</p>;
  }

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6">Mes projets 🎨</h1>
      <ul className="space-y-4">
        {projets.map(projet => {
          const imageUrl =
            projet.Image?.[0]?.formats?.medium?.url ||
            projet.Image?.[0]?.url;

          return (
            <li key={projet.id} className="p-4 bg-pink-100 rounded shadow">
              <h2 className="text-xl font-semibold">{projet.Titre}</h2>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={projet.Image[0].name}
                  className="w-full max-w-md mb-4 rounded"
                />
              )}

              <p>{projet.Description?.[0]?.children?.[0]?.text || 'Pas de description'}</p>
              <p><strong>Année :</strong> {projet.Annee}</p>
              <a className="text-blue-600 underline" href={projet.Lien}>Lien</a>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
