'use client';

import { useState } from 'react';
import Link from 'next/link';
import API_URL from '@/api/api';
import './Register.css';
import AuthLayout from '@/layout/AuthLayout/AuthLayout';
export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
        return;
      }

      console.log(data);
    } catch (error) {
      setErrorMessage('Erreur serveur');
    }
  }

  return (
    <AuthLayout>
      <main>
        <section>
          <p>Abricot.co</p>

          <h1>Inscription</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Mot de passe</label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {errorMessage && <p role="alert">{errorMessage}</p>}

            <button type="submit">S&apos;inscrire</button>
          </form>

          <p>
            Déjà inscrit ? <Link href="/login">Se connecter</Link>
          </p>
        </section>
      </main>
    </AuthLayout>
  );
}
