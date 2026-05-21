'use client';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import TaskForm from '@/components/TaskForm/TaskForm';

export default function EditTaskForm({
  task,
  contributors,
  onClose,
  onTaskUpdated,
}) {
  async function handleUpdate(form) {
    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
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

      onTaskUpdated();

      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TaskForm
      task={task}
      contributors={contributors}
      onSubmit={handleUpdate}
      submitLabel="Enregistrer"
      title="Modifier"
    />
  );
}
