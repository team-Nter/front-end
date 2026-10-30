import WorkEditor from '@/components/submission/WorkEditor/WorkEditor';

export default async function Page({ params }) {
  const { id } = await params;

  return <WorkEditor id={id} />;
}
