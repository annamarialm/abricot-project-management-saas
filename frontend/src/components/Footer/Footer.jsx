import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <Link href="/dashboard">Abricot.co</Link>
      </div>

      <div>
        <p>Abricot 2025</p>
      </div>
    </footer>
  );
}
