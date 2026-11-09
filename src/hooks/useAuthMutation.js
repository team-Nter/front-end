import { queryKeys } from '@/constants/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAuthMutation(mutationFn, { onError } = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: async (user) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryKeys.users.info() }),
        queryClient.cancelQueries({ queryKey: ['submissions', 'detail'] }),
      ]);
      queryClient.removeQueries({ queryKey: ['submissions', 'detail'] });
      queryClient.setQueryData(queryKeys.users.info(), user);
    },
    onError,
  });
}
