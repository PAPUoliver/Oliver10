console.log('Loaded Proyectos!');

document.addEventListener('DOMContentLoaded', function () {
  const sudokuBoard = [
    [5, 3, '', '', 7, '', '', '', ''],
    [6, '', '', 1, 9, 5, '', '', ''],
    ['', 9, 8, '', '', '', '', 6, ''],
    [8, '', '', '', 6, '', '', '', 3],
    [4, '', '', 8, '', 3, '', '', 1],
    [7, '', '', '', 2, '', '', '', 6],
    ['', 6, '', '', '', '', 2, 8, ''],
    ['', '', '', 4, 1, 9, '', '', 5],
    ['', '', '', '', 8, '', '', 7, 9],
  ];

  const boardContainer = document.getElementById('sudoku-board');
  const resetBtn = document.getElementById('sudoku-reset');
  const message = document.getElementById('sudoku-message');

  function drawBoard() {
    boardContainer.innerHTML = '';
    for (let row = 0; row < 9; row++) {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'sudoku-row';
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement('input');
        cell.maxLength = 1;
        cell.type = 'text';
        cell.className = 'sudoku-cell';
        if (sudokuBoard[row][col] !== '') {
          cell.value = sudokuBoard[row][col];
          cell.disabled = true;
        } else {
          cell.value = '';
          cell.addEventListener('input', handleInput);
        }
        cell.dataset.row = row;
        cell.dataset.col = col;
        rowDiv.appendChild(cell);
      }
      boardContainer.appendChild(rowDiv);
    }
  }

  function handleInput(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    let val = e.target.value;
    // Solo aceptar números 1-9
    if (!/^[1-9]$/.test(val)) {
      e.target.value = '';
      return;
    }
    sudokuBoard[row][col] = Number(val);
    if (checkWin()) {
      message.textContent = '¡Felicidades! Sudoku resuelto';
    } else {
      message.textContent = '';
    }
  }

  function checkWin() {
    // Verifica que todas las celdas estén llenas
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudokuBoard[i][j] === '') return false;
      }
    }
    // Verifica filas y columnas
    for (let i = 0; i < 9; i++) {
      const fila = new Set();
      const col = new Set();
      for (let j = 0; j < 9; j++) {
        if (fila.has(sudokuBoard[i][j])) return false;
        if (col.has(sudokuBoard[j][i])) return false;
        fila.add(sudokuBoard[i][j]);
        col.add(sudokuBoard[j][i]);
      }
    }
    // Verifica subcuadrantes 3x3
    for (let bloqueFila = 0; bloqueFila < 3; bloqueFila++) {
      for (let bloqueCol = 0; bloqueCol < 3; bloqueCol++) {
        const numeros = new Set();
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            let valor = sudokuBoard[3 * bloqueFila + i][3 * bloqueCol + j];
            if (numeros.has(valor)) return false;
            numeros.add(valor);
          }
        }
      }
    }
    return true;
  }

  function resetBoard() {
    message.textContent = '';
    const boardInit = [
      [5, 3, '', '', 7, '', '', '', ''],
      [6, '', '', 1, 9, 5, '', '', ''],
      ['', 9, 8, '', '', '', '', 6, ''],
      [8, '', '', '', 6, '', '', '', 3],
      [4, '', '', 8, '', 3, '', '', 1],
      [7, '', '', '', 2, '', '', '', 6],
      ['', 6, '', '', '', '', 2, 8, ''],
      ['', '', '', 4, 1, 9, '', '', 5],
      ['', '', '', '', 8, '', '', 7, 9],
    ];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        sudokuBoard[row][col] = boardInit[row][col];
      }
    }
    drawBoard();
  }

  resetBtn.addEventListener('click', resetBoard);

  drawBoard();
});

