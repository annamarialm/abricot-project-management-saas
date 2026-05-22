import './UserAvatar.css';

export default function UserAvatar({ user, size = 'medium' }) {
  const initials = user.name
    ?.split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();

  return <span className={`user-avatar user-avatar--${size}`}>{initials}</span>;
}
