'use client';

import Link from 'next/link';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import UserAvatar from '@/components/UserAvatar/UserAvatar';

import './Header.css';

export default function Header() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

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
            <UserAvatar user={user} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
