'use client';

import { useState } from 'react';

import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import StatusBadge from '@/components/StatusBadge/StatusBadge';

import '@/styles/forms.css';

import './TaskForm.css';

export default function TaskForm({
  task = {},
  contributors = [],
  onSubmit,
  onDelete,
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

  const isFormValid = form.title.trim() !== '';

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
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="task-form-title">{title}</h2>

      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Titre
        </label>

        <input
          className="form-input"
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description
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
        <label className="form-label" htmlFor="dueDate">
          Échéance
        </label>

        <input
          className="form-input"
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

      <div className="form-group">
        <label className="form-label">Statut</label>

        <div className="task-form-status-options">
          <StatusBadge
            status="TODO"
            isActive={form.status === 'TODO'}
            onClick={() => handleStatusChange('TODO')}
          />

          <StatusBadge
            status="IN_PROGRESS"
            isActive={form.status === 'IN_PROGRESS'}
            onClick={() => handleStatusChange('IN_PROGRESS')}
          />

          <StatusBadge
            status="DONE"
            isActive={form.status === 'DONE'}
            onClick={() => handleStatusChange('DONE')}
          />
        </div>
      </div>

      <div className="task-form-actions">
        <Button
          className="task-form-submit"
          type="submit"
          disabled={!isFormValid}
        >
          {submitLabel}
        </Button>

        {onDelete && (
          <Button type="button" variant="danger" onClick={onDelete}>
            Supprimer la tâche
          </Button>
        )}
      </div>
    </form>
  );
}
