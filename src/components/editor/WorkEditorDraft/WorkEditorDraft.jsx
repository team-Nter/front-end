'use client';

import Link from 'next/link';
import { getSubmissionDraftError } from '@/utils/SubmissionDraftError/getSubmissionDraftError';
import { saveSubmissionDraftError } from '@/utils/SubmissionDraftError/saveSubmissionDraftError';
import { ConfirmModal } from '@/components/common/ConfirmModal';
import { DraftPopUp } from '../DraftPopUp';
import * as styles from './WorkEditorDraft.css';

export default function WorkEditorDraft({ challengeId: id, controller }) {
  const { draftQuery, isBusy } = controller;
  return (
    <>
      {draftQuery.isPending && (
        <p role="status">임시저장한 글을 확인하는 중이에요.</p>
      )}
      {draftQuery.isError && (
        <div role="alert">
          <p>{getSubmissionDraftError(draftQuery.error)}</p>
          {draftQuery.error?.status === 404 ? (
            <Link
              href={`/challenges/${id}`}
              style={{ textDecoration: 'underline' }}
            >
              챌린지로 돌아가기
            </Link>
          ) : (
            <button
              type="button"
              disabled={draftQuery.isFetching || isBusy}
              onClick={() => draftQuery.refetch()}
            >
              {draftQuery.isFetching ? '다시 확인하는 중…' : '다시 시도'}
            </button>
          )}
        </div>
      )}
    </>
  );
}

export function WorkEditorDraftDialogs({ challengeId: id, controller }) {
  const {
    draft,
    draftQuery,
    saveDraft,
    deleteDraft,
    draftPromptDismissed,
    showSaveConfirm,
    isLoadingDraft,
    isBusy,
    closeSaveConfirm,
    confirmSaveDraft,
    hasEditorInput,
    dismissDraftPrompt,
    handleLoadDraft,
    handleDeleteDraft,
  } = controller;
  return (
    <>
      {showSaveConfirm && (
        <ConfirmModal
          question={
            <>
              <p>
                현재까지 작업한 내용을
                <br />
                저장하시겠습니까?
              </p>
              <p className={styles.draftSaveDescription}>
                기존 임시저장한 글이 지금 내용으로 바뀌게 됩니다.
              </p>
            </>
          }
          cancelLabel="아니오"
          confirmLabel={saveDraft.isPending ? '저장 중…' : '네'}
          busy={saveDraft.isPending}
          disabled={isBusy}
          errorMessage={
            saveDraft.error ? saveSubmissionDraftError(saveDraft.error) : null
          }
          recoveryHref={
            saveDraft.error?.status === 404 ? `/challenges/${id}` : undefined
          }
          recoveryLabel="챌린지로 돌아가기"
          onCancel={closeSaveConfirm}
          onConfirm={confirmSaveDraft}
        />
      )}
      {draft && !draftPromptDismissed && (
        <DraftPopUp
          challengeId={id}
          loadError={draftQuery.error}
          disabled={isBusy}
          loading={isLoadingDraft}
          hasEditorInput={hasEditorInput}
          onDismiss={dismissDraftPrompt}
          deleting={deleteDraft.isPending}
          deleteError={deleteDraft.error}
          handleLoadDraft={handleLoadDraft}
          handleDeleteDraft={handleDeleteDraft}
        />
      )}
    </>
  );
}
