import { signup } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSignup({ onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: async (signupResponse) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.info() });
      queryClient.setQueryData(queryKeys.users.info(), signupResponse);
    },
    onError,
  });
}
