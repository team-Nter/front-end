'use client';

import { login } from '@/api/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { queryKeys } from '@/constants/query-keys';
import logo from '@/assets/images/logo.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { validateLogin } from '@/utils/validators/validateAuthForm';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { useState } from 'react';
import { Modal } from '../common/Modal';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const {
    user,
    isLoggedIn,
    isPending,
    isFetching,
    isError,
    refetch,
    isPaused,
  } = useRedirectIfLoggedIn();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.info() });
      queryClient.setQueryData(queryKeys.users.info(), loginResponse);
    },
    onError: (error) => {
      if (error.status === 401) {
        alert('이메일 혹은 비밀번호를 확인해주십시오.');
      } else {
        alert('잠시 후 다시 시도해주세요.');
      }
      console.error(error);
    },
  });

  if (isLoggedIn) return null;
  if (isPending && isPaused)
    return (
      <p>오프라인 상태예요. 네트워크 연결이 복구되면 다시 시도해 주세요.</p>
    );
  if (isPending) return null;

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

  if (isError && user === undefined) {
    return (
      <Modal aria-labelledby="retry-title">
        <p id="retry-title">사용자 확인이 늦어지고 있어요.</p>
        <button type="button" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? '확인 중...' : '다시 시도'}
        </button>
        <Link href="/">홈으로 이동</Link>
      </Modal>
    );
  }

  return (
    <>
      {isError && <p>연결이 불안정합니다. 잠시 후 다시 시도해 주세요.</p>}
      <main>
        <Link href="/">
          <Image
            src={logo}
            alt="독스루 로고"
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
    </>
  );
}
