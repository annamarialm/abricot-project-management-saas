'use client';

import { useState } from 'react';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import Button from '@/components/Button/Button';

export default function CreateTaskForm({ projectId, onTaskCreated, onClose }) {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [priority, setPriority] = useState('MEDIUM');

  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setError('');

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/projects/${projectId}/tasks`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          title,
          description,
          priority,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Erreur lors de la création');

        return;
      }

      onTaskCreated();

      onClose();
    } catch (error) {
      console.error(error);

      setError('Erreur serveur');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer une tâche</h2>

      <div>
        <label htmlFor="title">Titre</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="priority">Priorité</label>

        <select
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="LOW">LOW</option>

          <option value="MEDIUM">MEDIUM</option>

          <option value="HIGH">HIGH</option>
        </select>
      </div>

      {error && <p>{error}</p>}

      <Button type="submit">Créer la tâche</Button>
    </form>
  );
}
