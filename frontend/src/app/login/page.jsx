'use client';

import { useState } from 'react';

import Image from 'next/image';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import AuthLayout from '@/layout/AuthLayout/AuthLayout';

import API_URL from '@/api/api';

import { setToken } from '@/api/auth';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import Button from '@/components/Button/Button';

import InputField from '@/components/InputField/InputField';

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

      setToken(data.data.token);

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

      login(profileData.data.user);

      router.push('/dashboard');
    } catch (error) {
      console.error(error);

      setErrorMessage('Erreur serveur');
    }
  }

  return (
    <AuthLayout variant="login">
      <div className="login-page">
        <div className="login-page__logo">
          <Image
            src="/logos/abricot-logo.svg"
            alt="Abricot"
            width={147}
            height={19}
            priority
          />
        </div>

        <div className="login-page__content">
          <div className="login-page__intro">
            <h1 className="login-page__title">Connexion</h1>
          </div>

          <form className="login-page__form" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />

            <InputField
              label="Mot de passe"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />

            <Button type="submit">Se connecter</Button>

            <a href="#" className="login-page__forgot">
              Mot de passe oublié?
            </a>

            {errorMessage && (
              <p role="alert" className="login-page__error">
                {errorMessage}
              </p>
            )}
          </form>
        </div>

        <p className="login-page__register">
          Pas encore de compte ? <Link href="/register">Créer un compte</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
