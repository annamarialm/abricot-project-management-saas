'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import Button from '@/components/Button/Button';

import Modal from '@/components/Modal/Modal';

import ProjectForm from '@/components/ProjectForm/ProjectForm';

import DashboardTaskCard from '@/components/DashboardTaskCard/DashboardTaskCard';

import './Dashboard.css';

export default function DashboardPage() {
  const router = useRouter();

  const { user, loading } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [view, setView] = useState('list');

  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = getToken();

        const response = await fetch(`${API_URL}/dashboard/assigned-tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Erreur lors du chargement des tâches');

          return;
        }

        const sortedTasks = data.data.tasks.sort(
          (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
        );

        setTasks(sortedTasks);
      } catch (error) {
        console.error(error);

        setError('Erreur serveur');
      }
    }

    if (user) {
      fetchTasks();
    }
  }, [user]);

  async function handleCreateProject(form) {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        return;
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  const currentDate = new Date('2024-01-01');

  const currentMonthTasks = tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    const taskDate = new Date(task.dueDate);

    return (
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const todoTasks = currentMonthTasks.filter((task) => task.status === 'TODO');

  const inProgressTasks = currentMonthTasks.filter(
    (task) => task.status === 'IN_PROGRESS',
  );

  const doneTasks = currentMonthTasks.filter((task) => task.status === 'DONE');

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      <main className="dashboard-page">
        <section className="dashboard-page__hero">
          <div className="dashboard-page__intro">
            <h1 className="dashboard-page__title">Tableau de bord</h1>

            <p className="dashboard-page__subtitle">
              Bonjour {user.name || user.email}, voici un aperçu de vos projets
              et tâches
            </p>
          </div>

          <Button onClick={() => setIsModalOpen(true)}>
            + Créer un projet
          </Button>
        </section>

        <section className="dashboard-page__content">
          <div className="dashboard-page__view-switcher">
            <button
              type="button"
              onClick={() => setView('list')}
              className={`dashboard-page__view-button ${
                view === 'list' ? 'dashboard-page__view-button--active' : ''
              }`}
            >
              <img src="/icons/liste.svg" alt="" aria-hidden="true" />

              <span>Liste</span>
            </button>

            <button
              type="button"
              onClick={() => setView('kanban')}
              className={`dashboard-page__view-button ${
                view === 'kanban' ? 'dashboard-page__view-button--active' : ''
              }`}
            >
              <img src="/icons/kanban.svg" alt="" aria-hidden="true" />

              <span>Kanban</span>
            </button>
          </div>
          {error && <p>{error}</p>}

          {view === 'list' && (
            <section className="surface-section">
              <div className="section-header">
                <div className="section-intro">
                  <h2 className="section-title">Mes tâches assignées</h2>

                  <p className="section-subtitle">Par ordre de priorité</p>
                </div>
                <div className="dashboard-page__search">
                  <input type="search" placeholder="Rechercher une tâche" />

                  <img src="/icons/search.svg" alt="" aria-hidden="true" />
                </div>{' '}
              </div>

              {!tasks.length ? (
                <p>Aucune tâche assignée.</p>
              ) : (
                <div className="dashboard-page__task-list">
                  {tasks.map((task) => (
                    <DashboardTaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </section>
          )}

          {view === 'kanban' && (
            <section className="dashboard-page__kanban">
              <div className="surface-section">
                <h2 className="section-title">À faire ({todoTasks.length})</h2>

                <div className="dashboard-page__task-list">
                  {todoTasks.map((task) => (
                    <DashboardTaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="surface-section">
                <h2 className="section-title">
                  En cours ({inProgressTasks.length})
                </h2>

                <div className="dashboard-page__task-list">
                  {inProgressTasks.map((task) => (
                    <DashboardTaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div className="surface-section">
                <h2 className="section-title">
                  Terminées ({doneTasks.length})
                </h2>

                <div className="dashboard-page__task-list">
                  {doneTasks.map((task) => (
                    <DashboardTaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProjectForm
            onSubmit={handleCreateProject}
            submitLabel="Ajouter un projet"
            title="Créer un projet"
          />
        </Modal>
      </main>
    </DashboardLayout>
  );
}
