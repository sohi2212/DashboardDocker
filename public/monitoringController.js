document.addEventListener('DOMContentLoaded', async() => {
    //выгрузка камер SafeCity
    try {
        const resSafeCity = await fetch("/api/cameras");
        if (!resSafeCity.ok) {
            throw new Error('Ошибка ответа');
        }
        const data = await resSafeCity.json();

        const cardResponse = await fetch("../src/Views/camerasCard.html");
        if (!cardResponse.ok) {
            throw new Error("Ошибка подгрузки карточки");
        }
        const card = await cardResponse.text();

        const tableBodies = document.querySelectorAll(".table-card");
        tableBodies.forEach(tableBody => {
            if (Array.isArray(data)) {
                data.forEach(camera => {
                    let cardHTML = card
                        .replace("{{IpAddress}}", camera.IpAddress)
                        .replace("{{Description}}", camera.Description)
                        .replace("{{Location}}", camera.Location) 
                        .replace("{{IsMonitored}}", camera.IsMonitored ? "✅" : "❌");

                    const row = document.createElement('tr');
                    row.innerHTML = cardHTML;
                    tableBody.appendChild(row);
                });
            } else {
                console.log("Данные не являются массивом!");
            }
        });
    } catch (error) {
        console.error("Ошибка: ", error);
    }


    //Выгрузка стандартных камер
    try {
        const res = await fetch('/api/defaultCameras');
        if (!res.ok) {
            console.log("Ошибка подключения к api");
        }

        const data = await res.json();

        const cardResponse = await fetch("../src/Views/camerasCard.html");
        if (!cardResponse.ok) {
            throw new Error("Ошибка подгрузки карточки");
        }

        const card = await cardResponse.text();
        const tableBodies = document.querySelectorAll(".table-card-default");
        tableBodies.forEach(tableBody => {
            if (Array.isArray(data)) {
                data.forEach(camera => {
                    let cardHTML = card
                        .replace("{{IpAddress}}", camera.IpAddress)
                        .replace("{{Description}}", camera.Description)
                        .replace("{{Location}}", camera.Location)
                        .replace("{{IsMonitored}}", camera.IsMonitored ? "✅" : "❌");

                    const row = document.createElement('tr');
                    row.innerHTML = cardHTML;
                    tableBody.appendChild(row);
                });
            } else {
                console.log("Данные не являются массивом1111!");
                console.log(data);
            }
        });
    } catch (error) {
        console.error("Ошибка: ", error);
    }
    //CountSafeCity
    try{
        const res = await fetch("/api/camerasCount")
        if(!res.ok){
            console.log("Ошибка подключения к api");
        }
        const data = await res.json();

        const safeCityCountOffline = document.querySelector('.count-safe-city');
        const safeCityCountOnline = document.querySelector('.online-count-safecity');

        if(safeCityCountOffline){
            safeCityCountOffline.innerText = data.offlineCount[0]["COUNT(*)"];
        }else{
            console.log("Элемент Count не найден");
        }

        if(safeCityCountOnline){
            safeCityCountOnline.innerText = data.onlineCount[0]["COUNT(*)"];
        }else{
            console.log("Элемент Count не найден");
        }
        

    }catch(error){
        console.error("Ошибка: ", error);
    }
    //CountDefaultCameras
    try{
        const res = await fetch("/api/defaultCamerasCount")
        if(!res.ok){
            console.log("Ошибка подключения к api");
        }
        const data = await res.json();

        const defaultCountOffline = document.querySelector('.count-default');
        const defaultCountOnline = document.querySelector('.online-count-default');

        if(defaultCountOffline){
            defaultCountOffline.innerText = data.offlineCount[0]["COUNT(*)"];
        }else{
            console.log("Элемент Count не найден");
        }

        if(defaultCountOnline){
            defaultCountOnline.innerText = data.onlineCount[0]["COUNT(*)"];
        }else{
            console.log("Элемент Count не найден");
        }
        


    }catch(error){
        console.error("Ошибка: ", error);
    }

});
