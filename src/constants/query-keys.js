export const queryKeys = {
  users: {
    info: () => ['auth', 'me'],
  },
  feedbacks: {
    list: (submissionId, pageSize) => [
      'feedbacks',
      'list',
      submissionId,
      pageSize,
    ],
  },
};
