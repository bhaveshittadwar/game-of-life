const seeColorsBtn = document.querySelector('.colors')
const resetBtn = document.querySelector('.reset')
const pauseBtn = document.querySelector('.pause')
const stepBtn = document.querySelector('.step')
let pause = false

seeColorsBtn.addEventListener('click', () => {
  if (seeColorsBtn.value == 'See Colors') seeColorsBtn.value = 'Stop'
  else if (seeColorsBtn.value == 'Stop') seeColorsBtn.value = 'See Colors'

  seeColorsBtn.classList.toggle('addcolor')
  seeColors = !seeColors
  clearInterval(simulation)
  if (!pause) simulation = setInterval(step, speed)
  else drawCells()
})

resetBtn.addEventListener('click', () => {
  clearInterval(simulation)
  // clear board
  context.fillStyle = 'black'
  context.fillRect(0, 0, resolution, resolution)
  cells = createCells()
  prevCells = createCells()
  // restart game
  randomCells()
  createCells()
  drawCells()
  if (!pause) simulation = setInterval(step, speed)
})

pauseBtn.addEventListener('click', () => {
  if (!pause) {
    pause = true
    pauseBtn.value = 'Play'
    clearInterval(simulation)
    stepBtn.disabled = false
  } else {
    pause = false
    pauseBtn.value = 'Pause'
    simulation = setInterval(step, speed)
    stepBtn.disabled = true
  }
})

stepBtn.addEventListener('click', () => {
  clearInterval(simulation)
  step()
})