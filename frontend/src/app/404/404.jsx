import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <section>
        <h1>404</h1>

        <h2>Page introuvable</h2>

        <p>La page que vous recherchez n’existe pas.</p>

        <Link href="/dashboard">Retour au dashboard</Link>
      </section>
    </main>
  );
}
