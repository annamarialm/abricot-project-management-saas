'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import { useAuth } from '@/components/AuthProvider/AuthProvider';

import './Dashboard.css';

export default function DashboardPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

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
          <p>Abricot.co</p>

          <h1>Dashboard</h1>

          <p>Bienvenue {user.name || user.email}</p>
        </section>

        <section>
          <h2>Vue liste</h2>

          <p>Les tâches apparaîtront ici.</p>
        </section>

        <section>
          <h2>Vue kanban</h2>

          <p>Le tableau kanban apparaîtra ici.</p>
        </section>

        <section>
          <h2>Mes projets</h2>

          <p>Les projets apparaîtront ici.</p>
        </section>
      </main>
    </DashboardLayout>
  );
}
