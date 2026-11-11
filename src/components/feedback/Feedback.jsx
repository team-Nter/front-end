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
import { useMe } from '@/hooks/useMe';
import { getFeedbackErrorMessage } from '@/utils/feedbackError';
import ConfirmModal from '@/components/Editor/DraftPopUp/DraftConfirmModal';

export default function Feedback({ feedback, submissionId, canWrite }) {
  const { data: user, isSuccess } = useMe();
  const isWithDrawn = !feedback.author;
  const authorName = isWithDrawn ? '탈퇴한 사용자' : feedback.author.nickname;

  // 수정 / 삭제 관련 작성자 혹은 운영자만 가능하게
  const canManage =
    canWrite &&
    isSuccess &&
    Boolean(user?.id) &&
    (user.role === 'ADMIN' || user.id === feedback.author?.id);
  const [editingUserId, setEditingUserId] = useState(null);
  const isEditing = canManage && editingUserId === user.id;
  const [deletingUserId, setDeletingUserId] = useState(null);
  const isDeleteConfirmOpen = canManage && deletingUserId === user.id;
  const [content, setContent] = useState(feedback.content);
  const {
    mutate: updateFeedback,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdate,
  } = useUpdateFeedback(feedback.id, submissionId);

  const {
    mutate: deleteFeedback,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteFeedback(feedback.id, submissionId);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!canManage || !trimmed || isUpdating || isDeleting) return;

    updateFeedback(trimmed, { onSuccess: () => setEditingUserId(null) });
  }

  function handleCancel() {
    setContent(feedback.content); // 취소하면 원래 내용으로
    setEditingUserId(null);
  }

  function handleEdit() {
    if (!canManage) return;
    setContent(feedback.content);
    resetUpdate();
    setEditingUserId(user.id);
  }

  function handleDelete() {
    if (!canManage || isUpdating || isDeleting) return;
    resetDelete();
    setDeletingUserId(user.id);
  }

  function handleConfirmDelete() {
    if (!isDeleteConfirmOpen || isUpdating || isDeleting) return;
    deleteFeedback(undefined, {
      onSuccess: () => setDeletingUserId(null),
    });
  }

  function handleCancelDelete() {
    if (isDeleting) return;
    setDeletingUserId(null);
    resetDelete();
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
            <p className={styles.nickname}>{authorName}</p>
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
        ) : canManage ? (
          <FeedbackActions
            onEdit={handleEdit}
            onDelete={handleDelete}
            disabled={isUpdating || isDeleting}
          />
        ) : null}
      </div>
      {isEditing ? (
        <Textarea
          className={styles.composerInput}
          rows={3}
          value={content}
          onChange={(event) => {
            resetUpdate();
            setContent(event.target.value);
          }}
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
          {getFeedbackErrorMessage(updateError, '수정')}
        </p>
      )}
      {isDeleting && (
        <p className={styles.status} role="status">
          삭제 중...
        </p>
      )}
      {isDeleteError && !isDeleteConfirmOpen && (
        <p className={styles.error} role="alert">
          {getFeedbackErrorMessage(deleteError, '삭제')}
        </p>
      )}
      {isDeleteConfirmOpen && (
        <ConfirmModal
          question="피드백을 삭제할까요?"
          confirmLabel={isDeleting ? '삭제 중…' : '삭제하기'}
          busy={isDeleting}
          errorMessage={
            isDeleteError
              ? getFeedbackErrorMessage(deleteError, '삭제')
              : undefined
          }
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Container>
  );
}
