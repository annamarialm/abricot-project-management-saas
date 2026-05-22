import UserAvatar from '@/components/UserAvatar/UserAvatar';

export default function ContributorsBar({ contributors, owner }) {
  const allContributors = [
    {
      user: owner,
      role: 'ADMIN',
    },

    ...contributors.filter((member) => member.user.id !== owner.id),
  ];

  return (
    <section>
      <div>
        <h2>Contributeurs {allContributors.length} personnes</h2>
      </div>

      <div>
        {allContributors.map((member) => {
          const isOwner = member.user.id === owner.id;

          return (
            <div key={member.user.id}>
              <UserAvatar user={member.user} />
              <span>{member.user.name}</span>{' '}
            </div>
          );
        })}
      </div>
    </section>
  );
}
