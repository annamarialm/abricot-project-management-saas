'use client';

import { use, useCallback, useEffect, useState } from 'react';
import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';

import TaskCard from '@/components/TaskCard/TaskCard';

import Button from '@/components/Button/Button';

import Modal from '@/components/Modal/Modal';

import CreateTaskForm from '@/components/CreateTaskForm/CreateTaskForm';

export default function ProjectPage({ params }) {
  const resolvedParams = use(params);

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/projects/${resolvedParams.id}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erreur lors du chargement des tâches');

        return;
      }

      setTasks(data.data.tasks);
    } catch (error) {
      console.error(error);

      setError('Erreur serveur');
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    async function loadTasks() {
      await fetchTasks();
    }

    loadTasks();
  }, [fetchTasks]);

  return (
    <DashboardLayout>
      <main>
        <section>
          <h1>Projet</h1>

          <Button onClick={() => setIsModalOpen(true)}>
            + Créer une tâche
          </Button>

          {loading && <p>Chargement...</p>}

          {error && <p>{error}</p>}

          {!loading && !tasks.length && <p>Aucune tâche trouvée.</p>}

          <div>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <CreateTaskForm
              projectId={resolvedParams.id}
              onTaskCreated={fetchTasks}
              onClose={() => setIsModalOpen(false)}
            />
          </Modal>
        </section>
      </main>
    </DashboardLayout>
  );
}
