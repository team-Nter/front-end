'use client';

import { useLogout } from '@/hooks/useLogout';
import { useMe } from '@/hooks/useMe';

export default function LoginTest() {
  const { data: userInfo, isPending, isError } = useMe();

  const { mutate: handleLogout } = useLogout();

  return (
    <div>
      <p>test</p>
      <button onClick={() => handleLogout()}>로그아웃</button>
      {isPending && <p>내 정보 불러오는 중...</p>}

      {isError && <p>내 정보를 불러오지 못했습니다.</p>}

      {userInfo && (
        <div>
          <p>이메일: {userInfo.email}</p>
          <p>닉네임: {userInfo.nickname}</p>
        </div>
      )}
    </div>
  );
}
