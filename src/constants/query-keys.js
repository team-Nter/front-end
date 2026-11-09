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
    myList: (params) => ['challenges', 'my', 'list', params],
    myDetail: (challengeId) => [
      'challenges',
      'my',
      'detail',
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
  submissionDraft: {
    detail: (challengeId, userId) => [
      'submissionDraft',
      'detail',
      challengeId,
      userId,
    ],
  },
};
