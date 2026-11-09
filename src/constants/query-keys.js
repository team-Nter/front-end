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
    myLists: () => ['challenges', 'my', 'list'],
    myList: (userId, params) => ['challenges', 'my', 'list', userId, params],
    myDetail: (userId, challengeId) => [
      'challenges',
      'my',
      'detail',
      userId,
      String(challengeId),
    ],
    list: (params) => ['challenges', 'list', params],
    admin: () => ['challenges', 'admin'],
    adminLists: () => ['challenges', 'admin', 'list'],
    adminList: (userId, params) => [
      'challenges',
      'admin',
      'list',
      userId,
      params,
    ],
    adminDetail: (userId, challengeId, params) => [
      'challenges',
      'admin',
      'detail',
      userId,
      String(challengeId),
      params,
    ],
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
  submissionDraft: {
    detail: (challengeId, userId) => [
      'submissionDraft',
      'detail',
      challengeId,
      userId,
    ],
  },
};
