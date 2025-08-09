// \src\app\projects\slug\page.js
import { fetchProjectBySlug } from '../../../utils/fetchProjects';

export async function generateStaticParams() {
  const projets = await fetchProjects();

  return projets.map(projet => ({
    slug: projet.slug, // en minuscule
  }));
}

export default async function ProjectPage({ params }) {
  const projet = await fetchProjectBySlug(params.slug);
  if (!projet) {
    return <main className="p-8"><p>Projet non trouvé</p></main>;
  }

  const imageUrl =
    projet.images?.[0]?.formats?.medium?.url ||
    projet.images?.[0]?.url;

  return (
    <main className="min-h-screen p-8 bg-pink-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{projet.titre}</h1>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={projet.images?.[0]?.name || 'Image du projet'}
            className="w-full mb-6 rounded shadow"
          />
        )}

        <p className="mb-4 text-lg">
          {projet.description?.[0]?.children?.[0]?.text || 'Pas de description disponible.'}
        </p>

        <p className="mb-2"><strong>Année :</strong> {projet.annee}</p>
      </div>
    </main>
  );
}
