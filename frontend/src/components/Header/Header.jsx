'use client';

import Link from 'next/link';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import './Header.css';

export default function Header() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const initials = user.name
    ?.split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

  return (
    <header>
      <nav>
        <div>
          <Link href="/dashboard">Abricot.co</Link>
        </div>

        <div>
          <Link href="/dashboard">Tableau de bord</Link>

          <Link href="/projects">Projets</Link>
        </div>

        <div>
          <Link href="/profile" aria-label="Mon profil">
            {initials}
          </Link>
        </div>
      </nav>
    </header>
  );
}
