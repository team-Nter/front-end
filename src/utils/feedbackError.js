const ERROR_MESSAGES = {
  400: '입력 내용을 확인해 주세요.',
  401: '로그인이 필요합니다.',
  403: '이 작업을 수행할 권한이 없습니다.',
  404: '작업물 또는 피드백을 찾을 수 없습니다.',
  409: '현재 이 피드백의 요청을 처리할 수 없습니다.',
};
export function getFeedbackErrorMessage(error, action = '처리') {
  if (!error) return '';
  if (error?.status >= 500) {
    return '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  return ERROR_MESSAGES[error?.status] ?? `피드백을 ${action}하지 못했습니다.`;
}
