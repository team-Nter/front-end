import { Header } from '@/components/layout/Header';

export default function LandingLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
