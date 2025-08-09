'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const posAnimated = useRef({ x: 0, y: 0 });

  const easeFactor = 0.4; // Essaie 0.05 pour très lent, 0.3 pour rapide

  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;

    const animate = () => {
      posAnimated.current.x += (pos.current.x - posAnimated.current.x) * easeFactor;
      posAnimated.current.y += (pos.current.y - posAnimated.current.y) * easeFactor;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posAnimated.current.x}px, ${posAnimated.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
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
        borderColor: 'white',
        border: '1px solid white',
        
        backgroundColor: 'rgba(0, 0, 0, 1)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate3d(0,0,0) translate(-50%, -50%)',
        transition: 'background-color 0.3s ease',
        backdropFilter: 'blur(6px)',
      }}
    />
  );
}
