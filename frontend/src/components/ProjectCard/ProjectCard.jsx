import Link from 'next/link';

import Image from 'next/image';

import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const totalPeople = project.members.length + 1;

  const progress = project.progress || {
    completedTasks: 0,

    totalTasks: 0,

    percentage: 0,
  };

  function getInitials(name = '') {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <Link href={`/project/${project.id}`} className="project-card">
      <article className="project-card__content">
        <div className="project-card__intro">
          <h2 className="project-card__title">{project.name}</h2>

          <p className="project-card__description">{project.description}</p>
        </div>

        <div className="project-card__progress">
          <div className="project-card__progress-header">
            <p className="project-card__progress-label">Progression</p>

            <span className="project-card__progress-label">
              {progress.percentage}%
            </span>
          </div>

          <div className="project-card__progress-bar">
            <div
              role="progressbar"
              aria-valuenow={progress.percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Progression du projet"
              className="project-card__progress-fill"
              style={{
                width: `${progress.percentage}%`,
              }}
            />
          </div>

          <p className="project-card__progress-text">
            {progress.completedTasks}/{progress.totalTasks} tâches terminées
          </p>
        </div>

        <div className="project-card__team">
          <p className="project-card__team-label">
            <Image
              src="/icons/team.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />

            <span>Équipe ({totalPeople})</span>
          </p>

          <div className="project-card__team-members">
            <div className="project-card__owner">
              <div className="project-card__owner-avatar">
                {getInitials(project.owner?.name)}
              </div>

              <div className="project-card__owner-role">Propriétaire</div>
            </div>

            <div className="project-card__avatars">
              {project.members.map((member) => (
                <div
                  key={member.user.id}
                  className="project-card__member-avatar"
                >
                  {getInitials(member.user?.name)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
