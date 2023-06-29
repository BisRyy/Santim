// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  donations: path(ROOTS_DASHBOARD, '/donations'),
  one: path(ROOTS_DASHBOARD, '/one'),
  two: path(ROOTS_DASHBOARD, '/two'),
  three: path(ROOTS_DASHBOARD, '/three'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
  },
  donation: {
    root: path(ROOTS_DASHBOARD, '/donation'),
    four: path(ROOTS_DASHBOARD, '/donation/four'),
    five: path(ROOTS_DASHBOARD, '/donation/five'),
    six: path(ROOTS_DASHBOARD, '/donation/six'),
  },
};
