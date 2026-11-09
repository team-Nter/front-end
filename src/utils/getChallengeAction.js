// 챌린지 상세 버튼 상태
// 위에서부터 검사하며, 먼저 걸린 조건이 우선 돼요.
// 순서가 곧 규칙이라 수정시 주의가 필요해요.
// me: undefined(확인 중) / null(비로그인) / 사용자 객체(로그인)

export function getChallengeAction(challenge, me) {
  if (me === undefined) return 'loading';
  if (me?.role === 'ADMIN') return 'admin';
  if (challenge.mySubmissionId) return 'viewSubmission';
  if (new Date(challenge.deadlineAt) <= new Date()) return 'closed';
  if (challenge.myParticipation) return 'continue';
  if (challenge.participations >= challenge.maxParticipants) return 'full';
  if (!me) return 'login';
  return 'join';
}
