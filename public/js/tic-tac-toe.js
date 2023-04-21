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

const updateGameState = (i, j, turnState) => {
  gameBoard[i][j] = turnState;
};

const checkHorizontal = (width, height) => {
  const elementCount = parseInt(document.getElementById('element_count').value);

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

        if (count === elementCount) {
          return currentType;
        }
      } else {
        count = 1;
        currentType = cellType;
      }
    }
  }

  return false;
};

const checkVertical = (width, height) => {
  const elementCount = parseInt(document.getElementById('element_count').value);

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

        if (count === elementCount) {
          return currentType;
        }
      } else {
        count = 1;
        currentType = cellType;
      }
    }
  }

  return false;
};

const checkLeftDiagonal = (i_index, j_index) => {
  const m = parseInt(document.getElementById('element_count').value);
  let count = 1;
  let i = i_index;
  let j = j_index;
  let currentType = gameBoard[i][j];

  for (let k = 0; k < m; k++) {
    i--;
    j--;

    if (i < 0 || j < 0) {
      return false;
    }

    if (gameBoard[i][j] != null && currentType === gameBoard[i][j]) {
      count++;
    } else {
      currentType = gameBoard[i][j];
      count = 1;
    }

    if (count >= m) {
      return currentType;
    }
  }

  return false;
};

const checkRightDiagonal = (i_index, j_index, width, height) => {
  const m = parseInt(document.getElementById('element_count').value);
  let count = 1;
  let i = i_index;
  let j = j_index;
  let currentType = gameBoard[i][j];

  for (let k = 0; k < m; k++) {
    i++;
    j--;

    if (i >= width || j >= height) {
      return false;
    }

    if (gameBoard[i][j] != null && currentType === gameBoard[i][j]) {
      count++;
    } else {
      currentType = gameBoard[i][j];
      count = 1;
    }

    if (count >= m) {
      return currentType;
    }
  }

  return false;
};

const checkDiagonal = (width, height) => {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const isLeft = checkLeftDiagonal(i, j, width, height);

      if (isLeft !== false) {
        return isLeft;
      }

      const isRight = checkRightDiagonal(i, j, width, height);

      if (isRight !== false) {
        return isRight;
      }
    }
  }

  return false;
};

const checkTie = (width, height) => {
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

  return false;
};

const getGameState = () => {
  const width = getWidth();
  const height = getHeight();

  let winner = checkHorizontal(width, height);

  if (winner !== false) {
    return winner;
  }

  winner = checkVertical(width, height);

  if (winner !== false) {
    return winner;
  }

  winner = checkDiagonal(width, height);

  if (winner !== false) {
    return winner;
  }

  const isTie = checkTie(width, height);

  if (isTie !== false) {
    return isTie;
  }

  return null;
};

const changeTurn = () => {
  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }

  return turn;
};

const updatePlayerIdText = () => {
  const playerIdElement = document.getElementById('player-id');
  playerIdElement.innerHTML = `Player ${turn}'s turn`;
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

const checkGameState = () => {
  const gameState = getGameState();

  if (!gameState) {
    changeTurn();
    updatePlayerIdText();
  } else {
    endOfGame(gameState);
  }
};

const clearChildren = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const onCellClick = (cell, i, j) => {
  if (gameEnded || gameBoard[i][j]) {
    return;
  }

  cell.innerHTML = turn;

  updateGameState(i, j, turn);
  checkGameState();
};

const createGrid = (width, height, container) => {
  clearChildren(container);

  container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

  for (let i = 0; i < height; i++) {
    const boardRow = [];

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
