import { getCamerasOnMap, addCameraOnMap } from "../service/mapService.js";

export const getCamerasControllerMap = async (req, res) =>{
    try{
        const cameras = await getCamerasOnMap();
        res.json(cameras);
    }catch(error){
        console.error('Ошибка при получении данных для карты: ' + error)
        res.status(500).send(error);
    };
};

export const addCameraControllerMap = async (req, res) =>{
    try{
        const result = await addCameraOnMap(req.body);
        res.json(result);
    }catch(error){
        console.error("Ошибка при добавлении данных:", error);
        res.status(500).send(error);
    };
};