'use client';

import { useEditor } from '@tiptap/react';
import EditHeader from '../EditHeader/EditHeader';
import { Tiptap } from '../Tiptap';
import StarterKit from '@tiptap/starter-kit';
import Input from '../Input/Input';
import { useState } from 'react';
import * as styles from './WorkEditor.css';
import TextAlign from '@tiptap/extension-text-align';
import { BackgroundColor, TextStyle } from '@tiptap/extension-text-style';

export default function WorkEditor({ id }) {
  const [title, setTitle] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      BackgroundColor,
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
  };

  return (
    <main className={styles.page}>
      <EditHeader challengeId={id} handleSubmit={handleSubmit} />
      <Input title={title} onChange={(event) => setTitle(event.target.value)} />
      <Tiptap editor={editor} />
    </main>
  );
}
