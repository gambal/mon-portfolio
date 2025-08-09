import "./globals.css";
import Navbar from './components/navbar';
import Cursor from '../utils/cursor'; // créer ce fichier ou mettre Cursor ici même

export const metadata = {
  title: "Alexandre Gambarini",
  description: "Wanna work together ? :)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
