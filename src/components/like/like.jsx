import { useSubmissionLike } from '@/hooks/useSubmissionLike';

export default function Like({ submissionId, likeCount = 0, isLiked = false }) {
  const { putLikes, deleteLikes } = useSubmissionLike(submissionId);
  const isPending = putLikes.isPending || deleteLikes.isPending;
  const error = putLikes.error || deleteLikes.error;
  const handleClick = () => {
    if (isPending) return;

    putLikes.reset();
    deleteLikes.reset();

    if (isLiked) {
      deleteLikes.mutate();
    } else {
      putLikes.mutate();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isLiked}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      >
        <span aria-hidden="true">{isLiked ? '♥' : '♡'}</span>{' '}
        {likeCount.toLocaleString('ko-KR')}
      </button>

      {error && <p role="alert">{error.message}</p>}
    </div>
  );
}
