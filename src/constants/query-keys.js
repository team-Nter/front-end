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
    myLists: (userId, params) => ['challenges', 'my', 'list', userId, params],
    myList: (params) => ['challenges', 'my', 'list', params],
    myDetail: (userId, challengeId) => [
      'challenges',
      'my',
      'detail',
      userId,
      String(challengeId),
    ],
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
