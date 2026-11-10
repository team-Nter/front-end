import { MyChallengeDetail } from '@/components/challenge/MyChallengeDetail';

export default async function Page({ params }) {
  const { id } = await params;

  return <MyChallengeDetail challengeId={id} />;
}
