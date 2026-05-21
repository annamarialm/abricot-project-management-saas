'use client';

import { useState } from 'react';

export default function ProjectForm({ project, onSubmit, submitLabel, title }) {
  const [form, setForm] = useState({
    name: project?.name || '',

    description: project?.description || '',
  });

  function handleChange(event) {
    setForm({
      ...form,

      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit(form);
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

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
