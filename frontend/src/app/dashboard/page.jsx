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

  const currentDate = new Date();

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
      <main>
        <section>
          <h1>Tableau de bord</h1>

          <p>
            Bonjour {user.name || user.email}, voici un aperçu de vos projets et
            tâches
          </p>

          <Button onClick={() => setIsModalOpen(true)}>
            + Créer un projet
          </Button>
        </section>

        <section>
          <div>
            <button type="button" onClick={() => setView('list')}>
              Liste
            </button>

            <button type="button" onClick={() => setView('kanban')}>
              Kanban
            </button>
          </div>

          {error && <p>{error}</p>}

          {view === 'list' && (
            <>
              <div>
                <h2>Mes tâches assignées</h2>

                <p>Par ordre de priorité</p>
              </div>

              {!tasks.length ? (
                <p>Aucune tâche assignée.</p>
              ) : (
                <div>
                  {tasks.map((task) => (
                    <DashboardTaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </>
          )}

          {view === 'kanban' && (
            <div>
              <div>
                <h2>À faire ({todoTasks.length})</h2>

                {todoTasks.map((task) => (
                  <DashboardTaskCard key={task.id} task={task} />
                ))}
              </div>

              <div>
                <h2>En cours ({inProgressTasks.length})</h2>

                {inProgressTasks.map((task) => (
                  <DashboardTaskCard key={task.id} task={task} />
                ))}
              </div>

              <div>
                <h2>Terminées ({doneTasks.length})</h2>

                {doneTasks.map((task) => (
                  <DashboardTaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </section>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ProjectForm
            onSubmit={handleCreateProject}
            submitLabel="Créer"
            title="Créer un projet"
          />
        </Modal>
      </main>
    </DashboardLayout>
  );
}
