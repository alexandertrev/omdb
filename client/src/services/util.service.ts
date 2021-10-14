import _ from 'lodash';

export const formatUrlQueryParams = (searchQuery: string): URLSearchParams =>
  new URLSearchParams(searchQuery);

export const formatRating = (rating: string): number => {
  if (_.includes(rating, '%')) {
    const [rate] = _.split(rating, '%');
    return (+rate / 100) * 5;
  } else if (_.includes(rating, '/')) {
    const [rate, from] = _.split(rating, '/');
    return (+rate / +from) * 5;
  }
  return 0;
};
