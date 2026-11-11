'use client';

import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { BackgroundColor, TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent } from '@tiptap/react';
import CodeBlockComponent from '@/components/editor/CodeBlockComponent/CodeblockComponent';
import { common, createLowlight } from 'lowlight';
import * as styles from './SubmissionDetail.css';

const lowlight = createLowlight(common);

export default function SubmissionDetail({ content }) {
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
    content: content,
    editable: false,
    immediatelyRender: false,
  });

  return <EditorContent className={styles.content} editor={editor} />;
}
