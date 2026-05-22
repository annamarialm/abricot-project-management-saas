'use client';

import { useState } from 'react';

import UserSearch from '@/components/UserSearch/UserSearch';

import Button from '@/components/Button/Button';

export default function ProjectForm({ project, onSubmit, submitLabel, title }) {
  const [form, setForm] = useState({
    name: project?.name || '',

    description: project?.description || '',

    contributors: [],
  });

  const isFormValid = form.name.trim() !== '';

  function handleChange(event) {
    setForm({
      ...form,

      [event.target.name]: event.target.value,
    });
  }

  function handleAddUser(user) {
    setForm((prev) => ({
      ...prev,

      contributors: [...prev.contributors, user],
    }));
  }

  function handleRemoveUser(userId) {
    setForm((prev) => ({
      ...prev,

      contributors: prev.contributors.filter((user) => user.id !== userId),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...form,

      contributors: form.contributors.map((user) => user.email),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <div>
        <label htmlFor="name">Nom du projet</label>

        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <h3>Contributeurs</h3>

        <UserSearch
          selectedUsers={form.contributors}
          onAddUser={handleAddUser}
        />

        {form.contributors.length > 0 && (
          <ul>
            {form.contributors.map((user) => (
              <li key={user.id}>
                <span>{user.name}</span>

                <button type="button" onClick={() => handleRemoveUser(user.id)}>
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button type="submit" disabled={!isFormValid}>
        {submitLabel}
      </Button>{' '}
    </form>
  );
}
