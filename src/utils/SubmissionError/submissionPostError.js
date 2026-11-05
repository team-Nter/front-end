const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '챌린지 참여자만 작업물을 제출할 수 있습니다.',
  404: '존재하지 않는 작업물입니다.',
  409: '이미 존재하는 작업물입니다.',
};

export function postSubmissonErrorMessage(error) {
  return (
    ERROR_MESSAGES[error?.status] ??
    (error?.status >= 500
      ? '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      : error?.message || '작업물을 저장하지 못했습니다.')
  );
}
