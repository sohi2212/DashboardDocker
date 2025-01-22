import express from 'express';
import { getCamerasSafeCity, getCamerasDefault } from '../controllers/camerasController.js'

const router = express.Router();

router.get('/cameras', getCamerasSafeCity);
router.get('/defaultCameras', getCamerasDefault);

export default router;
