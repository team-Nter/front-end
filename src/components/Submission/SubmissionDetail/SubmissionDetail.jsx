import { useSubmission } from '@/hooks/useSubmissions';

export function SubmissionDetail({ submissionId }) {
  const { data: submission } = useSubmission(submissionId);
  // 차후 challenge 부분 api 작성되면 추가 작성될 예정

  const { title, content, updatedAt, author, likeCount } = submission;
  const { nickname } = author;
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <p>{nickname}</p>
        <p>{likeCount}</p>
        <p>{updatedAt}</p>
      </div>
      <section>{content}</section>
    </div>
  );
}
