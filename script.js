const gameBox = document.getElementById("game-box");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const resultText = document.getElementById("result");
const warningText = document.getElementById("warning");
const roundResults = document.getElementById("round-results");

let startTime;
let reactionTimes = [];
let attempts = 0;
let timeoutId;
let penalty = 0;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
gameBox.addEventListener("click", handleClick);

function startGame() {
  if (attempts >= 5) return;
  startBtn.disabled = true;
  restartBtn.disabled = true;
  warningText.textContent = "";
  resultText.textContent = "Wait for the box to turn green...";
  gameBox.style.backgroundColor = "#ddd";

  const delay = Math.random() * 3000 + 1000; // Random delay between 1 and 4 seconds
  timeoutId = setTimeout(() => {
    gameBox.style.backgroundColor = "green";
    startTime = new Date().getTime();
  }, delay);
}

function handleClick() {
  if (gameBox.style.backgroundColor !== "green") {
    penalty += 500;
    warningText.textContent = "Too early! 500ms penalty added.";
    clearTimeout(timeoutId);
    startBtn.disabled = false;
    restartBtn.disabled = false;
    return;
  }

  const endTime = new Date().getTime();
  const reactionTime = endTime - startTime;
  reactionTimes.push(reactionTime);
  attempts++;

  // Display the reaction time for this round
  const roundResult = document.createElement("li");
  roundResult.textContent = `Round ${attempts}: ${reactionTime}ms`;
  roundResults.appendChild(roundResult);

  resultText.textContent = `Reaction Time: ${reactionTime}ms (Attempt ${attempts}/5)`;
  gameBox.style.backgroundColor = "#ddd";

  if (attempts < 5) {
    startGame();
  } else {
    const averageTime = (reactionTimes.reduce((a, b) => a + b, 0) + penalty) / 5;
    resultText.textContent = `Average Reaction Time: ${averageTime.toFixed(2)}ms (including penalties)`;
    startBtn.disabled = true;
    restartBtn.disabled = false;
  }
}

function restartGame() {
  reactionTimes = [];
  attempts = 0;
  penalty = 0;
  resultText.textContent = "";
  warningText.textContent = "";
  roundResults.innerHTML = ""; // Clear the round results list
  startBtn.disabled = false;
  restartBtn.disabled = true;
  gameBox.style.backgroundColor = "#ddd";
}
