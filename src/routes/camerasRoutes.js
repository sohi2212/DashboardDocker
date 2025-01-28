import express from 'express';
import { getCamerasSafeCity, getCamerasDefault, getCamerasCountDefault, getCamerasCountSafeCity } from '../controllers/camerasController.js'

const router = express.Router();

//SafeCity
router.get('/cameras', getCamerasSafeCity);
router.get('/camerasCount', getCamerasCountSafeCity);

//Default
router.get('/defaultCameras', getCamerasDefault);
router.get('/defaultCamerasCount', getCamerasCountDefault)


export default router;
