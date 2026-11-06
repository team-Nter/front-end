const ERROR_MESSAGES = {
  400: '잘못된 접근입니다.',
  404: '요청한 정보를 찾을 수 없습니다.',
};

export function getSubmissionErrorMessage(error) {
  if (error?.status && error.message) return error.message;
  if (error?.status >= 500) {
    return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  return ERROR_MESSAGES[error?.status] ?? '작업물을 불러오지 못했습니다.';
}
