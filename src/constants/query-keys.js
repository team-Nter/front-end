export const queryKeys = {
  users: {
    info: () => ['auth', 'me'],
  },
  challenges: {
    all: () => ['challenges'],
    list: (params) => ['challenges', 'list', params],
  },
};
