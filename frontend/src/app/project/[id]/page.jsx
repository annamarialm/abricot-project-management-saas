'use client';

import { use, useCallback, useEffect, useState } from 'react';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';

import TaskCard from '@/components/TaskCard/TaskCard';

import Button from '@/components/Button/Button';

import Modal from '@/components/Modal/Modal';

import EditTaskForm from '@/components/EditTaskForm/EditTaskForm';

import CreateTaskForm from '@/components/CreateTaskForm/CreateTaskForm';

import AITaskForm from '@/components/AITaskForm/AITaskForm';

import ContributorsBar from '@/components/ContributorsBar/ContributorsBar';

import TasksHeader from '@/components/TasksHeader/TasksHeader';
import { useAuth } from '@/components/AuthProvider/AuthProvider';

import EditProjectForm from '@/components/EditProjectForm/EditProjectForm';

export default function ProjectPage({ params }) {
  const resolvedParams = use(params);

  const [tasks, setTasks] = useState([]);

  const [contributors, setContributors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const [owner, setOwner] = useState(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [project, setProject] = useState(null);

  const { user } = useAuth();

  const isOwner = owner?.id === user?.id;

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

  const fetchContributors = useCallback(async () => {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/projects/${resolvedParams.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        return;
      }

      setContributors(data.data.project.members || []);
      setOwner(data.data.project.owner);
      setProject(data.data.project);
    } catch (error) {
      console.error(error);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    async function loadProjectData() {
      await fetchTasks();

      await fetchContributors();
    }

    loadProjectData();
  }, [fetchTasks, fetchContributors]);

  function handleEditTask(task) {
    setSelectedTask(task);

    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setSelectedTask(null);

    setIsEditModalOpen(false);
  }

  return (
    <DashboardLayout>
      <main>
        <section>
          <h1>Projet</h1>

          {isOwner && (
            <button type="button" onClick={() => setIsProjectModalOpen(true)}>
              Modifier
            </button>
          )}

          <Button onClick={() => setIsCreateModalOpen(true)}>
            + Créer une tâche
          </Button>

          <button onClick={() => setIsAIModalOpen(true)}>IA</button>

          {owner && (
            <ContributorsBar contributors={contributors} owner={owner} />
          )}

          {loading && <p>Chargement...</p>}

          {error && <p>{error}</p>}

          {!loading && !tasks.length && <p>Aucune tâche trouvée.</p>}

          <TasksHeader />

          <div>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </div>

          <Modal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          >
            <CreateTaskForm
              projectId={resolvedParams.id}
              contributors={contributors}
              onTaskCreated={fetchTasks}
              onClose={() => setIsCreateModalOpen(false)}
            />
          </Modal>

          <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
            {selectedTask && (
              <EditTaskForm
                task={selectedTask}
                contributors={contributors}
                onTaskUpdated={fetchTasks}
                onClose={closeEditModal}
              />
            )}
          </Modal>

          <Modal
            isOpen={isProjectModalOpen}
            onClose={() => setIsProjectModalOpen(false)}
          >
            {project && (
              <EditProjectForm
                project={project}
                onClose={() => setIsProjectModalOpen(false)}
                onProjectUpdated={fetchContributors}
              />
            )}
          </Modal>

          <Modal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)}>
            <AITaskForm onClose={() => setIsAIModalOpen(false)} />
          </Modal>
        </section>
      </main>
    </DashboardLayout>
  );
}
