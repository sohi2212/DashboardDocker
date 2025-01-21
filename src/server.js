import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import searchRoutes from './routes/searchRoutes.js';
import camerasRoutes from './routes/camerasRoutes.js';
import './service/ping.networks.service.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/src', express.static(path.join(__dirname, '../src')));

// Middleware для обработки JSON-данных
app.use(express.json());

// Маршруты для получения статических файлов
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Подключение маршрутов
app.use('/api', searchRoutes);
app.use('/api', camerasRoutes);

app.listen(5080, () => {
    console.log('Поехала шайтан машина!');
});
