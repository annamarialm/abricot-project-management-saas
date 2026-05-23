'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuth } from '@/components/AuthProvider/AuthProvider';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return null;
  }

  return children;
}
