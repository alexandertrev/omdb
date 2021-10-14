import { formatSubTitle } from './moviePage.helper';

describe('MoviesPage helper', () => {
  describe('formatSubTitle', () => {
    test('should return formatted title for valid input', () => {
      expect(
        formatSubTitle({
          Rated: 'R',
          Runtime: '102 min',
          Genre: 'Action, Crime, Thriller',
          Released: '23 Dec 1971',
          Country: 'USA',
        }),
      ).toEqual('R | 102 min | Action, Crime, Thriller | 23 Dec 1971 (USA)');

      expect(
        formatSubTitle({
          Rated: 'R',
          Runtime: 'N/A',
          Released: '23 Dec 1971',
          Country: 'USA',
        }),
      ).toEqual('R | 23 Dec 1971 (USA)');
    });

    test('should return 0 for invalid input', () => {
      expect(formatSubTitle({})).toEqual('');
      expect(formatSubTitle(null)).toEqual('');
      expect(formatSubTitle(undefined)).toEqual('');
    });
  });
});
