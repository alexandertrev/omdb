import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction): void => {
  if (req.xhr) {
    res.status(500).send({ error: 'Something went wrong!' });
  } else {
    res.status(500);
    res.render('error', { error: err });
  }
};
