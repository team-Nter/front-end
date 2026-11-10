'use client';

import { useState } from 'react';
import logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { validateSignup } from '@/utils/validators/validateAuthForm';
import { useSignup } from '@/hooks/useSignup';
import {
  AuthCheckErrorModal,
  ConnectionWarning,
  OfflineNotice,
} from '@/components/auth/commonAuth/AuthCheckNotices';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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

  const signupMutation = useSignup({
    onError: (error) => {
      if (error.status === 409) {
        const isNicknameConflict = error.message?.includes('닉네임');
        const isEmailConflict = error.message?.includes('이메일');

        if (isNicknameConflict) {
          setErrors((prev) => ({
            ...prev,
            nickname: '이미 사용 중인 닉네임입니다.',
          }));
        }
        if (isEmailConflict) {
          setErrors((prev) => ({
            ...prev,
            email: '이미 사용 중인 이메일입니다.',
          }));
        }
        if (!isNicknameConflict && !isEmailConflict) {
          alert('이미 가입된 정보가 있어요. 입력하신 내용을 확인해주세요.');
        }
      } else if (error.status === 400) {
        alert('양식에 맞지 않은 입력값입니다.');
      } else if (error.name === 'TimeoutError') {
        alert(
          '응답이 늦어지고 있어요. 이미 가입됐을 수 있으니 로그인을 시도해 보세요.',
        );
      } else if (error.status === undefined) {
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert('서버에 문제가 생겼어요. 잠시 후 다시 시도해주세요.');
      }
      console.error(error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedNickname = nickname.trim();
    const validationErrors = validateSignup({
      email: trimmedEmail,
      nickname: trimmedNickname,
      password,
      passwordConfirmation,
    });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    signupMutation.mutate({
      email: trimmedEmail,
      nickname: trimmedNickname,
      password,
    });
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
      {isError && <ConnectionWarning />}
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
            disabled={signupMutation.isPending}
          />
          <Input
            type="text"
            id="nickname"
            label="닉네임"
            error={errors.nickname}
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setErrors((prev) => ({ ...prev, nickname: '' }));
            }}
            disabled={signupMutation.isPending}
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
              setErrors((prev) => ({
                ...prev,
                password: '',
                passwordConfirmation: '',
              }));
            }}
            disabled={signupMutation.isPending}
          />
          <Input
            type="password"
            id="passwordConfirmation"
            label="비밀번호 확인"
            error={errors.passwordConfirmation}
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
              setErrors((prev) => ({ ...prev, passwordConfirmation: '' }));
            }}
            disabled={signupMutation.isPending}
          />
          <Button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? '가입 중...' : '회원가입'}
          </Button>
        </form>
        <GoogleLoginButton />
        <div>
          <p>회원이신가요?</p>
          <Link href="/login">로그인하기</Link>
        </div>
      </main>
    </>
  );
}
