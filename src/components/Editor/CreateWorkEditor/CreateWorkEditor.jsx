'use client';

import { EditHeader } from '../EditHeader';
import { useRef, useState } from 'react';
import * as styles from './CreateWorkEditor.css';
import { WorkEditor } from '../WorkEditor';
import { useWorkEditor } from '@/hooks/useWorkEditor';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreateSubmission } from '@/hooks/useSubmissions';
import { postSubmissionErrorMessage } from '@/utils/SubmissionError/submissionPostError';
import { useSubmissionDraft } from '@/hooks/useSubmissionDraft';
import { getSubmissionDraftError } from '@/utils/SubmissionDraftError/getSubmissionDraftError';
import { saveSubmissionDraftError } from '@/utils/SubmissionDraftError/saveSubmissionDraftError';
import DraftConfirmModal from '../DraftPopUp/DraftConfirmModal';
import { DraftPopUp } from '../DraftPopUp';

export default function CreateWorkEditor({ id, userId }) {
  const router = useRouter();
  const { mutate, isPending } = useCreateSubmission(id);
  const { title, setTitle, editor } = useWorkEditor();
  const { draftQuery, saveDraft, deleteDraft } = useSubmissionDraft(id, userId);
  const draft = draftQuery.data?.submissionDraft;
  const [draftPromptDismissed, setDraftPromptDismissed] = useState(false);

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const loadingDraftRef = useRef(false);
  const isBusy =
    isPending || saveDraft.isPending || deleteDraft.isPending || isLoadingDraft;

  const handleSubmit = () => {
    if (!editor || isBusy || loadingDraftRef.current) return;

    if (!title.trim() || !editor.getText().trim()) {
      alert('제목과 내용을 모두 입력해주세요');
      return;
    }
    const content = editor.getHTML();

    mutate(
      {
        title,
        content,
      },
      {
        onError: (error) => {
          alert(postSubmissionErrorMessage(error));
        },
        onSuccess: (result) => {
          router.push(
            `/challenges/${id}/participants/${result.author.id}/submission`,
          );
        },
      },
    );
  };

  const handleSaveDraft = () => {
    if (!editor || isBusy || loadingDraftRef.current) return;

    if (!title.trim() && !editor.getText().trim()) {
      alert('제목이나 내용을 입력해주세요.');
      return;
    }

    saveDraft.reset();
    setShowSaveConfirm(true);
  };

  const confirmSaveDraft = () => {
    if (!editor || isBusy || loadingDraftRef.current) return;
    saveDraft.mutate(
      { title, content: editor.getHTML() },
      {
        onSuccess: () => {
          setShowSaveConfirm(false);
          setDraftPromptDismissed(true);
          alert('임시저장했어요.');
        },
      },
    );
  };

  const handleLoadDraft = async () => {
    if (!editor || isBusy || loadingDraftRef.current) return;

    loadingDraftRef.current = true;
    setIsLoadingDraft(true);
    try {
      const result = await draftQuery.refetch();
      if (editor.isDestroyed) return;

      if (result.isError) {
        alert(getSubmissionDraftError(result.error));
        return;
      }

      const latestDraft = result.data?.submissionDraft;
      if (!latestDraft) {
        alert('불러올 임시저장 글이 없어요.');
        return;
      }

      setTitle(latestDraft.title ?? '');
      editor.commands.setContent(latestDraft.content);
      setDraftPromptDismissed(true);
    } catch (error) {
      alert(getSubmissionDraftError(error));
    } finally {
      loadingDraftRef.current = false;
      setIsLoadingDraft(false);
    }
  };

  const handleDeleteDraft = () => {
    if (!draft || isBusy || loadingDraftRef.current) return;

    deleteDraft.mutate();
  };

  return (
    <main className={styles.page}>
      <EditHeader
        challengeId={id}
        handleSubmit={handleSubmit}
        handleSaveDraft={handleSaveDraft}
        isBusy={isBusy}
        isSubmitting={isPending}
        isSaving={saveDraft.isPending}
      />
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
      <WorkEditor
        title={title}
        onTitleChange={setTitle}
        editor={editor}
        isLoading={isLoadingDraft}
      />
      {showSaveConfirm && (
        <DraftConfirmModal
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
          onCancel={() => setShowSaveConfirm(false)}
          onConfirm={confirmSaveDraft}
        />
      )}
      {draft && !draftPromptDismissed && (
        <DraftPopUp
          challengeId={id}
          loadError={draftQuery.error}
          disabled={isBusy}
          loading={isLoadingDraft}
          hasEditorInput={() =>
            Boolean(title.length || (editor && !editor.isEmpty))
          }
          onDismiss={() => setDraftPromptDismissed(true)}
          deleting={deleteDraft.isPending}
          deleteError={deleteDraft.error}
          handleLoadDraft={handleLoadDraft}
          handleDeleteDraft={handleDeleteDraft}
        />
      )}
    </main>
  );
}
