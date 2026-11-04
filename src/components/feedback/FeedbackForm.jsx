'use client';

import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import activeIcon from '@/assets/icons/circle-arrow-down-filled-active.svg';
import inactiveIcon from '@/assets/icons/circle-arrow-down-filled-inactive.svg';
import * as styles from './Feedback.css';

export default function FeedbackForm({
  content,
  onContentChange,
  onSubmit,
  isPending,
  isError,
}) {
  const disabled = isPending || !content.trim();

  return (
    <form className={styles.composer} onSubmit={onSubmit} aria-busy={isPending}>
      <div className={styles.composerRow}>
        <Textarea
          className={styles.composerInput}
          aria-label="피드백 내용"
          placeholder="피드백을 남겨주세요"
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          disabled={isPending}
          maxLength={4000}
          rows={3}
        />
        <Button
          type="submit"
          variant="ghost"
          className={styles.submitButton}
          disabled={disabled}
          aria-label={isPending ? '피드백 등록 중' : '피드백 등록'}
        >
          <Image
            className={styles.submitIcon}
            src={disabled ? inactiveIcon : activeIcon}
            alt=""
            width={40}
            height={40}
          />
        </Button>
      </div>
      {isPending && (
        <p className={styles.status} role="status">
          등록 중...
        </p>
      )}
      {isError && (
        <p className={styles.error} role="alert">
          피드백 등록에 실패했어요.
        </p>
      )}
    </form>
  );
}
