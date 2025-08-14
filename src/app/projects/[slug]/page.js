// src/app/projects/[slug]/page.js

import { fetchProjects } from "../../../utils/fetchProjects";
import "./projectSlug.css";
import "./gridVariant.css";
import Lightbox from "../../../utils/lightbox";
import EscapeRedirect from "../../../utils/EscapeRedirect"; // 🔹 Composant client

const gridVariantsByCount = {
  1: ["grid-1-variant-1", "grid-1-variant-2", "grid-1-variant-3"],
  2: ["grid-2-variant-1", "grid-2-variant-2", "grid-2-variant-3"],
  3: ["grid-3-variant-1", "grid-3-variant-2", "grid-3-variant-3"],
  4: ["grid-4-variant-1", "grid-4-variant-2", "grid-4-variant-3"],
  5: ["grid-5-variant-1", "grid-5-variant-2", "grid-5-variant-3"],
  6: ["grid-6-variant-1", "grid-6-variant-2", "grid-6-variant-3"],
  7: ["grid-7-variant-1", "grid-7-variant-2", "grid-7-variant-3"],
  8: ["grid-8-variant-1", "grid-8-variant-2", "grid-8-variant-3"],
  9: ["grid-9-variant-1", "grid-9-variant-2", "grid-9-variant-3"],
  10: ["grid-10-variant-1", "grid-10-variant-2", "grid-10-variant-3"],
};

export default async function ProjectPage({ params }) {
  const projets = await fetchProjects();
  const projet = projets.find((p) => p.Slug === params.slug);
  const maxMedia = 10;

  if (!projet) {
    return <p>Projet introuvable</p>;
  }

  const mediaItems = projet.Media || [];
  const limitedMedia = mediaItems.slice(0, maxMedia);
  const mediaCount = limitedMedia.length;

  const variantsForCount = gridVariantsByCount[mediaCount] || [];
  const gridClass = variantsForCount.length
    ? variantsForCount[Math.floor(Math.random() * variantsForCount.length)]
    : "";

  return (
    <main className="project-slug-container">
      {/* 🔹 Ajout du listener Escape */}
      <EscapeRedirect to="/projects" />

      <div className="graphiqueProjectSlug" style={{ transform: `rotate(0deg)` }}></div>

      {/* Colonne gauche */}
      <div className="project-slug-text">
        <h1 className="project-slug-title">{projet.Titre}</h1>

        <div className="project-slug-category-container">
          {projet.Categorie &&
            projet.Categorie.split(" - ").map((cat, index) => (
              <p key={index} className="project-slug-category">
                {cat.trim()}
              </p>
            ))}
        </div>

        <p className="project-slug-description">
          {projet.Explication || "Pas d’explication disponible."}
        </p>

        <div className="project-slug-bottom-meta">
          {projet.Collaboration && (
            <p className="project-slug-collaboration">{projet.Collaboration}</p>
          )}
          <span className="project-slug-year">→ {projet.Annee}</span>
        </div>
      </div>

      {/* Colonne droite avec GRID dynamique */}
      <div className={`project-slug-images ${gridClass}`}>
        {limitedMedia.length > 0 ? (
          limitedMedia.map((media, index) => {
            const randomZIndex = Math.random() < 0.5 ? 9 : 11;

            if (media.type === "image") {
              return (
                <img
                  key={index}
                  src={media.url}
                  alt={`Média ${index + 1}`}
                  className="clickable-img"
                  style={{ position: "relative", zIndex: randomZIndex }}
                />
              );
            }

            if (media.type === "video") {
              return (
                <video
                  key={index}
                  src={media.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="clickable-img"
                  style={{ position: "relative", zIndex: randomZIndex }}
                />
              );
            }

            return null;
          })
        ) : (
          <p>Aucun média</p>
        )}
      </div>

      <Lightbox />
    </main>
  );
}
