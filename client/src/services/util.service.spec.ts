import { formatRating } from './util.service';

describe('Util Service', () => {
  describe('formatRating', () => {
    test('should return formatted rating when pattern 10/100', () => {
      expect(formatRating('20/100')).toEqual(1);
    });

    test('should return formatted rating when pattern 67%', () => {
      expect(formatRating('80%')).toEqual(4);
    });

    test('should return 0 for invalid input', () => {
      expect(formatRating('text')).toEqual(0);
      expect(formatRating('10')).toEqual(0);
      expect(formatRating('%10%')).toEqual(0);
      expect(formatRating('/10/')).toEqual(0);
      expect(formatRating(null)).toEqual(0);
      expect(formatRating(undefined)).toEqual(0);
    });
  });
});
