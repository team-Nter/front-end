'use client';

import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import { useSearchParams } from 'next/navigation';
import * as styles from './GoogleLoginButton.css';
import googleIcon from '@/assets/icons/google_icon.svg';
import Image from 'next/image';

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

  const searchParams = useSearchParams();

  const handleGoogleLogin = () => {
    setIsLoading(true);

    const next = encodeURIComponent(searchParams.get('next') ?? '/challenges');
    window.location.assign(`${API_BASE_URL}/auth/google?next=${next}`);
  };

  return (
    <button
      className={styles.googleLoginButton}
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <Image src={googleIcon} alt="" width={19} height={19} />
      {isLoading ? '이동 중...' : 'Google로 시작하기'}
    </button>
  );
}
