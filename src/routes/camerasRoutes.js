import express from 'express';
import { getCamerasSafeCity, getCamerasDefault, getCamerasCountDefault, getCamerasCountSafeCity } from '../controllers/camerasController.js'
import { getCamerasControllerMap, addCameraControllerMap} from '../controllers/camerasMapController.js';

const router = express.Router();

//SafeCity
router.get('/cameras', getCamerasSafeCity);
router.get('/camerasCount', getCamerasCountSafeCity);

//Default
router.get('/defaultCameras', getCamerasDefault);
router.get('/defaultCamerasCount', getCamerasCountDefault);

// Маршрут для получения всех камер
router.get('/camerasMap', getCamerasControllerMap);
// Маршрут для добавления новой камеры
router.post('/camerasMap/add', addCameraControllerMap);

export default router;
