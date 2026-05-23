'use client';

import { use, useCallback, useEffect, useState } from 'react';

import Link from 'next/link';

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

import EditProjectForm from '@/components/EditProjectForm/EditProjectForm';

import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

import './Project.css';

export default function ProjectPage({ params }) {
  const resolvedParams = use(params);

  const [tasks, setTasks] = useState([]);

  const [project, setProject] = useState(null);

  const [contributors, setContributors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const [owner, setOwner] = useState(null);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const { user } = useAuth();

  const currentMember = contributors.find(
    (member) => member.user.id === user?.id,
  );

  const isOwner = owner?.id === user?.id;

  const role = currentMember?.role || null;

  const canEditProject = isOwner || role === 'ADMIN';

  const canCreateTask = isOwner || role === 'ADMIN' || role === 'CONTRIBUTOR';

  const canEditTask = isOwner || role === 'ADMIN' || role === 'CONTRIBUTOR';

  const canComment = isOwner || role === 'ADMIN' || role === 'CONTRIBUTOR';

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

      setProject(data.data.project);

      setOwner(data.data.project.owner);
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
    <ProtectedRoute>
      <DashboardLayout>
        <main className="project-page">
          <section className="project-page__hero">
            <div className="project-page__hero-content">
              <div className="project-page__hero-left">
                <Link
                  href="/projects"
                  className="project-page__back-button"
                  aria-label="Retour aux projets"
                >
                  ←
                </Link>

                <div className="project-page__intro">
                  <div className="project-page__title-row">
                    <h1 className="project-page__title">
                      {project?.name || 'Projet'}
                    </h1>

                    {canEditProject && (
                      <button
                        type="button"
                        className="project-page__edit-link"
                        onClick={() => setIsProjectModalOpen(true)}
                      >
                        Modifier
                      </button>
                    )}
                  </div>

                  <p className="project-page__subtitle">
                    {project?.description}
                  </p>
                </div>
              </div>

              {canCreateTask && (
                <div className="project-page__actions">
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    Créer une tâche
                  </Button>

                  <Button
                    type="button"
                    variant="accent"
                    size="small"
                    onClick={() => setIsAIModalOpen(true)}
                  >
                    ✦ IA
                  </Button>
                </div>
              )}
            </div>

            {owner && (
              <ContributorsBar contributors={contributors} owner={owner} />
            )}
          </section>

          {loading && <p>Chargement...</p>}

          {error && <p role="alert">{error}</p>}

          {!loading && !tasks.length && <p>Aucune tâche trouvée.</p>}

          <section className="surface-section">
            <div className="section-header">
              <div className="section-intro">
                <h2 className="section-title">Tâches</h2>

                <p className="section-subtitle">Par ordre de priorité</p>
              </div>

              <TasksHeader />
            </div>

            <div className="project-page__tasks">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  projectId={resolvedParams.id}
                  onEdit={handleEditTask}
                  canEditTask={canEditTask}
                  canComment={canComment}
                />
              ))}
            </div>
          </section>

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
                projectId={resolvedParams.id}
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
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
