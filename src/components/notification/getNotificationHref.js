export function getNotificationHref({ type, challengeId }) {
  if (!challengeId) return null;
  if (type === 'CHALLENGE_REJECTED') return `/my-challenges/${challengeId}`;
  return `/challenges/${challengeId}`;
}