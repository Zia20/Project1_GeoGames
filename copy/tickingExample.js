let timer = document.getElementById('timer');
let timeElapse = 0;
function tick() {
  timer.innerText = timeElapse;
  timeElapse++;

  }
  setInterval(tick, 1000);
  