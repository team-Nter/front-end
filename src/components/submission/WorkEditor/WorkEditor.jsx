'use client';

import { useEditor } from '@tiptap/react';
import EditHeader from '../EditHeader/EditHeader';
import { EditorToolbar } from '../EditorToolbar';
import { Tiptap } from '../Tiptap';
import StarterKit from '@tiptap/starter-kit';
import Input from '../Input/Input';
import { useState } from 'react';
import TextAlign from '@tiptap/extension-text-align';

export default function WorkEditor({ id }) {
  const [title, setTitle] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    immediatelyRender: false,
  });

  const handleSubmit = () => {
    if (!editor) return;

    if (!title || !editor.getText().trim()) {
      alert('제목과 내용을 모두 입력해주세요');
      return;
    }
    const content = editor.getHTML();

    console.log('title', title);
    console.log('content', content);
  };

  return (
    <div>
      <EditHeader challengeId={id} handleSubmit={handleSubmit} />
      <Input title={title} onChange={(event) => setTitle(event.target.value)} />
      <Tiptap editor={editor} />
    </div>
  );
}
