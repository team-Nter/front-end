'use client';

import { signup } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react';
import logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { validateSignup } from '@/utils/validators/validateAuthForm';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const { isLoggedIn, isFetching } = useRedirectIfLoggedIn();

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (signupResponse) => {
      queryClient.setQueryData(queryKeys.users.info(), signupResponse);
    },
    onError: (error) => {
      alert('임시 회원가입 에러 메시지'); // 메시지 수정
      console.error(error);
    },
  });

  if (isFetching || isLoggedIn) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유호성 검사 로직
    const trimmedEmail = email.trim();
    const trimmedNickname = nickname.trim();
    const validationErrors = validateSignup({
      email: trimmedEmail,
      nickname: trimmedNickname,
      password,
      passwordConfirmation,
    });
    signupMutation.mutate({ email, password, nickname });
  };
  // 태그 구조 만들기
  // aria-* 속성 추가
  return (
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          id="nickname"
          label="닉네임"
          error={errors.nickname}
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          label="비밀번호"
          error={errors.password}
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          id="passwordConfirmation"
          label="비밀번호 확인"
          error={errors.passwordConfirmation}
          placeholder="비밀번호를 한번 더 입력해주세요"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button type="submit" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <div>
        <p>회원이신가요?</p>
        <Link href="/login">로그인하기</Link>
      </div>
    </main>
  );
}
