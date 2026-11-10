import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAuthMutation(mutationFn, { onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.removeQueries();
      queryClient.setQueryData(queryKeys.users.info(), user);
    },
    onError,
  });
}
