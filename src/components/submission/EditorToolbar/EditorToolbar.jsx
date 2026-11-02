import Image from 'next/image';
import { useEditorState } from '@tiptap/react';
import { Popover } from '@/components/common/Popover';
import boldIcon from '@/assets/icons/editor-bold.svg';
import italicIcon from '@/assets/icons/editor-italic.svg';
import underlineIcon from '@/assets/icons/editor-underline.svg';
import centerIcon from '@/assets/icons/editor-alignment-center.svg';
import rightIcon from '@/assets/icons/editor-alignment-right.svg';
import leftIcon from '@/assets/icons/editor-alignment-left.svg';
import bulletIcon from '@/assets/icons/editor-bullet.svg';
import numberingIcon from '@/assets/icons/editor-numbering.svg';
import coloringIcon from '@/assets/icons/editor-coloring.svg';
import * as styles from './EditorToolbar.css';

function ToolButton({ label, icon, active, onClick }) {
  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label={label}
      title={label}
      aria-pressed={active}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      <Image src={icon} alt="" width={24} height={24} />
    </button>
  );
}

export default function EditorToolbar({ editor }) {
  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive('bold'),
      italic: editor.isActive('italic'),
      underline: editor.isActive('underline'),
      heading: editor.isActive('heading', { level: 2 }),
      bulletList: editor.isActive('bulletList'),
      orderedList: editor.isActive('orderedList'),
      alignLeft: editor.isActive({ textAlign: 'left' }),
      alignCenter: editor.isActive({ textAlign: 'center' }),
      alignRight: editor.isActive({ textAlign: 'right' }),
      color: editor.getAttributes('textStyle').backgroundColor,
    }),
  });

  return (
    <div className={styles.toolbar} role="group" aria-label="본문 서식">
      <div className={styles.group}>
        <ToolButton
          label="굵게"
          icon={boldIcon}
          active={active.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolButton
          label="기울임"
          icon={italicIcon}
          active={active.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolButton
          label="밑줄"
          icon={underlineIcon}
          active={active.underline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
      </div>
      <div className={styles.group}>
        <ToolButton
          label="중앙 정렬"
          icon={centerIcon}
          active={active.alignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolButton
          label="오른쪽 정렬"
          icon={rightIcon}
          active={active.alignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
        <ToolButton
          label="왼쪽 정렬"
          icon={leftIcon}
          active={active.alignLeft}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
      </div>
      <div className={styles.group}>
        <ToolButton
          label="글머리 목록"
          icon={bulletIcon}
          active={active.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolButton
          label="번호 목록"
          icon={numberingIcon}
          active={active.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </div>
      <Popover
        align="right"
        className={styles.panel}
        trigger={
          <button
            type="button"
            className={styles.iconButton}
            aria-label="배경색 및 추가 서식"
            title="배경색 및 추가 서식"
            onMouseDown={(event) => event.preventDefault()}
          >
            <Image src={coloringIcon} alt="" width={24} height={24} />
          </button>
        }
      >
        <label className={styles.colorLabel}>
          배경색
          <input
            type="color"
            className={styles.colorInput}
            aria-label="글자 배경색"
            value={
              /^#[0-9a-f]{6}$/i.test(active.color ?? '')
                ? active.color
                : '#ffffff'
            }
            onInput={(event) =>
              // 색 선택 중에는 에디터로 포커스를 옮기지 않습니다.
              // 에디터의 기존 선택 범위에 적용하고 팝오버는 유지합니다.
              editor.commands.setBackgroundColor(event.currentTarget.value)
            }
          />
        </label>
        <button
          type="button"
          className={styles.reset}
          onClick={() => editor.commands.unsetBackgroundColor()}
        >
          배경색 제거
        </button>
      </Popover>
    </div>
  );
}
