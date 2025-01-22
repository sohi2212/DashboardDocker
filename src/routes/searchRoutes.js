import express from 'express';
import { getSearchResults } from '../service/searchService.js';

const router = express.Router();

router.post('/search', getSearchResults)

export default router;