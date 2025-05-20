const seeColorsBtn = document.querySelector('.colors');
const resetBtn = document.querySelector('.reset');
const pauseBtn = document.querySelector('.pause');
const stepBtn = document.querySelector('.step');
const rowsInput = document.getElementById('rows');
const colsInput = document.getElementById('cols');
const clearGridBtn = document.querySelector('.clear-grid');
const startGameBtn = document.querySelector('.start-game');
const canvasElement = document.getElementById('canvas'); // Get reference to the canvas

let pause = false; // This 'pause' variable is for the pause button's state

seeColorsBtn.addEventListener('click', () => {
  if (seeColorsBtn.value == 'See Colors') seeColorsBtn.value = 'Stop';
  else if (seeColorsBtn.value == 'Stop') seeColorsBtn.value = 'See Colors';

  seeColorsBtn.classList.toggle('addcolor');
  seeColors = !seeColors; // Global seeColors from index.js

  // If the game is running and not paused, restart simulation to apply color change
  // If paused, just redraw. If not running, drawCells will also show current state.
  if (isGameRunning && !pause) {
    clearInterval(simulation);
    simulation = setInterval(step, speed);
  } else {
    drawCells();
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(simulation);
  isGameRunning = false; // Set game as not running (global from index.js)
  pause = false; // Reset pause state for the button

  // Re-enable setup UI
  rowsInput.disabled = false;
  colsInput.disabled = false;
  startGameBtn.disabled = false;
  clearGridBtn.disabled = false;

  // Reset and disable game controls
  pauseBtn.value = 'Pause';
  pauseBtn.disabled = true;
  stepBtn.disabled = true;

  // Call setup to reinitialize the grid based on current (or default) input values
  // setup() in index.js will call createCells() and drawCells()
  setup();
});

pauseBtn.addEventListener('click', () => {
  if (!isGameRunning) return; // Should not be clickable if game not running

  if (!pause) {
    pause = true;
    pauseBtn.value = 'Play';
    clearInterval(simulation);
    stepBtn.disabled = false;
  } else {
    pause = false;
    pauseBtn.value = 'Pause';
    // prevCells should be up-to-date from the last step or initial setup
    // Ensure simulation continues with the current state of 'cells'
    simulation = setInterval(step, speed);
    stepBtn.disabled = true;
  }
});

stepBtn.addEventListener('click', () => {
  if (isGameRunning && pause) { // Only allow step if game is running and paused
    step(); // Call global step from index.js
  }
});

canvasElement.addEventListener('click', (event) => {
  if (!isGameRunning) { // Check the global isGameRunning flag from index.js
    handleCellClick(event); // Call the global handleCellClick from index.js
  }
});

startGameBtn.addEventListener('click', () => {
  if (!isGameRunning) {
    // Update numRows and numCols from input fields before starting
    // This ensures setup() in index.js uses the latest values if changed after initial load
    // Note: setup() in index.js already reads these values.
    // If setup() is not called here, ensure numRows/numCols are up-to-date in index.js
    // or modify startGame in index.js to re-read them.
    // For now, assuming index.js handles numRows/numCols correctly before its startGame logic.
    
    startGame(); // Call the global startGame from index.js

    // Disable setup UI
    rowsInput.disabled = true;
    colsInput.disabled = true;
    startGameBtn.disabled = true;
    clearGridBtn.disabled = true;

    // Enable/disable game controls
    pauseBtn.disabled = false;
    // stepBtn is initially disabled and enabled on pause
    resetBtn.disabled = false; // Reset should always be available
  }
});

clearGridBtn.addEventListener('click', () => {
  if (!isGameRunning) {
    // Re-initialize cells to empty using numRows, numCols defined in index.js
    // setup() could also be used if we want to re-read row/col inputs, 
    // but problem asks to use createCells and drawCells.
    // Ensure numRows and numCols in index.js are current.
    // A simple clear would be:
    cells = createCells(); // Uses global numRows, numCols from index.js
    prevCells = createCells(); // Also clear prevCells to avoid coloring artifacts if seeColors is on
    drawCells(); // Redraw the cleared grid
  }
});

// Initial state for game controls
// This should run once when the script loads.
// isGameRunning is false by default in index.js
if (!isGameRunning) {
  pauseBtn.disabled = true;
  stepBtn.disabled = true;
  pauseBtn.value = 'Pause'; // Ensure correct text
}