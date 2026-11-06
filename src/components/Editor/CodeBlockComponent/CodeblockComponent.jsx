'use client';

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import * as styles from './CodeBlockComponent.css';

export default function CodeBlockComponent({
  node,
  updateAttributes,
  extension,
}) {
  // 무슨 언어 썼는지 기록하기
  const languages = extension.options.lowlight.listLanguages();
  const currentLanguage = node.attrs.language;
  const options =
    currentLanguage && !languages.includes(currentLanguage)
      ? [...languages, currentLanguage]
      : languages;
  return (
    <NodeViewWrapper className={styles.container}>
      <div className={styles.header} contentEditable={false}>
        <span>코드</span>
        <select
          className={styles.languageSelect}
          aria-label="코드 언어"
          contentEditable={false}
          value={node.attrs.language ?? ''}
          onChange={(e) =>
            updateAttributes({ language: e.target.value || null })
          }
        >
          <option value="">자동 감지</option>
          {options.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
}
