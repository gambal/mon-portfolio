"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchMylife } from "@/utils/fetchProjects";
import Lightbox from "@/utils/lightbox";
import "./mylife.css";
import "./gridVariantMyLife.css";

import { M_PLUS_1p } from 'next/font/google';

const mPlus1p = M_PLUS_1p({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const gridVariantsByCount = {
  1: ["mylife-grid-1-variant-1", "mylife-grid-1-variant-2", "mylife-grid-1-variant-3"],
  2: ["mylife-grid-2-variant-1", "mylife-grid-2-variant-2", "mylife-grid-2-variant-3"],
  3: ["mylife-grid-3-variant-1", "mylife-grid-3-variant-2", "mylife-grid-3-variant-3"],
  4: ["mylife-grid-4-variant-1", "mylife-grid-4-variant-2", "mylife-grid-4-variant-3"],
  5: ["mylife-grid-5-variant-1", "mylife-grid-5-variant-2", "mylife-grid-5-variant-3"],
  6: ["mylife-grid-6-variant-1", "mylife-grid-6-variant-2", "mylife-grid-6-variant-3"],
  7: ["mylife-grid-7-variant-1", "mylife-grid-7-variant-2", "mylife-grid-7-variant-3"],
  8: ["mylife-grid-8-variant-1", "mylife-grid-8-variant-2", "mylife-grid-8-variant-3"],
  9: ["mylife-grid-9-variant-1", "mylife-grid-9-variant-2", "mylife-grid-9-variant-3"],
  10: ["mylife-grid-10-variant-1", "mylife-grid-10-variant-2", "mylife-grid-10-variant-3"],
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

        // Initialise année et action par défaut
        if (data.length > 0) {
          const firstYear = data[0].annee;
          setSelectedYear(firstYear);
          const firstAction = data.find(e => e.annee === firstYear)?.action || null;
          setSelectedAction(firstAction);
        }
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

  // 🔹 Limiter à 6 médias
  const limitedMedia = useMemo(() => {
    return actionDetails?.images?.slice(0, 6) || [];
  }, [actionDetails]);

  const gridClass = useMemo(() => {
    if (!limitedMedia.length) return "";
    const count = limitedMedia.length;
    const variants = gridVariantsByCount[count] || [];
    return variants.length
      ? variants[Math.floor(Math.random() * variants.length)]
      : "";
  }, [limitedMedia]);

  return (
    <div className={`mylife-layout ${mPlus1p.className}`}>
      <div className="graphiqueMyLife"></div>

      {/* Colonne Années */}
      <aside className="mylife-years">
        {HARDCODED_YEARS.map((year) => (
          <button
            key={year}
            className={`year-item ${selectedYear == year ? "active" : ""}`}
            onClick={() => {
              setSelectedYear(year);
              const firstActionForYear = mylifeData.find(e => e.annee === year)?.action || null;
              setSelectedAction(firstActionForYear);
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

      {/* Colonne Médias */}
      <div className={`mylife-images-grid ${gridClass}`}>
        {limitedMedia.map((media, i) => {
          const randomZIndex = Math.random() < 0.5 ? 9 : 11;
          const extraClass = randomZIndex === 11 ? "z11-shadow" : "";

          if (media.type === "image") {
            return (
              <img
                key={i}
                src={media.url}
                alt={selectedAction || `image-${i}`}
                className={extraClass}
                style={{
                  position: "relative",
                  zIndex: randomZIndex,
                }}
              />
            );
          }

          if (media.type === "video") {
            return (
              <video
                key={i}
                src={media.url}
                controls
                className={extraClass}
                style={{
                  position: "relative",
                  zIndex: randomZIndex,
                  maxWidth: "100%",
                }}
              />
            );
          }

          return null;
        })}
      </div>

      <Lightbox />
    </div>
  );
}
