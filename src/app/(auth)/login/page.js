'use client';

import { login } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useMe } from '@/hooks/useMe';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    loginMutation.mutate({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loginMutation.isPending}>
          로그인
        </button>
      </form>
    </div>
  );
}
