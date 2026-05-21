'use client';

import { useState } from 'react';

import Dropdown from '@/components/Dropdown/Dropdown';

export default function TaskForm({
  task = {},
  contributors = [],
  onSubmit,
  submitLabel,
  title,
}) {
  const [form, setForm] = useState({
    title: task.title || '',

    description: task.description || '',

    dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',

    status: task.status || 'TODO',

    assigneeIds: task.assignees?.map((assignee) => assignee.user.id) || [],
  });

  function handleChange(event) {
    setForm({
      ...form,

      [event.target.name]: event.target.value,
    });
  }

  function handleStatusChange(status) {
    setForm({
      ...form,

      status,
    });
  }

  function toggleAssignee(userId) {
    setForm((prev) => ({
      ...prev,

      assigneeIds: prev.assigneeIds.includes(userId)
        ? prev.assigneeIds.filter((id) => id !== userId)
        : [...prev.assigneeIds, userId],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>

      <div>
        <label htmlFor="title">Titre</label>

        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
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
        <label htmlFor="dueDate">Échéance</label>

        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <Dropdown
        label="Assigné à"
        items={contributors}
        selectedIds={form.assigneeIds}
        onToggle={toggleAssignee}
      />

      <div>
        <label>Statut</label>

        <div>
          <button
            type="button"
            aria-pressed={form.status === 'TODO'}
            onClick={() => handleStatusChange('TODO')}
          >
            À faire
          </button>

          <button
            type="button"
            aria-pressed={form.status === 'IN_PROGRESS'}
            onClick={() => handleStatusChange('IN_PROGRESS')}
          >
            En cours
          </button>

          <button
            type="button"
            aria-pressed={form.status === 'DONE'}
            onClick={() => handleStatusChange('DONE')}
          >
            Terminée
          </button>
        </div>
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
