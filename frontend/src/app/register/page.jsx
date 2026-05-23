'use client';

import { useState } from 'react';

import Image from 'next/image';

import Link from 'next/link';

import API_URL from '@/api/api';

import AuthLayout from '@/layout/AuthLayout/AuthLayout';

import Button from '@/components/Button/Button';

import './Register.css';

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

        body: JSON.stringify({
          email,
          password,
        }),
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
    <AuthLayout variant="register">
      <div className="register-page">
        <div className="register-page__logo">
          <Image
            src="/logos/abricot-logo.svg"
            alt="Abricot"
            width={147}
            height={19}
            priority
          />
        </div>

        <div className="register-page__content">
          <div className="register-page__intro">
            <h1 className="register-page__title">Inscription</h1>
          </div>

          <form className="register-page__form" onSubmit={handleSubmit}>
            <div className="register-page__field">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="register-page__field">
              <label htmlFor="password">Mot de passe</label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <p role="alert" className="register-page__error">
                {errorMessage}
              </p>
            )}

            <Button type="submit">S&apos;inscrire</Button>
          </form>
        </div>

        <p className="register-page__login">
          Déjà inscrit ? <Link href="/login">Se connecter</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
