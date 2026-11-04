'use client';

import { useState } from 'react';
import logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';
import { validateSignup } from '@/utils/validators/validateAuthForm';
import { Modal } from '../common/Modal';
import { useSignup } from '@/hooks/useSignup';

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

  const signupMutation = useSignup({
    onError: (error) => {
      if (error.status === 409) {
        setErrors((prev) => ({
          ...prev,
          email: '이미 사용 중인 이메일입니다.',
        }));
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

  if (isLoggedIn) return null;
  if (isPending && isPaused)
    return (
      <p>오프라인 상태예요. 네트워크 연결이 복구되면 다시 시도해 주세요.</p>
    );
  if (isPending) return null;

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
          />
          <Button type="submit" disabled={signupMutation.isPending}>
            {signupMutation.isPending ? '가입 중...' : '회원가입'}
          </Button>
        </form>
        <div>
          <p>회원이신가요?</p>
          <Link href="/login">로그인하기</Link>
        </div>
      </main>
    </>
  );
}
