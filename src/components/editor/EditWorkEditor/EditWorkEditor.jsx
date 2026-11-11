'use client';

import { useWorkEditor } from '@/hooks/useWorkEditor';
import { WorkEditor } from '../WorkEditor';
import { useUpdateSubmission } from '@/hooks/useSubmissions';
import { useRouter } from 'next/navigation';
import { EditHeader } from '../EditHeader';
import * as styles from './EditWorkEditor.css';
import { useWorkEditorDraft } from '@/hooks/useWorkEditorDraft';
import {
  WorkEditorDraftStatus,
  WorkEditorDraftDialogs,
} from '../WorkEditorDraft/WorkEditorDraft';
import { submissionEditError } from '@/utils/SubmissionError/submissionEditError';

export default function EditWorkEditor({ submission, userId }) {
  const canUseDraft = submission.author?.id === userId;
  const { title, setTitle, editor } = useWorkEditor({
    initialTitle: submission.title,
    initialContent: submission.content,
  });

  const router = useRouter();
  const { mutate, isPending } = useUpdateSubmission(
    submission.id,
    submission.challengeId,
  );
  const draftController = useWorkEditorDraft({
    challengeId: submission.challengeId,
    userId,
    title,
    setTitle,
    editor,
    isSubmitting: isPending,
    enabled: canUseDraft,
  });

  const handleEdit = () => {
    if (!draftController.canSubmit()) return;

    if (!title.trim() || !editor.getText().trim()) {
      alert('제목과 내용을 모두 입력해주세요');
      return;
    }

    mutate(
      {
        title,
        content: editor.getHTML(),
      },
      {
        onError: (error) => {
          alert(submissionEditError(error));
        },
        onSuccess: () => {
          router.push(
            submission.author?.id
              ? `/challenges/${submission.challengeId}/participants/${submission.author.id}/submission`
              : `/challenges/${submission.challengeId}`,
          );
        },
      },
    );
  };
  return (
    <main className={styles.page}>
      <EditHeader
        challengeId={submission.challengeId}
        isEditing
        handleSubmit={handleEdit}
        handleSaveDraft={
          canUseDraft ? draftController.handleSaveDraft : undefined
        }
        isSubmitting={isPending}
        isSaving={draftController.saveDraft.isPending}
        isBusy={draftController.isBusy || !editor}
      />
      {canUseDraft && (
        <WorkEditorDraftStatus
          challengeId={submission.challengeId}
          controller={draftController}
        />
      )}
      <WorkEditor
        title={title}
        onTitleChange={setTitle}
        editor={editor}
        isLoading={draftController.isLoadingDraft || isPending}
      />
      {canUseDraft && (
        <WorkEditorDraftDialogs
          challengeId={submission.challengeId}
          controller={draftController}
        />
      )}
    </main>
  );
}
