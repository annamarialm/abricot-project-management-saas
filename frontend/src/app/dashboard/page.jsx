'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import Button from '@/components/Button/Button';

import DashboardViewButton from '@/components/DashboardViewButton/DashboardViewButton';

import DashboardTaskCard from '@/components/DashboardTaskCard/DashboardTaskCard';

import Modal from '@/components/Modal/Modal';

import ProjectForm from '@/components/ProjectForm/ProjectForm';

import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';

import './Dashboard.css';

import KanbanColumn from '@/components/KanbanColumn/KanbanColumn';

export default function DashboardPage() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);

  const [view, setView] = useState('list');

  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="dashboard-page">
          <section className="dashboard-page__hero">
            <div className="dashboard-page__intro">
              <h1 className="dashboard-page__title">Tableau de bord</h1>

              <p className="dashboard-page__subtitle">
                Bonjour {user?.name || user?.email}, voici un aperçu de vos
                projets et tâches
              </p>
            </div>

            <Button onClick={() => setIsModalOpen(true)}>
              + Créer un projet
            </Button>
          </section>

          <section className="dashboard-page__content">
            <div className="dashboard-page__view-switcher">
              <DashboardViewButton
                label="Liste"
                iconSrc="/icons/liste.svg"
                isActive={view === 'list'}
                onClick={() => setView('list')}
              />

              <DashboardViewButton
                label="Kanban"
                iconSrc="/icons/kanban.svg"
                isActive={view === 'kanban'}
                onClick={() => setView('kanban')}
              />
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
                    <input
                      type="search"
                      placeholder="Rechercher une tâche"
                      aria-label="Rechercher une tâche"
                    />

                    <Image
                      src="/icons/search.svg"
                      alt=""
                      width={14}
                      height={14}
                      aria-hidden="true"
                    />
                  </div>
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
                <KanbanColumn title="À faire" tasks={todoTasks} />

                <KanbanColumn title="En cours" tasks={inProgressTasks} />

                <KanbanColumn title="Terminées" tasks={doneTasks} />
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
    </ProtectedRoute>
  );
}
