'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import API_URL from '@/api/api';

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
      <main>
        <section>
          <h1>Mon compte</h1>

          <h2>{profile?.name || ''}</h2>

          <div>
            <label htmlFor="lastName">Nom</label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label htmlFor="firstName">Prénom</label>

            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {!isEditing ? (
            <div>
              <label htmlFor="password">Mot de passe</label>

              <input id="password" type="password" value="password" disabled />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="currentPassword">Mot de passe actuel</label>

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={form.currentPassword || ''}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="newPassword">Nouveau mot de passe</label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={form.newPassword || ''}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {!isEditing ? (
            <Button onClick={handleEdit}>Modifier les informations</Button>
          ) : (
            <>
              <Button onClick={handleSave}>
                Enregistrer les modifications
              </Button>

              <Button onClick={handleCancel}>Annuler</Button>
            </>
          )}

          <Button onClick={handleLogout}>Se déconnecter</Button>
        </section>
      </main>
    </DashboardLayout>
  );
}
