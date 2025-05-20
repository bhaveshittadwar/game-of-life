const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const { scale } = responsive() // size might not be needed directly
let rowsInput, colsInput;
let numRows, numCols;
let speed = 50
let seeColors = false
let isGameRunning = false;
let simulation; // Will be initialized by startGame()

let prevCells, cells

const setup = () => {
  rowsInput = document.getElementById('rows');
  colsInput = document.getElementById('cols');

  numRows = parseInt(rowsInput.value);
  numCols = parseInt(colsInput.value);

  canvas.width = numCols * scale;
  canvas.height = numRows * scale;
  context.scale(scale, scale);
  context.fillStyle = 'white'; // Default fill style

  cells = createCells();
  prevCells = createCells(); // Initialize prevCells to the same empty state
  drawCells(); // Draw the initial empty grid
}

const createCells = () => {
  // Ensure numRows and numCols are set before calling this
  if (typeof numRows === 'undefined' || typeof numCols === 'undefined') {
    // Fallback or error, though setup should handle this
    console.error("numRows or numCols not initialized for createCells");
    // Default to a small grid if not set, though this indicates a logic flow issue
    numRows = 10; 
    numCols = 10;
  }
  let arr = new Array(numCols);
  for (let x = 0; x < numCols; x++) {
    let colData = new Array(numRows);
    for (let y = 0; y < numRows; y++) {
      colData[y] = false;
    }
    arr[x] = colData;
  }
  return arr;
}

// randomCells function is removed as per requirements

const fillColor = (x, y) => {
  // This function's logic for coloring based on prevCells vs cells remains,
  // but it will be called by drawCells which now iterates with numCols/numRows.
  if (!prevCells[x][y] && cells[x][y]) { // Born
    context.fillStyle = 'lightgreen';
  } else if (prevCells[x][y] && cells[x][y]) { // Survived
    context.fillStyle = 'white';
  } else if (prevCells[x][y] && !cells[x][y]){ // Died
    context.fillStyle = 'orange';
  } else { // Empty
    context.fillStyle = 'black';
  }
  context.fillRect(x, y, 1, 1);
}

const drawCells = () => {
  // Clear the canvas with black background
  context.fillStyle = 'black';
  context.fillRect(0, 0, numCols, numRows); // Use numCols and numRows for drawing area

  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      if (seeColors) {
        fillColor(x, y);
      } else {
        if (cells[x][y]) {
          context.fillStyle = 'white';
          context.fillRect(x, y, 1, 1);
        }
      }
    }
  }
}

const step = () => {
  if (!isGameRunning) return; // Only step if game is running

  // Deep copy current cells to prevCells before modifying cells
  // This is crucial for correct state comparison in fillColor and rules logic
  prevCells = JSON.parse(JSON.stringify(cells));

  let newCells = createCells(); // Create a new blank grid structure
  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      const neighbours = getNeighbourCount(x, y);

      // Apply Game of Life rules
      if (cells[x][y] && (neighbours === 2 || neighbours === 3)) {
        newCells[x][y] = true; // Cell survives
      } else if (!cells[x][y] && neighbours === 3) {
        newCells[x][y] = true; // Cell is born
      } else {
        newCells[x][y] = false; // Cell dies or stays dead
      }
    }
  }
  cells = newCells;
  drawCells();
}

const getNeighbourCount = (X, Y) => {
  let count = 0;
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      if (xOffset === 0 && yOffset === 0) {
        continue;
      }

      let newX = X + xOffset;
      let newY = Y + yOffset;

      // Check bounds using numCols and numRows
      if (newX >= 0 && newX < numCols && newY >= 0 && newY < numRows) {
        if (cells[newX][newY]) { // Use current 'cells' state for neighbour count
          count++;
        }
      }
    }
  }
  return count;
}

const handleCellClick = (event) => {
  if (isGameRunning) return; // Don't allow editing if game is running

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const col = Math.floor(x / scale);
  const row = Math.floor(y / scale);

  if (col >= 0 && col < numCols && row >= 0 && row < numRows) {
    cells[col][row] = !cells[col][row];
    // Update prevCells as well if we want seeColors to reflect this manual change immediately
    // or ensure drawCells correctly handles the state for initial drawing.
    // For simplicity, manual toggle directly affects 'cells'.
    // prevCells will be updated when 'step' is called.
    drawCells();
  }
}

const startGame = () => {
  if (isGameRunning) return; // Prevent multiple starts
  isGameRunning = true;
  // Optionally disable row/col inputs here or in controls.js
  // rowsInput.disabled = true;
  // colsInput.disabled = true;
  
  // prevCells should be a snapshot of the manually set up cells before simulation starts
  prevCells = JSON.parse(JSON.stringify(cells));
  
  simulation = setInterval(step, speed);
}

// Initial setup call
setup();
// Removed: randomCells()
// Removed: createCells() - called within setup
// Removed: drawCells() - called within setup
// Removed: let simulation = setInterval(step, speed) - moved to startGame()
