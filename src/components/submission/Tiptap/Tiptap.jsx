'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello world!</p>',
    immediatelyRender: false,
  });

  if (!editor) return null;
  return <EditorContent editor={editor} />;
};

export default Tiptap;
