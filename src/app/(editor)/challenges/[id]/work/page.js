import { WorkEditor } from '@/components/submission/WorkEditor';

export default async function Page({ params }) {
  const { id } = await params;

  // id 불러오는 서버 부분과 WorkEditor의 클라이언트 부분의 분리르 위해 해당 방식으로 작성

  return <WorkEditor id={id} />;
}
