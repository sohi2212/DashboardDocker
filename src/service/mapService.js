import mysql from 'mysql2';

const dbConfig = {
    host: "192.168.17.32",
    port: "3306",
    user: "monitoringAdm",
    password: "Dimok22123",
    database: "Monitoring"
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
