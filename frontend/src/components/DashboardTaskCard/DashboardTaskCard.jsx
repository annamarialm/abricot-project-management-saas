import Image from 'next/image';

import StatusBadge from '@/components/StatusBadge/StatusBadge';

import Button from '@/components/Button/Button';

import './DashboardTaskCard.css';

export default function DashboardTaskCard({ task, variant = 'default' }) {
  function formatDate(date) {
    if (!date) {
      return 'Aucune date';
    }

    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  }

  if (variant === 'kanban') {
    return (
      <article className="dashboard-task-card dashboard-task-card--kanban">
        <div className="dashboard-task-card__content">
          <div className="dashboard-task-card__header">
            <h3 className="dashboard-task-card__title">{task.title}</h3>

            <StatusBadge status={task.status} />
          </div>

          <p className="dashboard-task-card__description">{task.description}</p>

          <div className="dashboard-task-card__meta">
            <div className="dashboard-task-card__meta-item">
              <Image
                src="/icons/folder.svg"
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
              />

              <span>{task.project?.name}</span>
            </div>

            <div className="dashboard-task-card__meta-item">
              <Image
                src="/icons/calendar.svg"
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
              />

              <span>{formatDate(task.dueDate)}</span>
            </div>

            <div className="dashboard-task-card__meta-item">
              <Image
                src="/icons/comments.svg"
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
              />

              <span>{task.comments.length}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-task-card__actions">
          <Button size="small">Voir</Button>
        </div>
      </article>
    );
  }

  return (
    <article className="dashboard-task-card">
      <div className="dashboard-task-card__content">
        <div className="dashboard-task-card__header">
          <h3 className="dashboard-task-card__title">{task.title}</h3>
        </div>

        <p className="dashboard-task-card__description">{task.description}</p>

        <div className="dashboard-task-card__meta">
          <div className="dashboard-task-card__meta-item">
            <Image
              src="/icons/folder.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />

            <span>{task.project?.name}</span>
          </div>

          <div className="dashboard-task-card__meta-item">
            <Image
              src="/icons/calendar.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />

            <span>{formatDate(task.dueDate)}</span>
          </div>

          <div className="dashboard-task-card__meta-item">
            <Image
              src="/icons/comments.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />

            <span>{task.comments.length}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-task-card__actions">
        <StatusBadge status={task.status} />

        <Button size="small">Voir</Button>
      </div>
    </article>
  );
}
