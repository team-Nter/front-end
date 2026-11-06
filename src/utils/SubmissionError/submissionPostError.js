const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '챌린지 참여자만 작업물을 제출할 수 있습니다.',
  404: '챌린지를 찾을 수 없습니다.',
  409: '현재 이 챌린지에 작업물을 제출할 수 없습니다.',
};

export function postSubmissionErrorMessage(error) {
  if (error?.status && error.message) return error.message;
  if (error?.status >= 500) {
    return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  return ERROR_MESSAGES[error?.status] ?? '작업물을 제출하지 못했습니다.';
}
