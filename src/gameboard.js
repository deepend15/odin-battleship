import { ship } from "./ship.js";

export const gameboard = (function () {
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

  function placeShip(ship, firstCoordinate, secondCoordinate) {
    const coordinates = [
      firstCoordinate[0],
      firstCoordinate[1],
      secondCoordinate[0],
      secondCoordinate[1],
    ];

    coordinates.forEach((coordinate) => {
      if (coordinate < 0 || coordinate > 9) {
        throw new Error("Invalid coordinates");
      }
    });

    if (
      firstCoordinate[0] !== secondCoordinate[0] &&
      firstCoordinate[1] !== secondCoordinate[1]
    ) {
      throw new Error("Invalid coordinates");
    }

    if (firstCoordinate[0] === secondCoordinate[0]) {
      if (
        !(
          secondCoordinate[1] - firstCoordinate[1] === ship.length - 1 ||
          (secondCoordinate[1] - firstCoordinate[1]) * -1 === ship.length - 1
        )
      ) {
        throw new Error("Invalid coordinates");
      }
    }

    if (firstCoordinate[1] === secondCoordinate[1]) {
      if (
        !(
          secondCoordinate[0] - firstCoordinate[0] === ship.length - 1 ||
          (secondCoordinate[0] - firstCoordinate[0]) * -1 === ship.length - 1
        )
      ) {
        throw new Error("Invalid coordinates");
      }
    }

    const board = gameboard.getBoard();

    const squares = [firstCoordinate];

    let x = firstCoordinate[0];
    let y = firstCoordinate[1];

    for (let i = 1; i < ship.length - 1; i++) {
      if (firstCoordinate[0] === secondCoordinate[0]) {
        if (firstCoordinate[1] < secondCoordinate[1]) y += 1;
        else y -= 1;
      } else {
        if (firstCoordinate[0] < secondCoordinate[0]) x += 1;
        else x -= 1;
      }
      squares.push([x, y]);
    }

    squares.push(secondCoordinate);

    squares.forEach((square) => {
      if (board[square[0]][square[1]] !== null) {
        throw new Error("Coordinates already occupied!");
      }
      board[square[0]][square[1]] = [ship.id];
    });
  }

  function clearBoard() {
    board.forEach((row) => {
      for (let i = 0; i < row.length; i++) {
        row[i] = null;
      }
    });
  }

  function receiveAttack([x, y]) {
    const ships = ship.getShips();
    const shipIDs = ships.map((ship) => ship.id);

    if (board[x][y] === null) {
      board[x][y] = ["miss"];
      return;
    }

    if (board[x][y].includes("miss")) {
      throw new Error("Can't attack this spot");
    }

    shipIDs.forEach((id) => {
      if (board[x][y].includes(id)) {
        if (board[x][y].includes("hit")) {
          throw new Error("Can't attack this spot");
        }
        const hitShipArray = ships.filter((ship) => ship.id === id);
        const hitShip = hitShipArray[0];
        hitShip.hit();
        board[x][y].push("hit");
        if (hitShip.isSunk()) {
          board.forEach((row) => {
            row.forEach((square) => {
              if (Array.isArray(square)) {
                if (square.includes(id)) square.push("is sunk");
              }
            });
          });
        }
        return;
      }
    });
  }

  function allShipsSunk() {
    const ships = ship.getShips();

    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) return false;
    }

    return true;
  }

  return { getBoard, placeShip, clearBoard, receiveAttack, allShipsSunk };
})();
