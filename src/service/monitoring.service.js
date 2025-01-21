import db from './db.js';

export class GetOfflineCameras{
    async getCamerasSafeCity(){
        try{
            const query = 'SELECT IpAddress, Location, Description, IsMonitored FROM Cameras WHERE IsOnline = "0" AND Description = "SafeCity"';
            const result = await db.query(query);
            return result;

            }catch(err){
                console.error("Ошибка в методе getCamerasSafeCity: ", err)
                throw err;
            }
        }
    
    async getCamerasDefault(){
        try{
            console.log("Метод getCamerasDefault запущен");
            const query = 'SELECT IpAddress, Location, Description, IsMonitored FROM Cameras WHERE IsOnline = "0" AND Description != "SafeCity"';
            const result = await db.query(query);
            return result;
        }catch(err){
            console.error("Ошибка в методе getCamerasDefault: ", err)
            throw err;
        }
        
    }
}