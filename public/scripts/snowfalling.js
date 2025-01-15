const snow = document.querySelector('.snow')
const snowflakes = document.querySelectorAll('.snow__flake')

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min
}

function getRndFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1)
}

snowflakes.forEach(snowflake => {
  snowflake.style.fontSize = getRndFloat(0.7, 1.5) + 'em'
  snowflake.style.animationDuration = getRndInteger(20, 30) + 's'
  snowflake.style.animationDelay = getRndInteger(-1, snowflakes.length / 2) + 's'
})
