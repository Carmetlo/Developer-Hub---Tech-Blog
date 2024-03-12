import express from 'express';
import apiRoutes from './api/index';
import homeRoutes from './home-routes';
const router = express.Router();

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

export default router;