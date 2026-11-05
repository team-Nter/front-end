import { Container } from '@/components/layout/Container';

export default function EditorLayout({ children }) {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
}
