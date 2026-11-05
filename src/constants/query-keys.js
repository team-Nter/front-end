export const queryKeys = {
  users: {
    info: () => ['auth', 'me'],
  },
  challenges: {
    all: () => ['challenges'],
    my: () => ['challenges', 'my'],
  },
};
