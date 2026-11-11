'use client';

import { useRef, useState } from 'react';
import { useSubmissionDraft } from './useSubmissionDraft';
import { getSubmissionDraftError } from '@/utils/SubmissionDraftError/getSubmissionDraftError';

export function useWorkEditorDraft({
  challengeId,
  userId,
  title,
  setTitle,
  editor,
  isSubmitting = false,
  enabled = true,
}) {
  const { draftQuery, saveDraft, deleteDraft } = useSubmissionDraft(
    challengeId,
    userId,
    { enabled },
  );
  const draft = draftQuery.data?.submissionDraft;
  const [draftPromptDismissed, setDraftPromptDismissed] = useState(false);

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const loadingDraftRef = useRef(false);
  const isBusy =
    isSubmitting ||
    saveDraft.isPending ||
    deleteDraft.isPending ||
    isLoadingDraft;

  const handleSaveDraft = () => {
    if (!enabled || !editor || isBusy || loadingDraftRef.current) return;

    if (!title.trim() && !editor.getText().trim()) {
      alert('제목이나 내용을 입력해주세요.');
      return;
    }

    saveDraft.reset();
    setShowSaveConfirm(true);
  };

  const confirmSaveDraft = () => {
    if (!enabled || !editor || isBusy || loadingDraftRef.current) return;
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
    if (!enabled || !editor || isBusy || loadingDraftRef.current) return;

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
    if (!enabled || !draft || isBusy || loadingDraftRef.current) return;

    deleteDraft.mutate();
  };

  // 불러오기 시작 직후, React가 다시 렌더링하기 전의 제출도 막습니다.
  const canSubmit = () =>
    Boolean(editor && !isBusy && !loadingDraftRef.current);

  return {
    draft,
    draftQuery,
    saveDraft,
    deleteDraft,
    draftPromptDismissed,
    showSaveConfirm,
    isLoadingDraft,
    isBusy,
    canSubmit,
    handleSaveDraft,
    confirmSaveDraft,
    handleLoadDraft,
    handleDeleteDraft,
    closeSaveConfirm: () => setShowSaveConfirm(false),
    dismissDraftPrompt: () => setDraftPromptDismissed(true),
    hasEditorInput: () => Boolean(title.length || (editor && !editor.isEmpty)),
  };
}
