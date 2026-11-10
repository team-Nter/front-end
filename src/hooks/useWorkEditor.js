'use client';

import { useState } from 'react';
import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { BackgroundColor, TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { CodeBlock } from '@/components/Editor/CodeBlockComponent';

const lowlight = createLowlight(common);

// 초기값이 준비된 뒤 마운트하고, 다른 작성물로 전환할 때는 key를 변경합니다.
export function useWorkEditor({ initialTitle = '', initialContent = '' } = {}) {
  const [title, setTitle] = useState(initialTitle);
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
    content: initialContent,
    immediatelyRender: false,
  });

  return { title, setTitle, editor };
}
