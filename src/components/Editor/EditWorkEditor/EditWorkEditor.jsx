import { useWorkEditor } from '@/hooks/useWorkEditor';
import { WorkEditor } from '../WorkEditor';

export default function EditWorkEditor({ submission }) {
  const { title, setTitle, editor } = useWorkEditor({
    initialTitle: submission.title,

    initialContent: submission.content,
  });
  return <WorkEditor title={title} onTitleChange={setTitle} editor={editor} />;
}
