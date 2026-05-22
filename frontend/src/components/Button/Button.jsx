import './Button.css';

export default function Button({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        button
        button--${variant}
        button--${size}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
