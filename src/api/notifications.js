import { challengeRequest } from '@/api/challenges';

export function getMyNotifications(
  { page = 1, pageSize = 20, isRead } = {},
  { signal } = {},
) {
  const searchParams = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (isRead !== undefined) searchParams.set('isRead', String(isRead));

  return challengeRequest({
    path: `/users/me/notifications?${searchParams}`,
    signal,
    errorMessage: '알림을 불러오지 못했습니다.',
  });
}

export function readNotification(notificationId) {
  return challengeRequest({
    path: `/users/me/notifications/${notificationId}/read`,
    method: 'PATCH',
    errorMessage: '알림을 읽음 처리하지 못했습니다.',
  });
}

export function readAllNotifications() {
  return challengeRequest({
    path: '/users/me/notifications/read-all',
    method: 'PATCH',
    errorMessage: '알림을 읽음 처리하지 못했습니다.',
  });
}
