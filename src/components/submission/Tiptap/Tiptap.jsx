'use client';

import { EditorContent, useEditorState } from '@tiptap/react';
import { EditorToolbar } from '../EditorToolbar';
import * as styles from './Tiptap.css';

function EditorBody({ editor }) {
  const isEmpty = useEditorState({
    editor,
    selector: ({ editor }) => editor.isEmpty,
  });
  return (
    <div className={styles.body}>
      {isEmpty && (
        <span className={styles.placeholder} aria-hidden="true">
          번역 내용을 적어주세요
        </span>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default function Tiptap({ editor }) {
  if (!editor) return null;
  return (
    <div className={styles.container}>
      <EditorToolbar editor={editor} />
      <EditorBody editor={editor} />
    </div>
  );
}
