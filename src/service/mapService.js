import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const pool = mysql.createPool(dbConfig);

const queryAsync = (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (error, result) => {
        if (error) reject(error);
        resolve(result);
    });
});

// Функция для получения всех камер
export const getCamerasOnMap = async () => {
    const query = 'SELECT lat, lng, ip AS IpAddress, description FROM CamerasMap';
    return queryAsync(query);
};

// Функция для добавления новой камеры
export const addCameraOnMap = async (camera) => {
    const query = `INSERT INTO CamerasMap (lat, lng, ip, description) VALUES (?, ?, ?, ?)`;
    const { lat, lng, ip, description } = camera;
    const result = await queryAsync(query, [lat, lng, ip, description]);

    // Возвращаем добавленные данные
    return { id: result.insertId, lat, lng, ip, description };
};
