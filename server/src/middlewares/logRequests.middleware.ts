import { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.service';

export const logRequests = (req: Request, _res: Response, next: NextFunction): void => {
  logger.title(req.method, req.originalUrl);
  next();
};
