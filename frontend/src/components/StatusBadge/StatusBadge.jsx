import './StatusBadge.css';

export default function StatusBadge({ status, isActive = false, onClick }) {
  const statusLabels = {
    TODO: 'À faire',
    IN_PROGRESS: 'En cours',
    DONE: 'Terminée',
  };

  const statusClasses = {
    TODO: 'status-badge--todo',
    IN_PROGRESS: 'status-badge--in-progress',
    DONE: 'status-badge--done',
  };

  const className = `
    status-badge
    ${statusClasses[status] || ''}
    ${isActive ? 'status-badge--active' : ''}
    ${onClick ? 'status-badge--clickable' : ''}
  `;

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick}>
        {statusLabels[status] || status}
      </button>
    );
  }

  return <span className={className}>{statusLabels[status] || status}</span>;
}
