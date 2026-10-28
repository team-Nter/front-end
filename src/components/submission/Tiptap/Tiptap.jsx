'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorToolbar } from '../EditorToolbar';
import * as styles from './Tiptap.css.js';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello world!</p>',
    immediatelyRender: false,
  });

  if (!editor) return null;
  return (
    <div className={styles.container}>
      <EditorContent editor={editor} />
      <EditorToolbar editor={editor} />
    </div>
  );
};

export default Tiptap;
