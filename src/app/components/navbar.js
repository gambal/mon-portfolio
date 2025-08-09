// src/app/components/navbar.js
import Link from 'next/link';
import './navbar.css'; // Import du fichier CSS

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__mobile-name">
        <span><Link href="/home">alexandre</Link></span>
        <span><Link href="/home">gambarini</Link></span>
      </div>
      <div className="navbar__left"><Link href="/home">alexandre</Link></div>
      <div className="navbar__center">
        <Link href="/projects" className="navbar__link">projects</Link>
        <Link href="/mylife" className="navbar__link">my life</Link>
        <Link href="/contact" className="navbar__link">contact</Link>
      </div>
      <div className="navbar__right"><Link href="/home">gambarini</Link></div>
    </nav>
  );
}