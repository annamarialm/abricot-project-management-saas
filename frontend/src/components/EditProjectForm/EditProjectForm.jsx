'use client';

import { useRouter } from 'next/navigation';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import ProjectForm from '@/components/ProjectForm/ProjectForm';

import Button from '@/components/Button/Button';

export default function EditProjectForm({
  project,
  onClose,
  onProjectUpdated,
}) {
  const router = useRouter();

  async function handleUpdate(form) {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PUT',

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

      onProjectUpdated();

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm('Supprimer ce projet ?');

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        return;
      }

      router.push('/projects');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ProjectForm
        project={project}
        onSubmit={handleUpdate}
        submitLabel="Enregistrer"
        title="Modifier le projet"
      />
      <Button type="button" variant="danger" onClick={handleDelete}>
        Supprimer le projet
      </Button>{' '}
    </div>
  );
}
