import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import './DashboardLayout.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <Header />

      <main className="dashboard-layout__main">{children}</main>

      <Footer />
    </div>
  );
}
