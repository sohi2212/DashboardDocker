import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GetOfflineCameras } from './service/monitoring.service.js';
import './service/ping.networks.service.js';
import searchRoutes from './routes/searchRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/src', express.static(path.join(__dirname, '../src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/api/cameras', async (req, res) => {
    const cameraService = new GetOfflineCameras();
    try {
        console.log("Запрос к /api/cameras");
        const dataSafeCity = await cameraService.getCamerasSafeCity();
        res.json(dataSafeCity);
    } catch (error) {
        console.error("Ошибка запроса к /api/cameras:", error);
        res.status(500).send(error);
    }
});

app.get('/api/defaultCameras', async(req, res) => {
    const cameraService = new GetOfflineCameras();
    try{
        const data = await cameraService.getCamerasDefault();
        res.json(data);
    }catch{
        console.log("Ошибка к запросу: " + error)
        res.status(500).send(error)
    }
});

app.use(express.json());

app.use('/api', searchRoutes); // Использование маршрутов

app.listen(5080, () => {
    console.log('Поехала шайтан машина!');
});
