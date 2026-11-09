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
import { useCreateSubmission } from '@/hooks/useSubmissions';
import { postSubmissionErrorMessage } from '@/utils/SubmissionError/submissionPostError';
import { useSubmissionDraft } from '@/hooks/useSubmissionDraft';
import { getSubmissionDraftError } from '@/utils/SubmissionDraftError/getSubmissionDraftError';
import { saveSubmissionDraftError } from '@/utils/SubmissionDraftError/saveSubmissionDraftError';
import DraftConfirmModal from '../DraftPopUp/DraftConfirmModal';
import { DraftPopUp } from '../DraftPopUp';

const lowlight = createLowlight(common);

export default function WorkEditor({ id, userId }) {
  const router = useRouter();
  const { mutate, isPending } = useCreateSubmission(id);
  const { draftQuery, saveDraft, deleteDraft } = useSubmissionDraft(id, userId);
  const draft = draftQuery.data?.submissionDraft;
  const [title, setTitle] = useState('');
  const [draftPromptDismissed, setDraftPromptDismissed] = useState(false);

  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const loadingDraftRef = useRef(false);

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
    content: '',
    immediatelyRender: false,
  });

  const handleSubmit = () => {
    if (!editor || isPending || loadingDraftRef.current) return;

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
        onSuccess: (submission) => {
          router.push(
            `/challenges/${id}/participants/${submission.author.id}/submission`,
          );
        },
      },
    );
  };

  const handleSaveDraft = () => {
    if (loadingDraftRef.current) return;
    if (!editor || saveDraft.isPending || deleteDraft.isPending || isPending)
      return;

    if (!title.trim() && !editor.getText().trim()) {
      alert('제목이나 내용을 입력해주세요.');
      return;
    }

    saveDraft.reset();
    setShowSaveConfirm(true);
  };

  const confirmSaveDraft = () => {
    if (loadingDraftRef.current) return;
    if (!editor || saveDraft.isPending || deleteDraft.isPending) return;
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
    if (
      !editor ||
      loadingDraftRef.current ||
      isPending ||
      deleteDraft.isPending ||
      saveDraft.isPending
    )
      return;

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
    if (loadingDraftRef.current) return;
    if (!draft || deleteDraft.isPending || saveDraft.isPending) return;

    deleteDraft.mutate();
  };

  return (
    <main className={styles.page}>
      <EditHeader
        challengeId={id}
        handleSubmit={handleSubmit}
        handleSaveDraft={handleSaveDraft}
        isDeletingDraft={deleteDraft.isPending}
        isSubmitting={isPending}
        isSaving={saveDraft.isPending}
        isLoadingDraft={isLoadingDraft}
      />
      {draftQuery.isPending && (
        <p role="status">임시저장한 글을 확인하는 중이에요.</p>
      )}
      {draftQuery.isError && (
        <div role="alert">
          <p>{getSubmissionDraftError(draftQuery.error)}</p>
          <button
            type="button"
            disabled={
              draftQuery.isFetching ||
              saveDraft.isPending ||
              deleteDraft.isPending
            }
            onClick={() => draftQuery.refetch()}
          >
            {draftQuery.isFetching ? '다시 확인하는 중…' : '다시 시도'}
          </button>
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
          errorMessage={
            saveDraft.error ? saveSubmissionDraftError(saveDraft.error) : null
          }
          onCancel={() => setShowSaveConfirm(false)}
          onConfirm={confirmSaveDraft}
        />
      )}
      {draft && !draftPromptDismissed && (
        <DraftPopUp
          disabled={
            deleteDraft.isPending ||
            saveDraft.isPending ||
            isPending ||
            isLoadingDraft
          }
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
