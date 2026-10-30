'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { EditorToolbar } from '../EditorToolbar';
import * as styles from './Tiptap.css.js';

export default function Tiptap({ editor }) {
  if (!editor) return null;
  return (
    <div className={styles.container}>
      <EditorContent editor={editor} />
      <EditorToolbar editor={editor} />
    </div>
  );
}
