import './StatusBadge.css';

export default function StatusBadge({ status }) {
  const statusLabels = {
    TODO: 'À faire',
    IN_PROGRESS: 'En cours',
    DONE: 'Terminée',
  };

  return <span>{statusLabels[status] || status}</span>;
}
