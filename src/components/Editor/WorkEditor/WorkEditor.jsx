'use client';

import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import { EditHeader } from '../EditHeader';
import { Tiptap } from '../Tiptap';
import StarterKit from '@tiptap/starter-kit';
import { Input } from '../Input';
import { useState } from 'react';
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

const lowlight = createLowlight(common);

export default function WorkEditor({ id, userId }) {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { mutate, isPending } = useCreateSubmission(id);
  const { saveDraft } = useSubmissionDraft(id, userId);
  // 불러오기 하려면 일단 임시저장 버튼 떠야하고, 근데 처음부터 일단 여기 왔을 때 임시저장항목있는지 알려야 하니까
  // 여기서 불러오기 해야함. -> 그래서 이제 그 버튼 누르면 불러오기 값들 보여지면서 하면 될 거 같고
  // 임시저장 버튼 누르면 임시저장 써지면 되고,
  // 저기 불러오기 뜬 곳에서 불러오기 x 버튼있는 곳에 저거 deleteQuery 주면 됫듯
  // 그럼 여기서 작업해야할 거는 임시저장 버튼 누를 때 써지는 거.

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
    if (!editor || isPending) return;

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
    if (!editor || saveDraft.isPending) return;

    if (!title.trim() && !editor.getText().trim()) {
      alert('제목이나 내용을 입력해주세요.');
      return;
    }

    saveDraft.mutate(
      { title, content: editor.getHTML() },
      {
        onSuccess: () => alert('임시저장했어요.'),
        onError: (error) => alert(error.message),
      },
    );
  };

  return (
    <main className={styles.page}>
      <EditHeader
        challengeId={id}
        handleSubmit={handleSubmit}
        handleSaveDraft={handleSaveDraft}
        isSubmitting={isPending}
        isSaving={saveDraft.isPending}
      />
      <Input title={title} onChange={(event) => setTitle(event.target.value)} />
      <Tiptap editor={editor} />
    </main>
  );
}
