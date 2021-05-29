const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const size = 750
const scale = 3
const resolution = size / scale
let speed = 50

let prevCells, cells

const setup = () => {
  canvas.width = size
  canvas.height = size
  context.scale(scale, scale)
  context.fillStyle = 'white'
  cells = createCells()
  prevCells = createCells()
}

const createCells = () => {
  let rows = new Array(resolution)
  for(let x = 0; x < resolution; x++) {
    let cols = new Array(resolution)
      for (let y = 0; y < resolution; y++) {
        cols[y] = false
      }
      rows[x] = cols
  }
  return rows
}

const randomCells = () => {
  for(let y = 0; y < resolution; y++) {
    for(let x = 0; x < resolution; x++) {
      if(Math.random() < 0.5) {
        cells[x][y] = true
      }
    }
  }
}

const fillColor = (x, y) => {
  
  if (!prevCells[x][y] && cells[x][y]) {
    context.fillStyle = 'lightgreen'
    context.fillRect(x, y, 1, 1)
  } else if (prevCells[x][y] && cells[x][y]) {
    context.fillStyle = 'white'
    context.fillRect(x, y, 1, 1)
  } else if (prevCells[x][y] && !cells[x][y]){
    context.fillStyle = 'orange'
    context.fillRect(x, y, 1, 1)
  } else if (!prevCells[x][y] && !cells[x][y]) {
    context.fillStyle = 'black'
    context.fillRect(x, y, 1, 1)
  }
}

const drawCells = () => {
  context.fillStyle = 'black'
  context.fillRect(0, 0, resolution, resolution)
  context.fillStyle = 'white'
  for(let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      fillColor(x, y)
    }
  }
}

const step = () => {
  prevCells = cells
  let newCells = createCells()
  for(let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const neighbours = getNeighbourCount(x, y)

      // apply rules
      if(cells[x][y] && neighbours >=2 && neighbours <=3) {
        newCells[x][y] = true
      } else if (!cells[x][y] && neighbours === 3) {
        newCells[x][y] = true
      }
    }
  }
  cells = newCells
  drawCells()
}

const getNeighbourCount = (X, Y) => {
  let count = 0
  for(let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      // edge cases
      if(x === 0 && y === 0 || X + x < 0|| X + x > resolution - 1 || Y + y < 0|| Y + y > resolution - 1) {
        continue
      }

      if(cells[X + x][Y + y]) {
         count++
      }
    }
  }
  return count
}

setup()
randomCells()
createCells()
drawCells()
setInterval(step, speed);
