import * as styles from './ChallengeModerationNotice.css';

const NOTICES = {
  admin: {
    REJECTED: {
      message: '신청이 거절된 챌린지입니다.',
      reasonTitle: '신청 거절 사유',
      tone: 'rejected',
    },
    CANCELED: {
      message: '삭제된 챌린지입니다.',
      reasonTitle: '삭제 사유',
      tone: 'canceled',
    },
  },
  requester: {
    PENDING: {
      message: '승인 대기 중입니다.',
      tone: 'pending',
    },
    REJECTED: {
      message: '신청이 거절되었습니다.',
      reasonTitle: '신청 거절 사유',
      author: '독스루 운영진',
      tone: 'rejected',
    },
    CANCELED: {
      message: '삭제된 챌린지입니다.',
      reasonTitle: '삭제 사유',
      tone: 'canceled',
    },
  },
};

function formatDateTime(value) {
  return new Date(value)
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .slice(2, 16)
    .replaceAll('-', '/');
}

export default function ChallengeModerationNotice({
  status,
  moderation,
  audience = 'admin',
}) {
  const notice = NOTICES[audience]?.[status];
  if (!notice) return null;

  return (
    <section className={styles.notice}>
      <p role="status" className={styles.banner[notice.tone]}>
        {notice.message}
      </p>

      {notice.reasonTitle && moderation && (
        <div className={styles.reasonBox}>
          <h2 className={styles.reasonTitle}>{notice.reasonTitle}</h2>
          <p className={styles.reason}>{moderation.reason}</p>
          <p className={styles.reasonMeta}>
            {notice.author && (
              <>
                <span>{notice.author}</span>
                <span className={styles.divider} aria-hidden="true">
                  |
                </span>
              </>
            )}
            <time dateTime={moderation.createdAt}>
              {formatDateTime(moderation.createdAt)}
            </time>
          </p>
        </div>
      )}
    </section>
  );
}
