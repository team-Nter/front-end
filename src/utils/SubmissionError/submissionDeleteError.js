const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '작성자 혹은 관리자만 삭제가 가능합니다.',
  404: '챌린지 및 참여자를 찾을 수 없습니다.',
  409: '현재 이 작업물을 삭제할 수 없습니다.',
};

export function submissionDeleteError(error) {
  if (error?.status >= 500)
    return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  if (error?.status && error.message) return error.message;
  return ERROR_MESSAGES[error?.status] ?? '작업물을 삭제하지 못했습니다.';
}
