import { Header } from '@/components/layout/Header';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { Container } from '@/components/layout/Container';

export default function MainLayout({ children }) {
  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <Container>{children}</Container>
    </>
  );
}
