'use client';

import { useWorkEditorDraft } from '@/hooks/useWorkEditorDraft';
import {
  WorkEditorDraftStatus,
  WorkEditorDraftDialogs,
} from '../WorkEditorDraft/WorkEditorDraft';
import { EditHeader } from '../EditHeader';
import * as styles from './CreateWorkEditor.css';
import { WorkEditor } from '../WorkEditor';
import { useWorkEditor } from '@/hooks/useWorkEditor';
import { useRouter } from 'next/navigation';
import { useCreateSubmission } from '@/hooks/useSubmissions';
import { postSubmissionErrorMessage } from '@/utils/SubmissionError/submissionPostError';

export default function CreateWorkEditor({ id, userId }) {
  const router = useRouter();
  const { mutate, isPending } = useCreateSubmission(id);
  const { title, setTitle, editor } = useWorkEditor();
  const draftController = useWorkEditorDraft({
    challengeId: id,
    userId,
    title,
    setTitle,
    editor,
    isSubmitting: isPending,
  });
  const { isBusy, isLoadingDraft, handleSaveDraft, saveDraft } =
    draftController;

  const handleSubmit = () => {
    if (!draftController.canSubmit()) return;

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
      <WorkEditorDraftStatus challengeId={id} controller={draftController} />
      <WorkEditor
        title={title}
        onTitleChange={setTitle}
        editor={editor}
        isLoading={isLoadingDraft}
      />
      <WorkEditorDraftDialogs challengeId={id} controller={draftController} />
    </main>
  );
}
