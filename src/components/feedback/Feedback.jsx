'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import profileIcon from '@/assets/icons/profile-user.svg';
import { Button } from '@/components/common/Button';
import { Textarea } from '@/components/common/Textarea';
import * as styles from './Feedback.css';
import { useDeleteFeedback, useUpdateFeedback } from '@/hooks/useFeedback';
import FeedbackActions from './FeedbackActions';

export default function Feedback({ feedback }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(feedback.content);
  const {
    mutate: updateFeedback,
    isPending: isUpdating,
    isError: isUpdateError,
    reset: resetUpdate,
  } = useUpdateFeedback(feedback.id);

  const {
    mutate: deleteFeedback,
    isPending: isDeleting,
    isError: isDeleteError,
  } = useDeleteFeedback(feedback.id);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed || isUpdating || isDeleting) return;

    updateFeedback(trimmed, { onSuccess: () => setIsEditing(false) });
  }

  function handleCancel() {
    setContent(feedback.content); // 취소하면 원래 내용으로
    setIsEditing(false);
  }

  function handleEdit() {
    setContent(feedback.content);
    resetUpdate();
    setIsEditing(true);
  }

  function handleDelete() {
    if (isUpdating || isDeleting) return;
    if (!window.confirm('피드백을 삭제할까요?')) return;

    deleteFeedback();
  }

  const createdAt = new Date(feedback.createdAt);
  const dateLabel = Number.isNaN(createdAt.getTime())
    ? ''
    : new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Seoul',
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      })
        .format(createdAt)
        .replaceAll('-', '/');
  const Container = isEditing ? 'form' : 'article';

  return (
    <Container
      className={clsx(styles.card, isEditing && styles.editing)}
      onSubmit={isEditing ? handleSubmit : undefined}
      aria-busy={isUpdating || isDeleting}
    >
      <div className={styles.header}>
        <div className={styles.author}>
          <Image
            src={profileIcon}
            alt=""
            width={32}
            height={32}
            className={styles.avatar}
          />
          <div className={styles.authorInfo}>
            <p className={styles.nickname}>{feedback.author.nickname}</p>
            {dateLabel && (
              <time className={styles.date} dateTime={createdAt.toISOString()}>
                {dateLabel}
              </time>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className={styles.editActions}>
            <Button
              variant="ghost"
              size="sm"
              className={styles.cancel}
              onClick={handleCancel}
              disabled={isUpdating}
            >
              취소
            </Button>
            <Button
              type="submit"
              size="sm"
              className={styles.save}
              disabled={isUpdating || !content.trim()}
            >
              {isUpdating ? '저장 중...' : '수정 완료'}
            </Button>
          </div>
        ) : (
          <FeedbackActions
            onEdit={handleEdit}
            onDelete={handleDelete}
            disabled={isUpdating || isDeleting}
          />
        )}
      </div>
      {isEditing ? (
        <Textarea
          className={styles.composerInput}
          rows={3}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={isUpdating}
          maxLength={4000}
          aria-label="피드백 수정"
          placeholder="피드백을 입력해주세요"
          autoFocus
        />
      ) : (
        <p className={styles.content}>{feedback.content}</p>
      )}
      {isEditing && isUpdateError && (
        <p className={styles.error} role="alert">
          수정에 실패했어요.
        </p>
      )}
      {isDeleting && (
        <p className={styles.status} role="status">
          삭제 중...
        </p>
      )}
      {isDeleteError && (
        <p className={styles.error} role="alert">
          삭제에 실패했어요.
        </p>
      )}
    </Container>
  );
}
