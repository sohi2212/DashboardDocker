import db from './db.js';

export const getSearchResults = async(req, res) => {
    const ip = req.body.query;
    try{
        console.log("ВЫПОЛНЯЕТСЯ ЗАПРОС!")
        const result = await db.query(`SELECT * FROM Cameras WHERE IpAddress = "${ip}"`);
        res.json(result);
        console.log(result);
    }catch(err){
        res.status(500).json({ error: "Ошибка запроса"})
    }
}