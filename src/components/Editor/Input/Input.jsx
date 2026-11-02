import * as styles from './Input.css';

export default function Input({ title, onChange }) {
  return (
    <input
      className={styles.input}
      value={title}
      aria-label="작업물 제목"
      onChange={onChange}
      placeholder="제목을 입력해주세요"
    />
  );
}
