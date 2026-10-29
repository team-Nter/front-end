import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
}
