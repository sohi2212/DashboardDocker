import mysql from 'mysql2';
import util from 'util';

const dbConfig = {
    host: "192.168.17.32",
    port: "3306",
    user: "monitoringAdm",
    password: "Dimok22123",
    database: "Monitoring",
    connectionLimit: 10, // Ограничение на количество подключений в пуле
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
