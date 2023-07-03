let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const boxes = document.querySelectorAll('.box');
const boxTexts = document.querySelectorAll('.boxtext');
const turnInfo = document.querySelector('.game-info h1');

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener('click', () => makeMove(i));
}

function makeMove(boxIndex) {
  if (gameState[boxIndex] !== '' || !gameActive) {
    return;
  }

  gameState[boxIndex] = currentPlayer;
  boxTexts[boxIndex].textContent = currentPlayer;
  boxTexts[boxIndex].classList.add(currentPlayer);

  if (checkWin()) {
    endGame(false);
    alert(`Player ${currentPlayer} wins!`);
  } else if (checkDraw()) {
    endGame(true);
    alert("It's a draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnInfo.textContent = `Turn for ${currentPlayer}`;
  }
}

function checkWin() {
  for (let condition of winningConditions) {
    let [a, b, c] = condition;
    if (
      gameState[a] !== '' &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !gameState.includes('');
}

function endGame(draw) {
  gameActive = false;
  if (draw) {
    turnInfo.textContent = "It's a draw!";
  } else {
    turnInfo.textContent = `Player ${currentPlayer} wins!`;
  }
}

function resetBoard() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];

  for (let i = 0; i < boxes.length; i++) {
    boxTexts[i].textContent = '';
    boxTexts[i].classList.remove('X', 'O');
  }

  turnInfo.textContent = `Turn for ${currentPlayer}`;
}