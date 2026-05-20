import './globals.css';

import { AuthProvider } from '@/components/AuthProvider/AuthProvider';

export const metadata = {
  title: 'Abricot.co',
  description: 'Collaborative project management SaaS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
