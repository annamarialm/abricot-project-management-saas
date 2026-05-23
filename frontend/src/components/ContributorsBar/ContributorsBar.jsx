import './ContributorsBar.css';

export default function ContributorsBar({ contributors, owner }) {
  const allContributors = [
    {
      user: owner,
      role: 'ADMIN',
    },

    ...contributors.filter((member) => member.user.id !== owner.id),
  ];

  function getInitials(name = '') {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <section className="contributors-bar">
      <div className="contributors-bar__intro">
        <h2 className="contributors-bar__title">Contributeurs</h2>

        <p className="contributors-bar__count">
          {allContributors.length} personnes
        </p>
      </div>

      <div className="contributors-bar__members">
        <div className="contributors-bar__owner">
          <div className="contributors-bar__owner-avatar">
            {getInitials(owner?.name)}
          </div>

          <div className="contributors-bar__owner-role">Propriétaire</div>
        </div>

        <div className="contributors-bar__contributors">
          {contributors
            .filter((member) => member.user.id !== owner.id)
            .map((member) => (
              <div key={member.user.id} className="contributors-bar__member">
                <div className="contributors-bar__member-avatar">
                  {getInitials(member.user?.name)}
                </div>

                <div className="contributors-bar__member-name">
                  {member.user.name}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
