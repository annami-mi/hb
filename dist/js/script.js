const balloonContainer = document.getElementById("balloon-container");

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(200);
    var ml = random(50);
    var dur = random(5) + 5;
    return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
    balloonContainer.style.opacity = 1;
    for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.id = "balloon";
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
    setTimeout(() => {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.remove();
        })
    }, 500)
}

const action = document.getElementById('action');
let intervalId;

action.addEventListener("click", () => {
    clearInterval(intervalId); // Очищаем предыдущий интервал, если он был
    createBalloons(30);
    intervalId = setInterval(() => removeBalloons(), 10000);
});

const arrow = document.getElementById('arrow');

arrow.addEventListener('click', () => {
    window.scroll({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});