import { Console } from 'console';
import db from './db.js';

export class GetOfflineCameras {
    async getCamerasSafeCity() {
        try {
            const query = 'SELECT IpAddress, Location, Description, IsMonitored FROM Cameras WHERE IsOnline = "0" AND Description = "SafeCity"';
            const result = await db.query(query);

            return result;
        } catch (err) {
            console.error("Ошибка в методе getCamerasSafeCity: ", err);
            throw err;
        }
    }

    async getCamerasDefault() {
        try {
            console.log("Метод getCamerasDefault запущен");
            const query = 'SELECT IpAddress, Location, Description, IsMonitored FROM Cameras WHERE IsOnline = "0" AND Description != "SafeCity"';
            const result = await db.query(query);

            return result;
        } catch (err) {
            console.error("Ошибка в методе getCamerasDefault: ", err);
            throw err;
        }
    }

    async getCamerasCountSafeCity(){
        try{
            const queryOnlineCount = 'SELECT COUNT(*) FROM Cameras WHERE IsOnline="1" AND Description = "SafeCity"';
            const queryOfflineCount = 'SELECT COUNT(*) FROM Cameras WHERE IsOnline="0" AND Description = "SafeCity"';

            const [resultOnline, resultOffline] = await Promise.all([
                db.query(queryOnlineCount),
                db.query(queryOfflineCount)
            ]);

            return {
                onlineCount: resultOnline,
                offlineCount: resultOffline
            };
        }catch(err){
            console.error("Ошибка в методе getCamerasCountSafeCity: ", err);
            throw err;
        }
    }
    async defaultCount(){
       try{
            const queryOnlineCount = 'SELECT COUNT(*) FROM Cameras WHERE IsOnline="1" AND Description != "SafeCity"';
            const queryOfflineCount = 'SELECT COUNT(*) FROM Cameras WHERE IsOnline="0" AND Description != "SafeCity"';

            const [resultOnline, resultOffline] = await Promise.all([
                db.query(queryOnlineCount),
                db.query(queryOfflineCount)
            ]);

            return {
                onlineCount: resultOnline,
                offlineCount: resultOffline
            };
       }catch(err){
            console.error("Ошибка в методе getCamerasDefault: ", err);
            throw err;
       }
    }
}
