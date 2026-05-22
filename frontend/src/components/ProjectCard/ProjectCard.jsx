import Link from 'next/link';

import UserAvatar from '@/components/UserAvatar/UserAvatar';

export default function ProjectCard({ project }) {
  const totalPeople = project.members.length + 1;

  const progress = project.progress || {
    completedTasks: 0,

    totalTasks: 0,

    percentage: 0,
  };

  return (
    <Link href={`/project/${project.id}`}>
      <article>
        <h3>{project.name}</h3>

        <p>{project.description}</p>

        <div>
          <div>
            <p>Progression</p>

            <span>{progress.percentage}%</span>
          </div>

          <div>
            <div
              style={{
                width: `${progress.percentage}%`,
              }}
            />
          </div>

          <p>
            {progress.completedTasks}/{progress.totalTasks} tâches terminées
          </p>
        </div>

        <div>
          <p>Équipe ({totalPeople})</p>

          <div>
            <div>
              <UserAvatar user={project.owner} />

              <span>Propriétaire</span>
            </div>

            <div>
              {project.members.map((member) => (
                <UserAvatar key={member.user.id} user={member.user} />
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
