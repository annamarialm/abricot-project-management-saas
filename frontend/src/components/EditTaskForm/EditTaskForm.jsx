'use client';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import TaskForm from '@/components/TaskForm/TaskForm';

export default function EditTaskForm({
  task,
  contributors,
  projectId,
  onClose,
  onTaskUpdated,
}) {
  async function handleUpdate(form) {
    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${task.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        return;
      }

      onTaskUpdated();

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm('Supprimer cette tâche ?');

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${task.id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        return;
      }

      onTaskUpdated();

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <TaskForm
        task={task}
        contributors={contributors}
        onSubmit={handleUpdate}
        submitLabel="Enregistrer"
        title="Modifier"
      />

      <button type="button" onClick={handleDelete}>
        Supprimer la tâche
      </button>
    </div>
  );
}
