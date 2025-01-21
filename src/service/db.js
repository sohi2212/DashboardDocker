import mysql from 'mysql2'; 
import util from 'util';

const dbConfig = {
            host: "192.168.17.32",
            port: "3306",
            user: "monitoringAdm",
            password: "Dimok22123",
            database: "Monitoring"
};

class Database{
    constructor(config){
        this.connection = mysql.createConnection(config);
        this.connection.connect();
        this.connection.queryAsync = util.promisify(this.connection.query);
    }
    async query(queryString){
        try{
            const result = await this.connection.queryAsync(queryString);
            return result;
        }catch(err){
            console.error("Ошибка выполнения запроса: " + err);
            throw err;
        }
    }
    close(){
        this.connection.end(err => {
            if(err){
                console.error("Ошибка при закрытии подключения: " + err);
            }else{
                console.log("Подключение успешно закрыто");
            }
        })
    }

}

const dbInstance = new Database(dbConfig);

process.on('exit', () => dbInstance.close());
process.on('SIGINT', () => {
    dbInstance.close();
    process.exit();
})

export default dbInstance;