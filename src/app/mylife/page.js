"use client";

import { useEffect, useState } from "react";
import { fetchMylife } from "@/utils/fetchProjects";
import "./mylife.css";

const HARDCODED_YEARS = Array.from({ length: 2025 - 2012 + 1 }, (_, i) => 2012 + i);

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
    ? mylifeData.filter(item => String(item.annee) === String(selectedYear))
    : [];

  const actionsForYear = [...new Set(entriesForYear.map(e => e.action))];

  const actionDetails = selectedAction
    ? entriesForYear.find(e => e.action === selectedAction)
    : null;

  return (
    <div className="mylife-layout">
      {/* Colonne Années */}
      <aside className="mylife-years">
        {HARDCODED_YEARS.map(year => (
          <button
            key={year}
            className={`year-item ${selectedYear == year ? "active" : ""}`}
            onClick={() => {
              setSelectedYear(year);
              // Sélectionne automatiquement la première action
              if (actionsForYear.length > 0) {
                setSelectedAction(actionsForYear[0]);
              } else {
                setSelectedAction(null);
              }
            }}
          >
            → {year}
          </button>
        ))}
      </aside>

      {/* Colonne Actions */}
      <div className="mylife-actions">
        {actionsForYear.map(action => (
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

      {/* Colonne Images */}
      <div className="mylife-images-grid">
        {actionDetails?.images?.length > 0 && (
          <div className="images-grid">
            {actionDetails.images.map((imgUrl, i) => (
              <img key={i} src={imgUrl} alt={selectedAction || `image-${i}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
