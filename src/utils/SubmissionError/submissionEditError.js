const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '작성자 혹은 관리자만 수정이 가능합니다.',
  404: '챌린지 및 참여자를 찾을 수 없습니다.',
  409: '현재 이 작업물을 수정할 수 없습니다.',
};

export function submissionEditError(error) {
  if (error?.status && error.message) return error.message;
  if (error?.status >= 500)
    return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  return ERROR_MESSAGES[error?.status] ?? '작업물을 수정하지 못했습니다.';
}
