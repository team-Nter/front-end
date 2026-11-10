'use client';

import { useState } from 'react';
import { API_BASE_URL } from '@/constants';

export default function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handlePageShow = () => {
      setIsLoading(false);
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const handleGoogleLogin = () => {
    setIsLoading(true);

    const next = encodeURIComponent('/challenges');
    window.location.assign(`${API_BASE_URL}/auth/google?next=${next}`);
  };

  return (
    <button type="button" onClick={handleGoogleLogin} disabled={isLoading}>
      {isLoading ? '이동 중...' : '구글로 시작하기'}
    </button>
  );
}
