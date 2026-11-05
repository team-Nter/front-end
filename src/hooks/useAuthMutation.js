import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAuthMutation(mutationFn, { onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: async (user) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.info() });
      queryClient.setQueryData(queryKeys.users.info(), user);
    },
    onError,
  });
}
