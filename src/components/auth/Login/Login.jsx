'use client';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { validateLogin } from '@/utils/validators/validateAuthForm';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';
import {
  AuthCheckErrorModal,
  ConnectionWarning,
  OfflineNotice,
} from '@/components/auth/commonAuth/AuthCheckNotices';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { GoogleLoginError } from '@/components/auth/GoogleLoginError';
import * as styles from './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const {
    user,
    isLoggedIn,
    isPending,
    isFetching,
    isError,
    refetch,
    isPaused,
  } = useRedirectIfLoggedIn();

  const hasLoggedOutCache = user === null;

  const loginMutation = useLogin({
    onError: (error) => {
      if (error.status === 401) {
        alert('이메일 혹은 비밀번호를 확인해주십시오.');
      } else {
        alert('잠시 후 다시 시도해주세요.');
      }
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const validationErrors = validateLogin({
      email: trimmedEmail,
      password,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    loginMutation.mutate({ email: trimmedEmail, password });
  };

  if (isPending && isPaused) return <OfflineNotice />;
  if (isPending) return null;

  if (isError && !hasLoggedOutCache) {
    return (
      <AuthCheckErrorModal isFetching={isFetching} onRetry={() => refetch()} />
    );
  }
  if (isLoggedIn) return null;

  return (
    <>
      {isError && <ConnectionWarning className={styles.connectionWarning} />}

      <main className={styles.loginPage}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src={logo}
            alt="독스루 홈"
            width={289}
            height={72}
            loading="eager"
            className={styles.logo}
          />
        </Link>

        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
          <Input
            className={styles.input}
            type="email"
            id="email"
            label="이메일"
            error={errors.email}
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            disabled={loginMutation.isPending}
          />

          <Input
            className={styles.input}
            type="password"
            id="password"
            label="비밀번호"
            error={errors.password}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            disabled={loginMutation.isPending}
          />

          <Button
            className={styles.submitButton}
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <GoogleLoginError className={styles.googleLoginError} />

        <GoogleLoginButton className={styles.googleLoginButton} />

        <div className={styles.signupGuide}>
          <p className={styles.signupText}>회원이 아니신가요?</p>
          <Link href="/signup" className={styles.signupLink}>
            회원가입하기
          </Link>
        </div>
      </main>
    </>
  );
}
