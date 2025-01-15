import ping from "ping"
import db from "./db.js"
import { query } from "express";


async function getSubnet(IpAddress) {
    const octets = IpAddress.split('.');

    if(octets.length !== 4){
        throw new Error("Неверный IP адресс!")
    }
    let thirdOctet = parseInt(octets[2], 10);

    if(thirdOctet > 200){
        thirdOctet -= 200;
    }else if(thirdOctet > 100){
        thirdOctet -=100;
    }

    return thirdOctet;
}

function generateIPRange(startIP){
    const start = startIP.split(".").map(num => parseInt(num, 10)); // Преобразую строку в int из 10чной системы счисления
    const range = [];

    //Создаю i равную начальному значению диапозона адресов и пока она меньше конечного значения i++
    for(let i=start[3]; i<=254; i++){

        // Объединяю все части ip в единую строку используя точку и в конце перебираю i(Т.е массив у меня сейчас выглядит так: [192, 168, 1, 1] и 0 элемент, затем первый и второй остаются как есть)
        range.push(`${start[0]}.${start[1]}.${start[2]}.${i}`);
    }
    return range; // возращаем айпишники
}

// Список диапозонов
const networks = [
    '172.20.26.2', '172.20.126.1',
    '172.20.27.2', '172.20.127.2',
    '172.20.34.2', "172.20.134.2",
    '172.20.35.2', '172.20.135.2',
    '172.20.39.2', '172.20.139.2',
    '172.20.45.2', '172.20.48.2',
    '172.20.49.2', '172.20.50.2',
    '172.20.51.2', '172.20.151.2',
    '172.20.52.2', '172.20.53.2',
    '172.20.54.2', '172.20.55.2',
    '172.20.57.2', '172.20.58.2',
    '172.20.59.2', '172.20.60.2',
    '172.20.61.2', '172.20.62.2',
    '172.20.63.2', '172.20.67.2',
    '172.20.68.2', '172.20.168.2',
    '172.21.75.2', "10.196.12.2"];

let allIPs = [];
//Генерирую при помощи функции массив в котором будут все ip адреса
networks.forEach(network =>{
    allIPs = allIPs.concat(generateIPRange(network));
})

async function pingAddress(ip) {
    let offlineIPs = [];
    const isAlive = await new Promise(resolve => {
        ping.sys.probe(ip, isAlive => {
            resolve(isAlive);
        });
    });
    if(isAlive){
        const query = `SELECT IsOnline FROM Cameras WHERE IpAddress = "${ip}";`;
        const result = await db.query(query);
        if(result.length > 0){
            if(result[0].IsOnline === 0){
                const query = `UPDATE Cameras SET IsOnline = "1" WHERE IpAddress = "${ip}";`;
                await db.query(query);
                console.log(`Камера '${ip}' сменила статус на online!`)
            }else{
                console.log(`Камера '${ip}' отвечает на запросы, статус в базе актуален!`);
            }
        }else{
            const subnet = await getSubnet(ip);
            const query = `INSERT INTO Cameras (IpAddress, Location, Description, IsOnline, Subnet, IsMonitored) VALUES ("${ip}", "unknown", "unknown", "1", "${subnet}", "1");`;
            const addResult = await db.query(query)
            console.log(`Камера с IP "${ip} успешно добавлена в базу данных!" `);
        }
    }else{
        const query = `UPDATE Cameras SET IsOnline = "0" WHERE IpAddress = "${ip}";`;
        const result = await db.query(query);
        if(result.affectedRows > 0){
            console.log(`Статус '${ip}' изменен на офлайн!`);
        }else{
            console.log(`Камера с ip '${ip}' не найдена в базе!`)
        }  
    }
}

async function pingAllAddresses() {
    for(let i = 0; i < allIPs.length; i++){
        await pingAddress(allIPs[i]);

        //await new Promise(resolve => setTimeout(resolve, 50));
    }
}

async function startPingLoop() {
    while(true){
        await pingAllAddresses();
    }
}

startPingLoop();