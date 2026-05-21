import UserAvatar from '@/components/UserAvatar/UserAvatar';

export default function ContributorsBar({ contributors, owner }) {
  return (
    <section>
      <div>
        <h2>Contributeurs {contributors.length} personnes</h2>
      </div>

      <div>
        {contributors.map((member) => {
          const isOwner = member.user.id === owner.id;

          return (
            <div key={member.user.id}>
              <UserAvatar user={member.user} />

              <span>{isOwner ? 'Propriétaire' : member.user.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
