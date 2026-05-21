export default function UserAvatar({ user }) {
  const initials = user.name
    ?.split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

  return <span>{initials}</span>;
}
