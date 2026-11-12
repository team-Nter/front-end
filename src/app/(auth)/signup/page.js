'use client';

import { Suspense } from 'react';
import { Signup } from '@/components/auth/Signup';

export default function SignupPage() {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}
