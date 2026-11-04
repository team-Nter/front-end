const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '작업물을 조회할 권한이 없습니다.',
  404: '존재하지 않는 작업물입니다.',
};

export default function SubmissionError({ error, retry }) {
  const status = error.status;
  const message =
    (status === 404 ? error.message : ERROR_MESSAGES[status]) ??
    (status >= 500
      ? '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      : '작업물을 불러오지 못했습니다.');
  const canRetry = ![400, 401, 403, 404].includes(status);

  return (
    <div role="alert">
      <p>{message}</p>
      {canRetry && (
        <button type="button" onClick={retry}>
          다시 시도
        </button>
      )}
    </div>
  );
}
