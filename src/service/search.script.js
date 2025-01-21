const button = document.querySelector('.search-icon');
const input = document.querySelector('.search-element');

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
        console.log(data);
        // Обработка полученных данных и обновление интерфейса
    })
    .catch(error => console.error('Ошибка:', error));
});
