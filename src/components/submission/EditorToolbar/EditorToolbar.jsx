import { useEditorState } from '@tiptap/react';

export default function EditorToolbar({ editor }) {
  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive('bold'),
      heading: editor.isActive('heading', { level: 2 }),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
    }),
  });

  return (
    <div className="editor-toolbar" role="group" aria-label="본문 서식">
      <button
        type="button"
        aria-pressed={active.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>굵게</strong>
      </button>

      <button
        type="button"
        aria-pressed={active.heading}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        제목
      </button>

      <span className="toolbar-divider" aria-hidden="true" />

      <button
        type="button"
        aria-pressed={active.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        글머리 목록
      </button>

      <button
        type="button"
        aria-pressed={active.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        번호 목록
      </button>
    </div>
  );
}
