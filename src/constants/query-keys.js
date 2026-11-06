export const queryKeys = {
  participations: {
    detail: (challengeId, userId) => [
      'participations',
      'detail',
      challengeId,
      userId,
    ],
  },
  users: {
    info: () => ['auth', 'me'],
  },
  challenges: {
    all: () => ['challenges'],
    my: () => ['challenges', 'my'],
    list: (params) => ['challenges', 'list', params],
  },
  submissions: {
    list: (challengeId, page, pageSize) => [
      'submissions',
      'list',
      challengeId,
      page,
      pageSize,
    ],
    detail: (submissionId) => ['submissions', 'detail', submissionId],
  },
};
