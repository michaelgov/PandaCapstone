import express from 'express';
let router = express.Router();

import resourcesRouter from './controllers/resources.js';
import citationsRouter from './controllers/citations.js';

router.use('/resources', resourcesRouter);
router.use('/citations', citationsRouter);

export default router;