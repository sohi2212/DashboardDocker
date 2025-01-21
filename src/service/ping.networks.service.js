import mysql from 'mysql2/promise';
import ping from "ping";
import pLimit from 'p-limit';

const dbConfig = {
    host: "192.168.17.32",
    port: "3306",
    user: "monitoringAdm",
    password: "Dimok22123",
    database: "Monitoring"
};

// Ограничение на количество параллельных пингов
const limit = pLimit(20); 

async function getSubnet(IpAddress) {
    const octets = IpAddress.split('.');
    if (octets.length !== 4) {
        throw new Error("Неверный IP адрес!");
    }
    let thirdOctet = parseInt(octets[2], 10);
    if (thirdOctet > 200) {
        thirdOctet -= 200;
    } else if (thirdOctet > 100) {
        thirdOctet -= 100;
    }
    return thirdOctet;
}

// Функция для генерации диапазона IP-адресов
function generateIPRange(startIP) {
    const start = startIP.split(".").map(num => parseInt(num, 10));
    const range = [];
    for (let i = start[3]; i <= 254; i++) {
        range.push(`${start[0]}.${start[1]}.${start[2]}.${i}`);
    }
    return range;
}

// Список начальных IP-адресов
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
    '172.21.75.2', "10.196.12.2"
];

let allIPs = [];
networks.forEach(network => {
    allIPs = allIPs.concat(generateIPRange(network));
});

async function pingAndProcessIP(ip, connection) {
    try {
        console.log(`Пинг IP-адреса: ${ip}`);  // Логируем каждый IP-адрес
        const isAlive = await new Promise(resolve => {
            ping.sys.probe(ip, isAlive => {
                resolve(isAlive);
            });
        });
        console.log(`IP-адрес ${ip} ${isAlive ? 'доступен' : 'недоступен'}`);

        if (isAlive) {
            const [result] = await connection.execute(`SELECT IsOnline FROM Cameras WHERE IpAddress = ?`, [ip]);
            if (result.length > 0) {
                if (result[0].IsOnline === 0) {
                    await connection.execute(`UPDATE Cameras SET IsOnline = "1" WHERE IpAddress = ?`, [ip]);
                    console.log(`Камера '${ip}' сменила статус на online!`);
                } else {
                    console.log(`Камера '${ip}' отвечает на запросы, статус в базе актуален!`);
                }
            } else {
                const subnet = await getSubnet(ip);
                if (ip.startsWith('172.20')) {
                    await connection.execute(
                        `INSERT INTO Cameras (IpAddress, Location, Description, IsOnline, Subnet, IsMonitored) VALUES (?, "unknown", "unknown", "1", ?, "1")`,
                        [ip, subnet]
                    );
                    console.log(`Камера с IP "${ip}" успешно добавлена в базу данных!`);
                } else {
                    await connection.execute(
                        `INSERT INTO Cameras (IpAddress, Location, Description, IsOnline, Subnet, IsMonitored) VALUES (?, "unknown", "SafeCity", "1", ?, "1")`,
                        [ip, subnet]
                    );
                    console.log(`Камера с IP "${ip}" успешно добавлена в базу данных (SafeCity)!`);
                }
            }
        } else {
            const [result] = await connection.execute(`UPDATE Cameras SET IsOnline = "0" WHERE IpAddress = ?`, [ip]);
            if (result.affectedRows > 0) {
                console.log(`Статус '${ip}' изменен на офлайн!`);
            } else {
                console.log(`Камера с ip '${ip}' не найдена в базе!`);
            }
        }
    } catch (error) {
        console.error(`Ошибка при обработке IP '${ip}': ${error.message}`);
    }
}

async function pingAllAddresses() {
    const connection = await mysql.createConnection(dbConfig);
    const pingPromises = allIPs.map(ip => limit(() => pingAndProcessIP(ip, connection)));
    await Promise.all(pingPromises);
    await connection.end();
}

async function startPingLoop() {
    console.log("Начало пингования адресов...");
    while (true) {
        await pingAllAddresses();
        await new Promise(resolve => setTimeout(resolve, 3000)); // Увеличиваем задержку до 3 секунд для снижения нагрузки
    }
}

startPingLoop();
