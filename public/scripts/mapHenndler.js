const mapOpen = document.querySelector('.map-icon');
const modalMap = document.querySelector('.modal-map');
const mapClose = document.querySelector('.closeMap');
const map = L.map('map').setView([55.910251, 36.860714], 10);
const markerForm = document.getElementById('markerForm');

const initMap = () => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Обработчик кликов по карте
    map.on('click', function(e) {
        showMarkerForm(e.latlng);
    });

    // Загрузка существующих меток
    loadMarkers();
};

const loadMarkers = () => {
    fetch('/api/camerasMap')
        .then(response => response.json())
        .then(data => {
            data.forEach(markerData => {
                const marker = L.marker([markerData.lat, markerData.lng]).addTo(map);
                marker.bindPopup(`<b>${markerData.ip}</b><br>${markerData.description}`);
            });
        })
        .catch(error => console.error('Error loading markers:', error));
};

const showMarkerForm = (latlng) => {
    markerForm.style.display = 'block';

    
    const mapContainer = document.getElementById('map');
    const centerX = mapContainer.clientWidth / 2;
    const centerY = mapContainer.clientHeight / 2;

    
    markerForm.style.left = `${centerX - markerForm.clientWidth / 2}px`;
    markerForm.style.top = `${centerY - markerForm.clientHeight / 2}px`;

    markerForm.dataset.latlng = JSON.stringify(latlng);

    document.getElementById('saveMarkerBtn').onclick = () => saveMarker(latlng);
    document.getElementById('cancelMarkerBtn').onclick = hideMarkerForm;
};

const hideMarkerForm = () => {
    markerForm.style.display = 'none';
    document.getElementById('ip').value = '';
    document.getElementById('description').value = '';
};

const saveMarker = (latlng) => {
    const ip = document.getElementById('ip').value;
    const description = document.getElementById('description').value;

    fetch('/api/camerasMap/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lat: latlng.lat,
            lng: latlng.lng,
            ip: ip,
            description: description
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            const marker = L.marker([data.lat, data.lng]).addTo(map);
            marker.bindPopup(`<b>${data.ip}</b><br>${data.description}`);
            hideMarkerForm();
        } else {
            console.error('Error saving marker:', data.error);
        }
    })
    .catch(error => console.error('Error saving marker:', error));
};

initMap();

mapOpen.addEventListener('click', function(){
    modalMap.showModal();
    setTimeout(() => {
        map.invalidateSize();
    }, 300);
});

mapClose.addEventListener('click', function(){
    modalMap.close();
});
