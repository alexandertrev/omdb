import { Router } from 'express';
import PromiseRouter from 'express-promise-router';

import { searchByImdbID, searchByQuery } from '../../modules/movies/movies.controller';

const router: Router = PromiseRouter();

router.get('/', searchByQuery);
router.get('/:imdbID', searchByImdbID);

export default router;
