'use client';
import { useEffect } from 'react';
import './lightbox.css';

export default function Lightbox() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // conteneurs autorisés — tu peux ajouter d'autres sélecteurs si besoin
    const containerSelectors = ['.project-slug-images', '.mylife-images-grid'];

    // Réutiliser overlay s'il existe (évite doublons si mount multiple)
    let overlay = document.querySelector('.lightbox-overlay');
    let created = false;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = '<img class="lightbox-image" alt="Preview" />';
      document.body.appendChild(overlay);
      created = true;
    }

    const imgElement = overlay.querySelector('.lightbox-image');

    const open = (img) => {
      const src =
        img.currentSrc ||
        img.src ||
        img.dataset?.src ||
        img.getAttribute('data-src') ||
        '';
      if (!src) return;
      imgElement.src = src;
      overlay.classList.add('active');
      // optionnel : bloquer le scroll de fond
      document.documentElement.style.overflow = 'hidden';
    };

    const close = () => {
      overlay.classList.remove('active');
      imgElement.src = '';
      document.documentElement.style.overflow = '';
    };

    const isAllowedImg = (img) =>
      containerSelectors.some((sel) => Boolean(img.closest(sel)));

    const onDocumentClick = (e) => {
      const target = e.target;

      // si clic dans l'overlay (mais pas sur l'image) => fermer
      if (overlay.contains(target) && !target.closest('.lightbox-image')) {
        close();
        return;
      }

      const img = target.closest('img');
      if (!img) return;
      if (!isAllowedImg(img)) return;

      // empêcher lien par exemple
      if (e.defaultPrevented) return;
      e.preventDefault();

      open(img);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
    };

    // capture early pour attraper clics sur images avant d'autres handlers
    document.addEventListener('click', onDocumentClick, true);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      document.removeEventListener('keydown', onKeyDown);
      if (created && overlay.parentNode) overlay.remove();
    };
  }, []);

  return null;
}
