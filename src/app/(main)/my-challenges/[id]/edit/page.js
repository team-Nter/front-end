import { MyChallengeEdit } from '@/components/challenge/MyChallengeEdit';

export default async function Page({ params }) {
  const { id } = await params;

  return <MyChallengeEdit challengeId={id} />;
}
