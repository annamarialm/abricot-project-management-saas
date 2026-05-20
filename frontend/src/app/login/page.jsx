'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/layout/AuthLayout/AuthLayout';
import API_URL from '@/api/api';
import { setToken } from '@/api/auth';
import { useAuth } from '@/components/AuthProvider/AuthProvider';

import './Login.css';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Connexion échouée');
        return;
      }

      // Store JWT token
      setToken(data.data.token);

      // Fetch authenticated profile
      const profileResponse = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${data.data.token}`,
        },
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData.data) {
        setErrorMessage('Erreur lors de la récupération du profil');

        return;
      }

      // Save user in AuthProvider
      login(profileData.data.user);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erreur serveur');
    }
  }

  return (
    <AuthLayout>
      <main>
        <section>
          <p>Abricot.co</p>

          <h1>Connexion</h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
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
                autoComplete="current-password"
              />
            </div>

            <a href="#">Mot de passe oublié ?</a>

            {errorMessage && <p role="alert">{errorMessage}</p>}

            <button type="submit">Se connecter</button>
          </form>

          <p>
            Pas encore de compte ? <Link href="/register">Créer un compte</Link>
          </p>
        </section>
      </main>
    </AuthLayout>
  );
}
