import Image from 'next/image';

import './DashboardViewButton.css';

export default function DashboardViewButton({
  label,
  iconSrc,
  isActive = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`dashboard-view-button ${
        isActive ? 'dashboard-view-button--active' : ''
      }`}
    >
      <Image
        src={iconSrc}
        alt=""
        width={14}
        height={14}
        aria-hidden="true"
      />

      <span>{label}</span>
    </button>
  );
}
