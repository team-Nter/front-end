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
  OfflineNotice,
} from '@/components/auth/commonAuth/AuthCheckNotices';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { isLoggedIn, isPending, isFetching, isError, refetch, isPaused } =
    useRedirectIfLoggedIn();

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

  if (isError) {
    return (
      <AuthCheckErrorModal isFetching={isFetching} onRetry={() => refetch()} />
    );
  }
  if (isLoggedIn) return null;

  return (
    <main>
      <Link href="/">
        <Image
          src={logo}
          alt="독스루 홈"
          width={289}
          height={72}
          loading="eager"
        />
      </Link>
      <form onSubmit={handleSubmit} noValidate>
        <Input
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
        <Button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <div>
        <p>회원이 아니신가요?</p>
        <Link href="/signup">회원가입하기</Link>
      </div>
    </main>
  );
}
