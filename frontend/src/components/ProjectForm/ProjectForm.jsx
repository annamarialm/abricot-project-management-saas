'use client';

import './ProjectForm.css';

import { useState } from 'react';

import UserSearch from '@/components/UserSearch/UserSearch';

import Button from '@/components/Button/Button';

import '@/styles/forms.css';

export default function ProjectForm({
  project,
  onSubmit,
  onDelete,
  submitLabel,
  title,
}) {
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
    <form className="project-form" onSubmit={handleSubmit}>
      <h2 className="project-form__title">{title}</h2>

      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Titre*
        </label>

        <input
          className="form-input"
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description*
        </label>

        <textarea
          className="form-textarea"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Contributeurs</label>

        <UserSearch
          selectedUsers={form.contributors}
          onAddUser={handleAddUser}
        />

        {form.contributors.length > 0 && (
          <ul className="project-form__contributors-list">
            {form.contributors.map((user) => (
              <li key={user.id} className="project-form__contributors-item">
                <span>{user.name}</span>

                <button
                  type="button"
                  className="project-form__remove-user-button"
                  onClick={() => handleRemoveUser(user.id)}
                  aria-label={`Retirer ${user.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="project-form__actions">
        <Button
          className="project-form-submit"
          type="submit"
          disabled={!isFormValid}
        >
          {submitLabel}
        </Button>

        {onDelete && (
          <Button type="button" variant="danger" onClick={onDelete}>
            Supprimer le projet
          </Button>
        )}
      </div>
    </form>
  );
}
