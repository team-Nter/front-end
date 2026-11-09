const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  401: '로그인이 필요합니다.',
  403: '접근 권한이 없습니다.',
  404: '해당 챌린지의 참여 정보를 찾을 수 없습니다.',
};

export function getSubmissionDraftError(error) {
  if (error?.status >= 500) {
    return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }

  if (ERROR_MESSAGES[error?.status]) {
    return ERROR_MESSAGES[error.status];
  }

  if (error?.status >= 400 && error.status < 500 && error.message) {
    return error.message;
  }

  return '임시저장한 글을 불러오지 못했어요.';
}
