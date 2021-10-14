import { Request, Response } from 'express';
import * as moviesService from './movies.service';

export const searchByQuery = async (req: Request, res: Response): Promise<void> => {
  const { searchTerm, page, title } = req.query as any;

  if (searchTerm) {
    const searchResult = await moviesService.movieSummaryByQuery(searchTerm, page);
    res.json(searchResult);
  } else if (title) {
    const searchResult = await moviesService.movieSummaryByTitle(title);
    res.json(searchResult);
  } else {
    res.json([]);
  }
};

export const searchByImdbID = async (req: Request, res: Response): Promise<void> => {
  const { imdbID } = req.params as any;

  if (imdbID) {
    const movie = await moviesService.movieByImdbID(imdbID);
    res.json(movie);
  } else {
    res.json({});
  }
};
