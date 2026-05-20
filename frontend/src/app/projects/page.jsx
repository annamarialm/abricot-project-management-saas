'use client';

import { useEffect, useState } from 'react';
import API_URL from '@/api/api';
import { getToken } from '@/api/auth';
import DashboardLayout from '@/layout/DashboardLayout/DashboardLayout';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

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

        setProjects(data.data.projects);
      } catch (error) {
        console.error(error);

        setError('Erreur serveur');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      <main>
        <section>
          <h1>Mes projets</h1>

          <p>Gérez vos projets</p>

          <Button onClick={() => setIsModalOpen(true)}>
            + Créer un projet
          </Button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>Créer un projet</h2>
          </Modal>

          {loading && <p>Chargement...</p>}

          {error && <p>{error}</p>}

          {!loading && !projects.length && <p>Aucun projet trouvé.</p>}

          <div>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}
