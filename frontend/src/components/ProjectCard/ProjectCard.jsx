import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <Link href={`/project/${project.id}`}>
      <article>
        <h3>{project.name}</h3>

        <p>{project.description}</p>

        <p>Propriétaire : {project.owner.name}</p>

        <p>Membres : {project.members.length}</p>
      </article>
    </Link>
  );
}
