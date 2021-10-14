import { Router } from 'express';
import PromiseRouter from 'express-promise-router';

import moviesRoutes from './movies';

const router: Router = PromiseRouter();

router.use('/movies', moviesRoutes);

export default router;
