'use client';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import ProjectForm from '@/components/ProjectForm/ProjectForm';

export default function EditProjectForm({
  project,
  onClose,
  onProjectUpdated,
}) {
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

  return (
    <ProjectForm
      project={project}
      onSubmit={handleUpdate}
      submitLabel="Enregistrer"
      title="Modifier le projet"
    />
  );
}
