import { createDateFormatter } from '@/utils';
import * as styles from './NotificationList.css';

const { format: formatFullDate } = createDateFormatter({ year: 'numeric' });

export default function NotificationList({
  notifications,
  isPending,
  isError,
  onItemClick,
  onReadAll,
  isReadingAll,
}) {
  const hasItems = notifications.length > 0;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>알림</h2>
        {hasItems && (
          <button
            type="button"
            className={styles.readAll}
            onClick={onReadAll}
            disabled={isReadingAll}
          >
            {isReadingAll ? '처리 중...' : '모두 읽음'}
          </button>
        )}
      </div>

      {isPending ? (
        <p className={styles.message}>불러오는 중...</p>
      ) : isError ? (
        <p role="alert" className={styles.message}>
          알림을 불러오지 못했어요.
        </p>
      ) : notifications.length === 0 ? (
        <p className={styles.message}>새로운 알림이 없어요.</p>
      ) : (
        <ul className={styles.list}>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <button
                type="button"
                className={styles.item}
                onClick={() => onItemClick?.(notification)}
              >
                <span className={styles.text}>{notification.message}</span>
                <time dateTime={notification.createdAt} className={styles.date}>
                  {formatFullDate(notification.createdAt)}
                </time>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
