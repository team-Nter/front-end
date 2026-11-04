import { login } from '@/api/auth';
import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLogin({ onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (loginResponse) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.info() });
      queryClient.setQueryData(queryKeys.users.info(), loginResponse);
    },
    onError,
  });
}
