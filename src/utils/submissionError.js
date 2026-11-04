const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '작업물을 조회할 권한이 없습니다.',
  404: '존재하지 않는 작업물입니다.',
  409: '이미 존재하는 작업물입니다.',
};

export function getSubmissionErrorMessage(error) {
  return (
    ERROR_MESSAGES[error?.status] ??
    (error?.status >= 500
      ? '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      : error?.message || '작업물을 불러오지 못했습니다.')
  );
}
