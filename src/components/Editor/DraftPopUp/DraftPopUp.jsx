import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/common/Button';
import { deleteSubmissionDraftError } from '@/utils/SubmissionDraftError/deleteSubmissionDraftError';
import DraftConfirmModal from './DraftConfirmModal';
import closeIcon from '@/assets/icons/draft-close.svg';
import * as styles from './DraftPopUp.css';

export default function DraftPopUp({
  handleLoadDraft,
  handleDeleteDraft,
  hasEditorInput,
  onDismiss,
  disabled,
  deleting,
  loading,
  deleteError,
}) {
  const [confirmation, setConfirmation] = useState(null);
  const isDelete = confirmation === 'delete';

  const requestLoad = () => {
    if (hasEditorInput()) setConfirmation('load');
    else handleLoadDraft();
  };

  const cancel = () => {
    if (!deleting && !loading) setConfirmation(null);
  };

  return (
    <>
      <aside className={styles.banner} aria-label="임시저장 안내">
        <div className={styles.message}>
          <button
            type="button"
            className={styles.close}
            aria-label="임시저장 안내 닫기"
            onClick={onDismiss}
            disabled={loading}
          >
            <Image src={closeIcon} alt="" width={24} height={24} />
          </button>
          <p>임시저장한 작업물이 있어요. 불러올까요?</p>
        </div>
        <div className={styles.actions}>
          <Button
            size="sm"
            variant="ghost"
            disabled={disabled}
            onClick={() => setConfirmation('delete')}
          >
            삭제
          </Button>
          <Button
            size="sm"
            className={styles.load}
            disabled={disabled}
            onClick={requestLoad}
          >
            {loading ? '불러오는 중…' : '불러오기'}
          </Button>
        </div>
      </aside>
      {confirmation && (
        <DraftConfirmModal
          question={
            isDelete
              ? '임시저장한 글을 삭제할까요?'
              : '작성 중인 내용을 임시저장한 글로 바꿀까요?'
          }
          confirmLabel={
            isDelete
              ? deleting
                ? '삭제 중…'
                : '삭제하기'
              : loading
                ? '불러오는 중…'
                : '불러오기'
          }
          busy={deleting || loading}
          disabled={disabled}
          errorMessage={
            isDelete && deleteError
              ? deleteSubmissionDraftError(deleteError)
              : null
          }
          onCancel={cancel}
          onConfirm={isDelete ? handleDeleteDraft : handleLoadDraft}
        />
      )}
    </>
  );
}
