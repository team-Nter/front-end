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
