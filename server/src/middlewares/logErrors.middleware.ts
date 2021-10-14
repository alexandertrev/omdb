import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.service';

export const logErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.stack);
  next(err);
};
