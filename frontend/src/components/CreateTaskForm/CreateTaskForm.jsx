'use client';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import TaskForm from '@/components/TaskForm/TaskForm';

export default function CreateTaskForm({
  projectId,
  contributors,
  onClose,
  onTaskCreated,
}) {
  async function handleCreate(form) {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        return;
      }

      onTaskCreated();

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TaskForm
      contributors={contributors}
      onSubmit={handleCreate}
      submitLabel="+ Ajouter une tâche"
      title="Créer une tâche"
    />
  );
}
