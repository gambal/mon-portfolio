'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const posAnimated = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const hoveringClickable = useRef(false); // savoir si on est sur un lien

  const easeFactor = 0.09;

  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const isClickable = (target) => {
      return (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.hasAttribute('onclick') ||
        target.closest('.project-slug-images img')
      );
    };

    const onMouseOver = (e) => {
      if (isClickable(e.target)) {
        hoveringClickable.current = true;
        cursorRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        cursorRef.current.style.borderColor = 'black';
        scaleRef.current = 1.5;
      }
    };

    const onMouseOut = (e) => {
      if (isClickable(e.target)) {
        hoveringClickable.current = false;
        cursorRef.current.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        cursorRef.current.style.borderColor = 'white';
        scaleRef.current = 1;
      }
    };

    const onMouseDown = () => {
      scaleRef.current = 0.5; // shrink on click
    };

    const onMouseUp = () => {
      // Retour à 1.5 si lien, sinon 1
      scaleRef.current = hoveringClickable.current ? 1.5 : 1;
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    let animationFrameId;
    const animate = () => {
        const dx = pos.current.x - posAnimated.current.x;
        const dy = pos.current.y - posAnimated.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const factor = dist < 4 ? 0.2 : 0.9; // proche → rapide, loin → fluide

        // posAnimated.current.x += dx * factor;
        // posAnimated.current.y += dy * factor;
        posAnimated.current.x = pos.current.x;
posAnimated.current.y = pos.current.y;

        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${posAnimated.current.x}px, ${posAnimated.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
        }

        animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: '1px solid white',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(0,0,0) translate(-50%, -50%) scale(1)',
        backdropFilter: 'blur(1px)',
        transition:
          'background-color 0.2s ease, border-color 0.2s ease, transform 0.25s ease',
      }}
    />
  );
}
