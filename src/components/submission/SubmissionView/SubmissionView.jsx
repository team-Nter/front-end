'use client';

import Image from 'next/image';
import FeedbackSection from '@/components/feedback/FeedbackSection';
import emptyImage from '@/assets/images/empty.svg';
import profileUser from '@/assets/icons/profile-user.svg';
import { formatDate } from '@/utils';
import { SubmissionDetail } from '@/components/submission/SubmissionDetail';
import * as styles from '../SubmissionDetail/SubmissionDetail.css';
import { Like } from '@/components/like';
import { useMe } from '@/hooks/useMe';
import { SubmissionMenu } from '../SubmissionMenu/SubmissionMenu';
import { useDeleteSubmission } from '@/hooks/useSubmissions';
import { useState } from 'react';
import { SubmissionDeleteModal } from '../SubmissionDeleteModal/SubmissionDeleteModal';
import { useSubmissionChangeAccess } from '@/hooks/useSubmissionChangeAccess';

export default function SubmissionView({
  participation,
  submission = null,
  challengeStatus,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: me } = useMe();
  const author = submission?.author ?? participation.user;
  const isAuthor = Boolean(me?.id && author?.id === me.id);
  const access = useSubmissionChangeAccess(submission, me);
  const canEdit = access.canChange;
  const likeCount = submission?.likeCount ?? 0;
  const isLiked = submission?.isLiked ?? false;
  const updatedAt = submission?.updatedAt;
  const date = formatDate(updatedAt, '/');
  const { mutate, isPending, error, reset } = useDeleteSubmission(
    submission?.id,
    submission?.challengeId,
    author?.id,
  );
  const openDeleteModal = () => {
    if (!submission || !canEdit || isPending) return;
    reset();
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    if (isPending) return;
    setIsDeleteModalOpen(false);
    reset();
  };
  const handleDelete = () => {
    if (!submission || !canEdit || isPending) return;

    // 페이지 이동은 useDeleteSubmission에서 처리합니다.
    mutate(undefined, {
      onSuccess: () => setIsDeleteModalOpen(false),
    });
  };

  return (
    <article className={styles.article}>
      {submission && (
        <div className={styles.heading}>
          <h1 className={styles.title}>{submission.title}</h1>
          {canEdit && (
            <SubmissionMenu
              submissionId={submission.id}
              onDelete={openDeleteModal}
              isDeleting={isPending}
            />
          )}
        </div>
      )}
      {submission && isAuthor && !canEdit && (
        <div role={access.isChecking ? 'status' : 'alert'}>
          <p>{access.reason}</p>
          {access.canRetry && (
            <button type="button" onClick={() => access.retry()}>
              다시 시도
            </button>
          )}
        </div>
      )}
      <div className={styles.metadata}>
        <div className={styles.author}>
          <Image src={profileUser} alt="" width={24} height={24} />
          <span className={styles.nickname}>
            {author?.nickname ?? '알 수 없는 사용자'}
          </span>
        </div>
        {submission && (
          <Like
            submissionId={submission.id}
            challengeId={submission.challengeId}
            likeCount={likeCount}
            isLiked={isLiked}
          />
        )}
        {date && (
          <time className={styles.date} dateTime={updatedAt}>
            {date}
          </time>
        )}
      </div>
      {submission === null ? (
        <div className={styles.empty}>
          <Image
            src={emptyImage}
            alt=""
            className={styles.emptyImage}
            loading="eager"
          />
          <p>아직 작성하지 않았어요.</p>
        </div>
      ) : (
        <SubmissionDetail
          key={`submission:${submission.id}`}
          content={submission.content}
        />
      )}
      {submission && <hr className={styles.feedbackDivider} />}
      {submission && (
        <FeedbackSection
          key={`feedbacks:${submission.id}`}
          submissionId={submission.id}
          challengeStatus={challengeStatus}
        />
      )}
      {isDeleteModalOpen && (
        <SubmissionDeleteModal
          isPending={isPending}
          error={error}
          onCancel={closeDeleteModal}
          onConfirm={handleDelete}
        />
      )}
    </article>
  );
}
