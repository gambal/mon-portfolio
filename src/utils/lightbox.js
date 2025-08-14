'use client';
import { useEffect } from 'react';
import './lightbox.css';

export default function Lightbox() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const containerSelectors = ['.project-slug-images', '.mylife-images-grid'];

    let overlay = document.querySelector('.lightbox-overlay');
    let created = false;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <img class="lightbox-image" alt="Preview" style="display:none;" />
        <video class="lightbox-video" controls autoPlay style="display:none; max-width:90%; max-height:90%;"></video>
      `;
      document.body.appendChild(overlay);
      created = true;
    }

    const imgElement = overlay.querySelector('.lightbox-image');
    const videoElement = overlay.querySelector('.lightbox-video');

    const openImage = (src) => {
      imgElement.src = src;
      imgElement.style.display = 'block';
      videoElement.style.display = 'none';
      videoElement.pause();
      overlay.classList.add('active');
      document.documentElement.style.overflow = 'hidden';
    };

    const openVideo = (src) => {
      videoElement.src = src;
      videoElement.style.display = 'block';
      imgElement.style.display = 'none';
      imgElement.src = '';
      overlay.classList.add('active');
      document.documentElement.style.overflow = 'hidden';
    };

    const close = () => {
      overlay.classList.remove('active');
      imgElement.src = '';
      videoElement.pause();
      videoElement.src = '';
      document.documentElement.style.overflow = '';
    };

    const isAllowedMedia = (el) =>
      containerSelectors.some((sel) => Boolean(el.closest(sel)));

    const onDocumentClick = (e) => {
      const target = e.target;

      if (overlay.contains(target) && !target.closest('.lightbox-image') && !target.closest('.lightbox-video')) {
        close();
        return;
      }

      const img = target.closest('img');
      const vid = target.closest('video');

      if (img && isAllowedMedia(img)) {
        e.preventDefault();
        const src = img.currentSrc || img.src || img.dataset?.src || '';
        if (src) openImage(src);
      }

      if (vid && isAllowedMedia(vid)) {
        e.preventDefault();
        const src = vid.currentSrc || vid.src || vid.dataset?.src || '';
        if (src) openVideo(src);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        close();
      }
    };

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
