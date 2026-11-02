'use client';

import { useMe } from '@/hooks/useMe';

export default function AuthProvider({ children }) {
  useMe();

  return children;
}
