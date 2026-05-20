export default function TaskCard({ task }) {
  return (
    <article>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Statut : {task.status}</p>

      <p>Priorité : {task.priority}</p>

      <p>Assignés : {task.assignees.length}</p>

      <p>Commentaires : {task.comments.length}</p>
    </article>
  );
}
