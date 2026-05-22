import StatusBadge from '@/components/StatusBadge/StatusBadge';

export default function DashboardTaskCard({ task }) {
  function formatDate(date) {
    if (!date) {
      return 'Aucune date';
    }

    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    });
  }

  return (
    <article>
      <div>
        <div>
          <div>
            <h3>{task.title}</h3>

            <StatusBadge status={task.status} />
          </div>

          <button type="button">Voir</button>
        </div>

        <p>{task.description}</p>
      </div>

      <div>
        <span>{task.project?.name}</span>

        <span>{formatDate(task.dueDate)}</span>

        <span>💬 {task.comments.length}</span>
      </div>
    </article>
  );
}
