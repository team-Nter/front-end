export const queryKeys = {
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
  },
};
