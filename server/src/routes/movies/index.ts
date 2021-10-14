import { Router } from 'express';
import PromiseRouter from 'express-promise-router';

import v1Routes from './v1';

const router: Router = PromiseRouter();

router.use('/v1', v1Routes);

export default router;
