import { GetOfflineCameras } from '../service/monitoringService.js';

const cameraService = new GetOfflineCameras();

export const getCamerasSafeCity = async (req, res) => {
    try {
        const dataSafeCity = await cameraService.getCamerasSafeCity();
        res.json(dataSafeCity);
    } catch (error) {
        console.error("Ошибка запроса к /api/cameras:", error);
        res.status(500).send(error);
    }
};

export const getCamerasDefault = async (req, res) => {
    try {
        const data = await cameraService.getCamerasDefault();
        res.json(data);
    } catch (error) {
        console.error("Ошибка запроса к /api/defaultCameras:", error);
        res.status(500).send(error);
    }
};
