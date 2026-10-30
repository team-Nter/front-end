export default function Input({ title, onChange }) {
  return (
    <input
      value={title}
      aria-label="작업물 제목"
      onChange={onChange}
      placeholder="제목"
    />
  );
}
