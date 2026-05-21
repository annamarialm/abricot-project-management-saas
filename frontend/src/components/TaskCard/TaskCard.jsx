import StatusBadge from '@/components/StatusBadge/StatusBadge';

import UserAvatar from '@/components/UserAvatar/UserAvatar';

export default function TaskCard({ task, onEdit }) {
  return (
    <article>
      <header>
        <div>
          <h3>{task.title}</h3>

          <StatusBadge status={task.status} />
        </div>

        <button onClick={() => onEdit(task)}>Modifier</button>
      </header>

      <p>{task.description}</p>

      <div>
        <p>
          Échéance :{' '}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString('fr-FR')
            : 'Aucune'}
        </p>

        <div>
          <p>Assigné à :</p>

          {task.assignees.length > 0 ? (
            <ul>
              {task.assignees.map((assignee) => (
                <li key={assignee.id}>
                  <UserAvatar user={assignee.user} />

                  <span>{assignee.user.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun assigné</p>
          )}
        </div>
      </div>

      <footer>
        <p>Commentaires ({task.comments.length})</p>
      </footer>
    </article>
  );
}
