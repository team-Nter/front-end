'use client';

import { login } from '@/api/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { queryKeys } from '@/constants/query-keys';
import { useMe } from '@/hooks/useMe';
import logo from '@/assets/images/logo.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { validateLogin } from '@/utils/validators/validateLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isPending } = useMe();

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (loginResponse) => {
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

  if (isPending || user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    loginMutation.mutate({ email, password });
  };

  return (
    <main>
      <Link href="/">
        <Image src={logo} alt="" width={289} height={72} loading="eager" />
      </Link>
      <form onSubmit={handleSubmit} noValidate>
        <Input
          type="email"
          id="email"
          label="email"
          error={errors.email}
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          label="password"
          error={errors.password}
          placeholder="이메일을 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loginMutation.isPending}>
          로그인
        </Button>
      </form>
    </main>
  );
}
