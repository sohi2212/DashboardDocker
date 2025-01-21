import express from 'express';
import { getSearchResults } from '../controllers/search.controller.js';

const router = express.Router();

router.post('/search', getSearchResults)

export default router;