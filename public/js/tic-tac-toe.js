let turn = 'X';
let gameBoard = [];
let gameEnded = false;

const getWidth = () => {
  const widthInput = document.getElementById('width');
  return parseInt(widthInput.value, 10);
};

const getHeight = () => {
  const heightInput = document.getElementById('height');
  return parseInt(heightInput.value, 10);
};

const clearChildren = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const createGrid = (width, height, container) => {
  console.log(`Create grid: ${width}, ${height}, ${container}`);

  clearChildren(container);

  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  for (let i = 0; i < height; i++) {
    let boardRow = [];

    for (let j = 0; j < width; j++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.onclick = () => onCellClick(cell, i, j);

      container.appendChild(cell);
      boardRow.push(null);
    }

    gameBoard.push(boardRow);
  }
};

const changeTurn = () => {
  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }

  return turn;
};

const onCellClick = (cell, i, j) => {
  if (gameEnded || gameBoard[i][j]) {
    return;
  }

  cell.innerHTML = turn;

  updateGameState(i, j, turn);
  checkGameState();
};

const updatePlayerIdText = () => {
  const playerIdElement = document.getElementById('player-id');
  playerIdElement.innerHTML = `Player ${turn}'s turn`;
};

const updateGameState = (i, j, turn) => {
  gameBoard[i][j] = turn;
};

const checkGameState = () => {
  const gameState = getGameState();

  if (!gameState) {
    changeTurn();
    updatePlayerIdText();
  } else {
    endOfGame(gameState);
  }
};

const endOfGame = (gameState) => {
  const playerIdElement = document.getElementById('player-id');
  const restartGameElement = document.getElementById('restart-button');

  let text;

  if (gameState === 'Tie') {
    text = 'Tie!';
  } else {
    text = `Winner is ${gameState}`;
  }

  gameEnded = true;
  playerIdElement.innerHTML = text;
  restartGameElement.removeAttribute('hidden');
};

const getGameState = () => {
  const width = getWidth();
  const height = getHeight();

  // Check rows for a win
  for (let i = 0; i < height; i++) {
    let count = 0;
    let currentType = null;

    for (let j = 0; j < width; j++) {
      const cellType = gameBoard[i][j];

      if (cellType === null) {
        count = 0;
        currentType = null;
      } else if (cellType === currentType) {
        count++;

        if (count === 3) {
          return currentType;
        }
      } else {
        count = 1;
        currentType = cellType;
      }
    }
  }

  // Check columns for a win
  for (let j = 0; j < width; j++) {
    let count = 0;
    let currentType = null;

    for (let i = 0; i < height; i++) {
      const cellType = gameBoard[i][j];

      if (cellType === null) {
        count = 0;
        currentType = null;
      } else if (cellType === currentType) {
        count++;

        if (count === 3) {
          return currentType;
        }
      } else {
        count = 1;
        currentType = cellType;
      }
    }
  }

  // Check diagonals for a win
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (i + 2 < height && j + 2 < width) {
        const cellType = gameBoard[i][j];
        const diagonal1 = gameBoard[i + 1][j + 1];
        const diagonal2 = gameBoard[i + 2][j + 2];

        if (cellType !== null && cellType === diagonal1 && cellType === diagonal2) {
          return cellType;
        }
      }

      if (i + 2 < height && j - 2 >= 0) {
        const cellType = gameBoard[i][j];
        const diagonal1 = gameBoard[i + 1][j - 1];
        const diagonal2 = gameBoard[i + 2][j - 2];

        if (cellType !== null && cellType === diagonal1 && cellType === diagonal2) {
          return cellType;
        }
      }
    }
  }

  // Check for a tie
  let isTie = true;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (gameBoard[i][j] === null) {
        isTie = false;
        break;
      }
    }

    if (!isTie) {
      break;
    }
  }

  if (isTie) {
    return 'Tie';
  }

  return null;
};

const onGameRestart = () => {
  turn = 'X';
  gameBoard = [];
  gameEnded = false;

  const container = document.getElementById('grid-container');
  const restartGameElement = document.getElementById('restart-button');

  updatePlayerIdText();
  createGrid(getWidth(), getHeight(), container);
  restartGameElement.setAttribute('hidden', 'true');
};

window.onload = () => {
  const container = document.getElementById('grid-container');

  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');

  const changeListener = () => createGrid(getWidth(), getHeight(), container);

  widthInput.onchange = changeListener;
  heightInput.onchange = changeListener;

  onGameRestart();
};
