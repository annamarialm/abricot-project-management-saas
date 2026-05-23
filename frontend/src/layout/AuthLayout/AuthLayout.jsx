import './AuthLayout.css';

export default function AuthLayout({ children, variant = 'login' }) {
  return (
    <main className="auth-layout">
      <section className="auth-layout__left">{children}</section>

      <section
        className={`auth-layout__right auth-layout__right--${variant}`}
      />
    </main>
  );
}
