'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import API_URL from '@/api/api';
import './Profile.css';

import '@/styles/forms.css';
import { getToken, removeToken } from '@/api/auth';

import { useAuth } from '@/components/AuthProvider/AuthProvider';
import Button from '@/components/Button/Button';
export default function ProfilePage() {
  const router = useRouter();

  const { user, loading, logout } = useAuth();

  const [profile, setProfile] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  // Fetch profile
  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = getToken();

        if (!token) {
          return;
        }

        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error(data);
          return;
        }

        const fullName = data?.data?.user?.name || '';

        const [firstName = '', lastName = ''] = fullName.split(' ');

        setProfile(data.data.user);

        setForm({
          firstName,
          lastName,
          email: data?.data?.user?.email || '',
          currentPassword: '',
          newPassword: '',
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);

    if (!profile) {
      return;
    }

    const fullName = profile.name || '';

    const [firstName = '', lastName = ''] = fullName.split(' ');

    setForm({
      firstName,
      lastName,
      email: profile.email || '',
      currentPassword: '',
      newPassword: '',
    });
  }

  async function handleSave() {
    try {
      const token = getToken();

      // Update profile
      const profileResponse = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
        }),
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        console.error(profileData);
        return;
      }

      // Update password only if filled
      if (form.currentPassword && form.newPassword) {
        const passwordResponse = await fetch(`${API_URL}/auth/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        });

        const passwordData = await passwordResponse.json();

        if (!passwordResponse.ok) {
          console.error(passwordData);
          return;
        }
      }

      setProfile(profileData.data.user);

      setIsEditing(false);

      setForm({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        currentPassword: '',
        newPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    removeToken();

    logout();

    router.push('/login');
  }

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <main className="profile-page">
        <section className="surface-section profile-page__section">
          <div className="profile-page__intro">
            <h1 className="profile-page__title">Mon compte</h1>

            <p className="profile-page__subtitle">{profile?.name || ''}</p>
          </div>

          <div className="profile-page__form">
            <div className="profile-page__fields">
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">
                  Nom
                </label>

                <input
                  className="form-input"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="firstName">
                  Prénom
                </label>

                <input
                  className="form-input"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>

                <input
                  className="form-input"
                  id="email"
                  name="email"
                  type="email"
                  value={form.email || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {!isEditing ? (
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Mot de passe
                  </label>

                  <input
                    className="form-input"
                    id="password"
                    type="password"
                    value="password"
                    disabled
                  />
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label" htmlFor="currentPassword">
                      Mot de passe actuel
                    </label>

                    <input
                      className="form-input"
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={form.currentPassword || ''}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="newPassword">
                      Nouveau mot de passe
                    </label>

                    <input
                      className="form-input"
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={form.newPassword || ''}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
            </div>

            {!isEditing ? (
              <div className="profile-page__actions">
                <Button onClick={handleEdit}>Modifier les informations</Button>
              </div>
            ) : (
              <div className="profile-page__actions">
                <Button onClick={handleSave}>
                  Enregistrer les modifications
                </Button>

                <Button variant="secondary" onClick={handleCancel}>
                  Annuler
                </Button>
              </div>
            )}

            <div className="profile-page__logout">
              <Button variant="outline" onClick={handleLogout}>
                Se déconnecter
              </Button>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
