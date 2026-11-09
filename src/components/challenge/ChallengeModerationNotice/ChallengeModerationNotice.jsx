import * as styles from './ChallengeModerationNotice.css';

const NOTICES = {
  REJECTED: {
    message: '신청이 거절된 챌린지입니다.',
    reasonTitle: '신청 거절 사유',
  },
  CANCELED: {
    message: '삭제된 챌린지입니다.',
    reasonTitle: '삭제 사유',
  },
};

function formatDateTime(value) {
  return new Date(value)
    .toLocaleString('sv-SE', { timeZone: 'Asia/Seoul' })
    .slice(2, 16)
    .replaceAll('-', '/');
}

export default function ChallengeModerationNotice({ status, moderation }) {
  const notice = NOTICES[status];
  if (!notice) return null;

  return (
    <section className={styles.notice}>
      <p role="status" className={styles.banner}>
        {notice.message}
      </p>

      {moderation && (
        <div className={styles.reasonBox}>
          <h2 className={styles.reasonTitle}>{notice.reasonTitle}</h2>
          <p className={styles.reason}>{moderation.reason}</p>
          <time dateTime={moderation.createdAt} className={styles.date}>
            {formatDateTime(moderation.createdAt)}
          </time>
        </div>
      )}
    </section>
  );
}
