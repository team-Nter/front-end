'use client';

import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import EditHeader from '../EditHeader/EditHeader';
import { Tiptap } from '../Tiptap';
import StarterKit from '@tiptap/starter-kit';
import Input from '../Input/Input';
import { useState } from 'react';
import * as styles from './WorkEditor.css';
import TextAlign from '@tiptap/extension-text-align';
import { BackgroundColor, TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlockComponent from '../CodeBlockComponent/CodeblockComponent';
import { common, createLowlight } from 'lowlight';
import { useRouter } from 'next/navigation';
import { useCreateSubmission } from '@/hooks/useSubmissions';

const lowlight = createLowlight(common);

export default function WorkEditor({ id }) {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const { mutate, isPending, isError } = useCreateSubmission(id);
  const participationId = 221;
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      BackgroundColor,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
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
    if (!editor) return;

    if (!title.trim() || !editor.getText().trim()) {
      alert('제목과 내용을 모두 입력해주세요');
      return;
    }
    const content = editor.getHTML();

    console.log('title', title);
    console.log('content', content);
    console.log(id);

    mutate(
      {
        participationId,
        title,
        content,
      },
      {
        onSuccess: (submission) => {
          router.push(`/submissions/${submission.id}`);
        },
      },
    );
  };

  if (isPending) {
    <p>로딩 중...</p>;
  }
  if (isError) {
    <p>{error.message}</p>;
  }

  return (
    <main className={styles.page}>
      <EditHeader challengeId={id} handleSubmit={handleSubmit} />
      <Input title={title} onChange={(event) => setTitle(event.target.value)} />
      <Tiptap editor={editor} />
    </main>
  );
}
