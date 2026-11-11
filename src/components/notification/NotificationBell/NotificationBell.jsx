'use client';

import Image from 'next/image';
import { Popover } from '@/components/common/Popover';
import {
  useNotifications,
  useReadNotification,
} from '@/hooks/useNotifications';
import bellEmptyIcon from '@/assets/icons/bell-empty.svg';
import bellNotiIcon from '@/assets/icons/bell-noti.svg';
import { NotificationList } from '../NotificationList';
import { useRouter } from 'next/navigation';
import { getNotificationHref } from '../getNotificationHref';
import * as styles from './NotificationBell.css';

export default function NotificationBell() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useNotifications();
  const { mutate: markAsRead } = useReadNotification();

  const notifications = data?.items ?? [];
  const unreadCount = data?.unreadCount ?? 0;
  const hasUnread = unreadCount > 0;

  const handleItemClick = (notification, close) => {
    if (!notification.readAt) markAsRead(notification.id);
    close();
    const href = getNotificationHref(notification);
    if (href) router.push(href);
  };
  return (
    <Popover
      align="right"
      className={styles.popoverPanel}
      trigger={
        <button
          type="button"
          className={styles.trigger}
          aria-label={
            hasUnread ? `알림, 읽지 않은 알림 ${unreadCount}개` : '알림'
          }
          onClick={(event) => {
            const isOpening =
              event.currentTarget.getAttribute('aria-expanded') !== 'true';
            if (isOpening) refetch();
          }}
        >
          <Image src={hasUnread ? bellNotiIcon : bellEmptyIcon} alt="" />
        </button>
      }
    >
      {({ close }) => (
        <NotificationList
          notifications={notifications}
          isPending={isPending}
          isError={isError}
          onItemClick={(notification) => handleItemClick(notification, close)}
        />
      )}
    </Popover>
  );
}
