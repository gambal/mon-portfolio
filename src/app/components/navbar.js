// src/app/components/navbar.js
import Link from 'next/link';
import './navbar.css'; // Import du fichier CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link href="/home">Alexandre</Link>
      </div>

      <div className="navbar__center">
        <Link href="/projects" className="navbar__link">Projects</Link>
        <Link href="/mylife" className="navbar__link">My Life</Link>
        <Link href="/contact" className="navbar__link">Contact</Link>
      </div>

      <div className="navbar__right">
        <Link href="/home">Gambarini</Link>
      </div>
    </nav>
  );
}
