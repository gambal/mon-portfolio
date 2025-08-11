'use client';
import { useEffect } from 'react';
import './lightbox.css';

export default function Lightbox() {
  useEffect(() => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const imgElement = document.createElement('img');
    overlay.appendChild(imgElement);
    document.body.appendChild(overlay);

    // On attend un petit délai pour être sûr que les images existent
    const timer = setTimeout(() => {
      const images = document.querySelectorAll('.project-slug-images img');

      images.forEach(img => {
        img.addEventListener('click', () => {
          imgElement.src = img.src;
          overlay.classList.add('active');
        });
      });
    }, 100); // 100ms suffit en général

    // Fermer en cliquant sur l'overlay
    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
    });

    return () => {
      clearTimeout(timer);
      overlay.remove();
    };
  }, []);

  return null;
}
