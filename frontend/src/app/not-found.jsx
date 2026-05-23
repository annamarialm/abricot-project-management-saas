import Link from 'next/link';

import './not-found.css';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-page__content">
        <p className="not-found-page__code">404</p>

        <h1 className="not-found-page__title">Page introuvable</h1>

        <p className="not-found-page__text">
          La page que vous recherchez n’existe pas.
        </p>

        <Link href="/dashboard" className="not-found-page__link">
          Retour au dashboard
        </Link>
      </section>
    </main>
  );
}
