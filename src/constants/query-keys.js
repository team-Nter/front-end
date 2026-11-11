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
    detail: (challengeId, userId) => [
      'challenges',
      'detail',
      String(challengeId),
      userId ?? null,
    ],
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
    detail: (challengeId) => ['challenges', 'detail', String(challengeId)],
    participants: (challengeId, params) => [
      'challenges',
      'detail',
      String(challengeId),
      'participants',
      params,
    ],
  },
  submissions: {
    lists: (challengeId) => ['submissions', 'list', String(challengeId)],
    list: (challengeId, page, pageSize) => [
      'submissions',
      'list',
      String(challengeId),
      page,
      pageSize,
    ],
    detail: (submissionId) => ['submissions', 'detail', String(submissionId)],
  },
  submissionDraft: {
    detail: (challengeId, userId) => [
      'submissionDraft',
      'detail',
      String(challengeId),
      userId,
    ],
  },

  feedbacks: {
    lists: (submissionId) => ['feedbacks', 'list', String(submissionId)],
    list: (submissionId, pageSize) => [
      'feedbacks',
      'list',
      String(submissionId),
      pageSize,
    ],
  },

  notifications: {
    all: (userId) => ['notifications', userId],
    list: (userId, params) => ['notifications', userId, 'list', params],
  },
};
