'use client';

import { ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { BackgroundColor, TextStyle } from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { EditorContent } from '@tiptap/react';
import CodeBlockComponent from '@/components/Editor/CodeBlockComponent/CodeblockComponent';
import { useSubmission } from '@/hooks/useSubmissions';
import { common, createLowlight } from 'lowlight';
import Image from 'next/image';
import profileUser from '@/assets/icons/profile-user.svg';
import * as styles from './SubmissionDetail.css';
import { formatDate } from '@/utils';

const lowlight = createLowlight(common);

export function SubmissionDetail({ submissionId }) {
  const { data: submission } = useSubmission(submissionId);
  // 차후 challenge 부분 api 작성되면 추가 작성될 예정
  const { title, content, updatedAt, author, likeCount } = submission;

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

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.metadata}>
        <div className={styles.author}>
          <Image src={profileUser} alt="" width={24} height={24} />
          <span className={styles.nickname}>
            {author?.nickname ?? '알 수 없는 사용자'}
          </span>
        </div>
        <span
          className={styles.likes}
          aria-label={`좋아요 ${likeCount ?? 0}개`}
        >
          <span className={styles.heart} aria-hidden="true">
            ♡
          </span>
          {(likeCount ?? 0).toLocaleString('ko-KR')}
        </span>
        <time className={styles.date} dateTime={updatedAt}>
          {formatDate(updatedAt, '/')}
        </time>
      </div>
      <EditorContent className={styles.content} editor={editor} />
    </article>
  );
}
