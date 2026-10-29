import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@/styles/reset.css.js';
import '@/styles/global.css.js';

export const metadata = {
  title: 'Docthru',
  description: '개발 문서 번역 챌린지 서비스',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
