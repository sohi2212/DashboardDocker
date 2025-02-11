const button = document.querySelector('.search-icon');
const input = document.querySelector('.search-element');
const modal = document.querySelector('.modal-cameras-info');
const closeButton = document.querySelector('.close-modal-button');


const idCamera = document.querySelector('.camera-id-modal');
const ip = document.querySelector('.header-ip');
const subnet = document.querySelector('.interface-modal');
const locationHTML = document.querySelector('.location-modal');
const desciption = document.querySelector('.description-modal');
const statusMonitoring = document.querySelector('.monitoing-status-modal');
const networkStatus = document.querySelector('.camera-status');


button.addEventListener('click', function() {
    const query = input.value;
    console.log("Кнопка работает, запрос:", query);

    fetch('/api/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: query })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        modal.style.visibility = 'visible';
        modal.showModal();
        console.log(data);

        const cameraData = data[0];

        const id = cameraData.Id;
        const ipAddress = cameraData.IpAddress;
        const locationInfo = cameraData.Location;
        const descriptionInfo = cameraData.Description;
        const onlineStatus = cameraData.IsOnline;
        const subnetInfo = cameraData.Subnet;
        const monitoring = cameraData.IsMonitored;

        idCamera.innerText = id;
        ip.innerText = ipAddress;
        locationHTML.innerText = locationInfo;
        subnet.innerText = subnetInfo;
        desciption.innerText = descriptionInfo;
        if(monitoring === 0){
            statusMonitoring.innerText = "Камера не отслеживается";
        }else{
            statusMonitoring.innerText = "Камера стоит на мониторинге"
        }
        if(onlineStatus === 0){
            networkStatus.innerText = "Offline";
            networkStatus.classList.add("red")
        }else{
            networkStatus.innerText = "Online";
            networkStatus.classList.add("green")
        }
    })
    .catch(error => console.error('Ошибка:', error));
});

closeButton.addEventListener('click', function(){
    modal.close();
    modal.style.visibility = 'hidden';
});



