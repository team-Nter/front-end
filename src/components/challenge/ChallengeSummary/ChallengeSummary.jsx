import { ChallengeChip } from '../ChallengeChip';
import * as styles from './ChallengeSummary.css';

// 챌린지 제목 · 분야/문서 타입 칩 · 설명
// (신청한 챌린지 상세 · 어드민 상세 · 공개 상세가 함께 사용)
// 감싸는 태그 없이 돌려줘서, 부모 상자의 간격(gap)을 그대로 따라가요.
export default function ChallengeSummary({ challenge, actions, titleAction }) {
  const { title, category, documentType, description } = challenge;
  const heading = <h1 className={styles.title}>{title}</h1>;

  return (
    <>
      {titleAction ? (
        <div className={styles.titleRow}>
          {heading}
          {titleAction}
        </div>
      ) : (
        heading
      )}

      <div className={styles.chipRow}>
        <div className={styles.chips}>
          <ChallengeChip kind="category" value={category} />
          <ChallengeChip kind="documentType" value={documentType} />
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>

      <p className={styles.description}>{description}</p>
    </>
  );
}
