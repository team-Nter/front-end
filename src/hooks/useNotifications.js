'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getMyNotifications,
  readAllNotifications,
  readNotification,
} from '@/api/notifications';
import { queryKeys } from '@/constants/query-keys';
import { useMe } from '@/hooks/useMe';

const PAGE_SIZE = 20;
const REFRESH_INTERVAL = 60 * 1000;

export function useNotifications() {
  const { data: me } = useMe();
  const params = { page: 1, pageSize: PAGE_SIZE, isRead: false };

  return useQuery({
    queryKey: queryKeys.notifications.list(me?.id, params),
    queryFn: ({ signal }) => getMyNotifications(params, { signal }),
    enabled: Boolean(me?.id),
    refetchInterval: REFRESH_INTERVAL,
    refetchOnWindowFocus: true,
  });
}

function useNotificationMutation(mutationFn) {
  const queryClient = useQueryClient();
  const { data: me } = useMe();

  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all(me?.id),
      }),
  });
}

export function useReadNotification() {
  const queryClient = useQueryClient();
  const { data: me } = useMe();
  const queryKey = queryKeys.notifications.all(me?.id);

  return useMutation({
    mutationFn: (notificationId) => readNotification(notificationId),

    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueriesData({ queryKey });

      queryClient.setQueriesData({ queryKey }, (old) => {
        if (!old?.items) return old;
        return {
          ...old,
          items: old.items.filter((item) => item.id !== notificationId),
          unreadCount: Math.max(0, old.unreadCount - 1),
        };
      });

      return { previous };
    },

    onError: (_error, _notificationId, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
}

export function useReadAllNotifications() {
  return useNotificationMutation(() => readAllNotifications());
}
