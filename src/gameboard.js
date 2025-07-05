export const gameboard = (function() {
  const rows = 10;
  const columns = 10;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(null);
    }
  }

  const getBoard = () => board;

  return { getBoard }
})();