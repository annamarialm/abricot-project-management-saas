'use client';

import Image from 'next/image';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import UserAvatar from '@/components/UserAvatar/UserAvatar';

import './Header.css';

export default function Header() {
  const { user } = useAuth();

  const pathname = usePathname();

  const isDashboardPage = pathname === '/dashboard';

  const isProjectsPage = pathname.startsWith('/projects');

  if (!user) {
    return null;
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__logo">
          <Link href="/dashboard" aria-label="Accueil">
            <Image
              src="/logos/abricot-logo.svg"
              alt=""
              width={147}
              height={19}
              priority
            />
          </Link>
        </div>

        <div className="header__links">
          <Link
            href="/dashboard"
            className={`header__link ${
              isDashboardPage ? 'header__link--active' : ''
            }`}
            aria-current={isDashboardPage ? 'page' : undefined}
          >
            <Image
              src={
                isDashboardPage
                  ? '/icons/navigation/dashboard-active.svg'
                  : '/icons/navigation/dashboard-inactive.svg'
              }
              alt=""
              width={24}
              height={24}
            />

            <span>Tableau de bord</span>
          </Link>

          <Link
            href="/projects"
            className={`header__link ${
              isProjectsPage ? 'header__link--active' : ''
            }`}
            aria-current={isProjectsPage ? 'page' : undefined}
          >
            <Image
              src={
                isProjectsPage
                  ? '/icons/navigation/projects-active.svg'
                  : '/icons/navigation/projects-inactive.svg'
              }
              alt=""
              width={29}
              height={22}
            />

            <span>Projets</span>
          </Link>
        </div>

        <div className="header__profile">
          <Link href="/profile" aria-label="Mon profil">
            <UserAvatar user={user} />
          </Link>
        </div>
      </nav>
    </header>
  );
}
