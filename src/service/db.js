import mysql from 'mysql2';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10 // Ограничение на количество подключений в пуле
};

class Database {
    constructor(config) {
        this.pool = mysql.createPool(config);
        this.pool.queryAsync = util.promisify(this.pool.query);
    }

    async query(queryString) {
        try {
            const result = await this.pool.queryAsync(queryString);
            return result;
        } catch (err) {
            console.error("Ошибка выполнения запроса: " + err);
            throw err;
        }
    }

    close() {
        this.pool.end(err => {
            if (err) {
                console.error("Ошибка при закрытии подключения: " + err);
            } else {
                console.log("Подключение успешно закрыто");
            }
        });
    }
}

const dbInstance = new Database(dbConfig);

process.on('exit', () => dbInstance.close());
process.on('SIGINT', () => {
    dbInstance.close();
    process.exit();
});

export default dbInstance;
