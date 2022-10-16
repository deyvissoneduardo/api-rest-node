import { Router } from 'express';
import homeController from '../controller/HomeController';

const router = new Router();

router.get('/', homeController.store);

export default router;
