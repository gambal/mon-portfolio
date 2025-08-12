"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchMylife } from "@/utils/fetchProjects";
import Lightbox from "@/utils/lightbox";
import "./mylife.css";
import "./gridVariantMyLife.css"; // ⬅ pour réutiliser tes grilles


import { M_PLUS_1p } from 'next/font/google';

// Import et configuration de la police
const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'], // poids que tu veux utiliser
  subsets: ['latin'],
});

// import Lightbox from '../../utils/lightbox';
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

const HARDCODED_YEARS = Array.from({ length: 2025 - 2016 + 1 }, (_, i) => 2016 + i);

export default function MylifePage() {
  const [mylifeData, setMylifeData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMylife();
        setMylifeData(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("fetchMylife error", e);
      }
    })();
  }, []);

  const entriesForYear = selectedYear
    ? mylifeData.filter((item) => String(item.annee) === String(selectedYear))
    : [];

  const actionsForYear = [...new Set(entriesForYear.map((e) => e.action))];

  const actionDetails = selectedAction
    ? entriesForYear.find((e) => e.action === selectedAction)
    : null;

  // 🔹 Limiter à 10 images
  const limitedImages = useMemo(() => {
    return actionDetails?.images?.slice(0, 6) || [];
  }, [actionDetails]);

  // 🔹 Calcul classe de grid selon le nombre d’images limitées
  const gridClass = useMemo(() => {
    if (!limitedImages.length) return "";
    const count = limitedImages.length;
    const variants = gridVariantsByCount[count] || [];
    return variants.length
      ? variants[Math.floor(Math.random() * variants.length)]
      : "";
  }, [limitedImages]);

  return (
    <div className="mylife-layout">
      <div className="graphiqueMyLife"></div>

      {/* Colonne Années */}
      <aside className="mylife-years">
        {HARDCODED_YEARS.map((year) => (
          <button
            key={year}
            className={`year-item ${selectedYear == year ? "active" : ""}`}
            onClick={() => {
              setSelectedYear(year);
              if (actionsForYear.length > 0) {
                setSelectedAction(actionsForYear[0]);
              } else {
                setSelectedAction(null);
              }
            }}
          >
            <span className="arrow">→</span> {year}
          </button>
        ))}
      </aside>

      {/* Colonne Actions */}
      <div className="mylife-actions">
        {actionsForYear.map((action) => (
          <div
            key={`${selectedYear}-${action}`}
            className={`action-item ${selectedAction === action ? "active" : ""}`}
            onMouseEnter={() => setSelectedAction(action)}
          >
            {action}
          </div>
        ))}
      </div>

      {/* Colonne Explication */}
      <div className="mylife-explication">
        {actionDetails?.explication && <p>{actionDetails.explication}</p>}
      </div>

      {/* Colonne Images avec GRID dynamique */}
      <div className={`mylife-images-grid ${gridClass}`}>
        {limitedImages.map((imgUrl, i) => {
          const randomZIndex = Math.random() < 0.5 ? 9 : 11;
          const extraClass = randomZIndex === 11 ? "z11-shadow" : "";

          return (
            <img
              key={i}
              src={imgUrl}
              alt={selectedAction || `image-${i}`}
              className={extraClass}
              style={{
                position: "relative",
                zIndex: randomZIndex,
              }}
            />
          );
        })}

      </div>
      <Lightbox />
    </div>
  );
}
