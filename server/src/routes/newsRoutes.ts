import express from 'express';
import { getNews } from '../controllers/newsController';

const router = express.Router();

router.get('/:id', getNews);

export default router;
