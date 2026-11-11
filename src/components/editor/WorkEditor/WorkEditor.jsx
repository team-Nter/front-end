'use client';

import { Input } from '../Input';
import { Tiptap } from '../Tiptap';

export default function WorkEditor({
  title,
  onTitleChange,
  editor,
  isLoading = false,
}) {
  return (
    <div inert={isLoading} aria-busy={isLoading}>
      <Input
        title={title}
        onChange={(event) => onTitleChange(event.target.value)}
      />
      <Tiptap editor={editor} />
    </div>
  );
}
