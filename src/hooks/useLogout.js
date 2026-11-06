'use client';

import { logout } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.setQueryData(queryKeys.users.info(), null);

      router.replace('/');
    },
    onError: (error) => {
      alert('로그아웃 되지 않았습니다. 다시 시도해주세요.');
      console.error(error);
    },
  });

  return logoutMutation;
}

// const { mutate: handleLogout, isPending, isError } = useLogout();
// 로그아웃 실패 시 기존 로그인 상태를 유지 alert으로 알림
