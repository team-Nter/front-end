import { AdminChallengeDetail } from '@/components/challenge/AdminChallengeDetail';

const toText = (value) =>
  typeof value === 'string' && value ? value : undefined;

export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const { status, sort, keyword } = await searchParams;

  const filters = {
    status: toText(status)?.split(',') ?? [],
    sort: toText(sort),
    keyword: toText(keyword),
  };

  return <AdminChallengeDetail key={id} challengeId={id} filters={filters} />;
}
