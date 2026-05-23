'use client';

import { useEffect, useState } from 'react';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';

import ProjectCard from '@/components/ProjectCard/ProjectCard';

import Button from '@/components/Button/Button';

import Modal from '@/components/Modal/Modal';

import ProjectForm from '@/components/ProjectForm/ProjectForm';

import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

import './Projects.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = getToken();

        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Erreur lors du chargement des projets');

          return;
        }

        const projectsWithProgress = await Promise.all(
          data.data.projects.map(async (project) => {
            try {
              const tasksResponse = await fetch(
                `${API_URL}/projects/${project.id}/tasks`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              const tasksData = await tasksResponse.json();

              const tasks = tasksData.data.tasks || [];

              const completedTasks = tasks.filter(
                (task) => task.status === 'DONE',
              ).length;

              const totalTasks = tasks.length;

              const percentage =
                totalTasks > 0
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0;

              return {
                ...project,

                progress: {
                  completedTasks,

                  totalTasks,

                  percentage,
                },
              };
            } catch (error) {
              console.error(error);

              return {
                ...project,

                progress: {
                  completedTasks: 0,

                  totalTasks: 0,

                  percentage: 0,
                },
              };
            }
          }),
        );

        setProjects(projectsWithProgress);
      } catch (error) {
        console.error(error);

        setError('Erreur serveur');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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

      setProjects((prev) => [data.data.project, ...prev]);

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <main className="projects-page">
          <section className="projects-page__hero">
            <div className="projects-page__intro">
              <h1 className="projects-page__title">Mes projets</h1>

              <p className="projects-page__subtitle">Gérez vos projets</p>
            </div>

            <Button onClick={() => setIsModalOpen(true)}>
              + Créer un projet
            </Button>
          </section>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ProjectForm
              onSubmit={handleCreateProject}
              submitLabel="Ajouter un projet"
              title="Créer un projet"
            />
          </Modal>

          {loading && <p>Chargement...</p>}

          {error && <p role="alert">{error}</p>}

          {!loading && !projects.length && (
            <p className="projects-page__empty">Aucun projet trouvé.</p>
          )}

          {!!projects.length && (
            <section className="projects-page__grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </section>
          )}
        </main>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
