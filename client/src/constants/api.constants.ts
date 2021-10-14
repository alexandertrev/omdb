export const API_ROUTES = {
  MOVIES_SEARCH: '/api/movies/v1',
};

export enum Environment {
  Local = 'local',
}

export const SERVER_URLS = {
  [Environment.Local]: 'http://localhost:3000',
  undefined: 'http://localhost:3000',
};
