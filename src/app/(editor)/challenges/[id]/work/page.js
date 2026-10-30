import EditHeader from '@/components/submission/EditHeader/EditHeader';

export default async function Page({ params }) {
  const { id } = await params;

  return (
    <div>
      <EditHeader challengeId={id} />
    </div>
  );
}
