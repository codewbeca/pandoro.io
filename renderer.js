let timer;
let remainingTime; // in seconds
let isRunning = false;
let currentMode = 'study';

// Only one input for Study duration
const studyInput = document.getElementById('study-duration');

// Timer display elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

// Control buttons
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Additional buttons: Close and Theme Toggle
const closeBtn = document.getElementById('close-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');

// Update the timer display in MM:SS format
function updateDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  minutesDisplay.textContent = String(mins).padStart(2, '0');
  secondsDisplay.textContent = String(secs).padStart(2, '0');
}

// Set mode and initialize remainingTime
function setMode(mode) {
  currentMode = mode;
  
  // Update active mode button styling
  modeButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  if (mode === 'study') {
    remainingTime = parseInt(studyInput.value, 10) * 60;
  } else if (mode === 'shortBreak') {
    remainingTime = 5 * 60;  // Fixed 5 minutes
  } else if (mode === 'longBreak') {
    remainingTime = 10 * 60; // Fixed 10 minutes
  }
  
  // Update display immediately
  updateDisplay(remainingTime);
}

// Start the timer countdown
function startTimer() {
  if (!isRunning && remainingTime > 0) {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timer = setInterval(() => {
      remainingTime--;
      updateDisplay(remainingTime);
      
      if (remainingTime <= 0) {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        alert('Time is up!');
      }
    }, 1000);
  }
}

// Pause the timer countdown
function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

// Reset the timer to the initial value for the current mode
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  setMode(currentMode);
}

// Event listeners for control buttons
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Update Study duration if changed and timer is not running
studyInput.addEventListener('change', () => {
  if (!isRunning) {
    setMode('study');
  }
});

// Handle mode button clicks
modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!isRunning) {
      setMode(btn.dataset.mode);
    }
  });
});

// Close the app window when close button is clicked
closeBtn.addEventListener('click', () => {
  window.close();
});

// Toggle dark/light mode on theme toggle click
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Update icon based on mode
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.textContent = '🌙';
  } else {
    themeIcon.textContent = '☀️';
  }
});

// Initialize the timer to Study mode on load
window.onload = () => {
  setMode('study');
};
