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
            `/challenges/${submission.challengeId}/participants/${submission.author.id}/submission`,
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
        handleSaveDraft={draftController.handleSaveDraft}
        isSubmitting={isPending}
        isSaving={draftController.saveDraft.isPending}
        isBusy={draftController.isBusy || !editor}
      />
      <WorkEditorDraftStatus
        challengeId={submission.challengeId}
        controller={draftController}
      />
      <WorkEditor
        title={title}
        onTitleChange={setTitle}
        editor={editor}
        isLoading={draftController.isLoadingDraft}
      />
      <WorkEditorDraftDialogs
        challengeId={submission.challengeId}
        controller={draftController}
      />
    </main>
  );
}
