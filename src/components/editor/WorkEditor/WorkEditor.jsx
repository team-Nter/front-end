'use client';

import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { EditHeader } from '../EditHeader';
import { Tiptap } from '../Tiptap';
import StarterKit from '@tiptap/starter-kit';
import { Input } from '../Input';
import { useRef, useState } from 'react';
import * as styles from './WorkEditor.css';
import TextAlign from '@tiptap/extension-text-align';
import { BackgroundColor, TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { CodeBlock } from '../CodeBlockComponent';
import { common, createLowlight } from 'lowlight';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCreateSubmission } from '@/hooks/useSubmissions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSubmission } from '@/api/submissions';
import { postSubmissionErrorMessage } from '@/utils/SubmissionError/submissionPostError';
import { useSubmissionDraft } from '@/hooks/useSubmissionDraft';
import { getSubmissionDraftError } from '@/utils/SubmissionDraftError/getSubmissionDraftError';
import { saveSubmissionDraftError } from '@/utils/SubmissionDraftError/saveSubmissionDraftError';
import DraftConfirmModal from '../DraftPopUp/DraftConfirmModal';
import { DraftPopUp } from '../DraftPopUp';

const lowlight = createLowlight(common);

export default function WorkEditor({ id, userId, submission }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const create = useCreateSubmission(id);
  const update = useMutation({
    mutationFn: (data) => updateSubmission(submission.id, data),
    onSuccess: () => Promise.all([
      queryClient.invalidateQueries({ queryKey: ['submissions'] }),
      queryClient.invalidateQueries({ queryKey: ['participations'] }),
      queryClient.invalidateQueries({ queryKey: ['challenges'] }),
    ]),
  });
  const { mutate, isPending } = submission ? update : create;
  const { draftQuery, saveDraft, deleteDraft } = useSubmissionDraft(id, userId);
  const draft = draftQuery.data?.submissionDraft;
  const [title, setTitle] = useState(submission?.title ?? '');
  const [draftPromptDismissed, setDraftPromptDismissed] = useState(false);

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const loadingDraftRef = useRef(false);
  const isBusy =
    isPending || saveDraft.isPending || deleteDraft.isPending || isLoadingDraft;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      BackgroundColor,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({
        lowlight,
        defaultLanguage: null,
        enableTabIndentation: true,
        tabSize: 2,
      }),
    ],
    content: submission?.content ?? '',
    immediatelyRender: false,
  });

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
          alert(submission ? error.message || '작업물을 수정하지 못했습니다.' : postSubmissionErrorMessage(error));
        },
        onSuccess: (result) => {
          const authorId = submission ? submission.author?.id : result.author.id;
          router.push(authorId ? `/challenges/${id}/participants/${authorId}/submission` : `/challenges/${id}`);
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
        isEditing={Boolean(submission)}
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
      <div inert={isLoadingDraft} aria-busy={isLoadingDraft}>
        <Input
          title={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Tiptap editor={editor} />
      </div>
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
