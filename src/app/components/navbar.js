//---\mon-portfolio\src\app\components\navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
      <div className="text-xl font-bold">
        <Link href="/home">Alexandre</Link>
      </div>

      <div className="space-x-6 text-base">
        <Link href="/projects" className="hover:underline">Projects</Link>
        <Link href="/mylife" className="hover:underline">My Life</Link>
        <Link href="/contact" className="hover:underline">Contact</Link>
      </div>

      <div className="text-xl font-bold">
        <Link href="/home">Gambarini</Link>
      </div>
    </nav>
  );
}
