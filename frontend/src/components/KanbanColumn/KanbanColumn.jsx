import DashboardTaskCard from '@/components/DashboardTaskCard/DashboardTaskCard';

export default function KanbanColumn({ title, tasks }) {
  return (
    <div className="surface-section surface-section--kanban">
      <h2 className="section-title">
        {title} ({tasks.length})
      </h2>

      <div className="dashboard-page__task-list dashboard-page__task-list--kanban">
        {tasks.map((task) => (
          <DashboardTaskCard key={task.id} task={task} variant="kanban" />
        ))}
      </div>
    </div>
  );
}
