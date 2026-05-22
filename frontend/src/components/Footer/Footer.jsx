import Image from 'next/image';

import Link from 'next/link';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Link href="/dashboard" className="footer__logo" aria-label="Accueil">
          <Image src="/logos/footer-logo.svg" alt="" width={101} height={13} />
        </Link>

        <p className="footer__text">Abricot 2025</p>
      </div>
    </footer>
  );
}
