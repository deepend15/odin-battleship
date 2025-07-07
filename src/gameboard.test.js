import { expect, test, afterEach } from "@jest/globals";
import { gameboard } from "./gameboard.js";
import { ship } from "./ship.js";

afterEach(() => {
  gameboard.clearBoard();
});

test("gameboard.getBoard() returns an array with 10 rows and 10 columns", () => {
  const board = gameboard.getBoard();
  expect(board.length).toBe(10);
  board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});

test("gameboard.placeShip() places a ship on the gameboard in a row", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 4]);
  const board = gameboard.getBoard();
  const firstRow = board[0];
  const firstFiveSquares = firstRow.slice(0, 5);
  firstFiveSquares.forEach((square) => {
    expect(square).toContain("5");
  });
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  gameboard.placeShip(secondShip, [4, 4], [4, 5]);
  expect(board[4][4]).toContain("2");
  expect(board[4][5]).toContain("2");
});

test("gameboard.placeShip() places a ship on the gameboard in a column", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [4, 0]);
  const board = gameboard.getBoard();
  const firstColumn = [];
  board.forEach((row) => {
    firstColumn.push(row[0]);
  });
  const firstFiveColumnSquares = firstColumn.slice(0, 5);
  firstFiveColumnSquares.forEach((square) => {
    expect(square).toContain("5");
  });
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  gameboard.placeShip(secondShip, [4, 4], [5, 4]);
  expect(board[4][4]).toContain("2");
  expect(board[5][4]).toContain("2");
});

test("gameboard.placeShip() does not allow a new ship to be placed on an area that is already occupied by a ship", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 4]);
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  expect(() => gameboard.placeShip(secondShip, [0, 0], [1, 0])).toThrow;
});

test("gameboard.placeShip() does not allow coordinates off of the board", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  expect(() => gameboard.placeShip(selectedShip, [-1, 0], [0, 0])).toThrow;
  expect(() => gameboard.placeShip(selectedShip, [0, 0], [0, 10])).toThrow;
});

test("gameboard.placeShip() does not allow diagonals", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  expect(() => gameboard.placeShip(selectedShip, [0, 0], [4, 4])).toThrow;
});

test("The distance between the inputted coordinates in gameboard.placeShip() must equal the inputted ship's length", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  expect(() => gameboard.placeShip(selectedShip, [0, 0], [0, 5])).toThrow;
  expect(() => gameboard.placeShip(selectedShip, [0, 0], [0, 3])).toThrow;
  expect(() => gameboard.placeShip(selectedShip, [0, 0], [5, 0])).toThrow;
});

test("gameboard.placeShip() allows valid coordinates in any order, i.e. gameboard.placeShip(ship, [0,0], [0,4]) works the same as gameboard.placeShip(ship, [0,4], [0,0])", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 4], [0, 0]);
  const board = gameboard.getBoard();
  const firstRow = board[0];
  const firstFiveSquares = firstRow.slice(0, 5);
  firstFiveSquares.forEach((square) => {
    expect(square).toContain("5");
  });
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  gameboard.placeShip(secondShip, [5, 4], [4, 4]);
  expect(board[4][4]).toContain("2");
  expect(board[5][4]).toContain("2");
});

test("gameboard.clearBoard() clears the board", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 4]);
  gameboard.clearBoard();
  const board = gameboard.getBoard();
  board.forEach((row) => {
    row.forEach((column) => {
      expect(column).toBe(null);
    });
  });
});

test("If gameboard.receiveAttack() receives an attack to a space occupied by a ship, it adds a hit to that ship", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 4]);
  gameboard.receiveAttack([0, 0]);
  expect(selectedShip.hits).toBe(1);
});

test("If gameboard.receiveAttack() receives an attack to a space occupied by a ship, it adds a hit to that space on the board", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 4]);
  gameboard.receiveAttack([0, 0]);
  const board = gameboard.getBoard();
  expect(board[0][0]).toContain("hit");
});

test("If gameboard.receiveAttack() receives an attack to an unoccupied space, it adds a miss to that space on the board", () => {
  gameboard.receiveAttack([0, 0]);
  const board = gameboard.getBoard();
  expect(board[0][0]).toContain("miss");
});

test("gameboard.receiveAttack() does not allow received attacks to spaces that have already been attacked (either hit or miss)", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "5");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 4]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([1, 0]);
  expect(() => gameboard.receiveAttack([0, 0])).toThrow;
  expect(() => gameboard.receiveAttack([1, 0])).toThrow;
});

test("If gameboard.receiveAttack() receives an attack that sinks a ship, that ship's isSunk() method returns true", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 1]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  expect(selectedShip.isSunk()).toBeTruthy;
});

test("If gameboard.receiveAttack() receives an attack that sinks a ship, value 'is sunk' is added to that space on the board", () => {
  const selectedShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const selectedShip = selectedShipArray[0];
  gameboard.placeShip(selectedShip, [0, 0], [0, 1]);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  const board = gameboard.getBoard();
  expect(board[0][0]).toContain("is sunk");
  expect(board[0][1]).toContain("is sunk");
});

test("If all ships on the board are sunk, gameboard.allShipsSunk() returns true", () => {
  const shipOneArray = ship.getShips().filter((ship) => ship.id === "5");
  const shipOne = shipOneArray[0];
  const shipTwoArray = ship.getShips().filter((ship) => ship.id === "4");
  const shipTwo = shipTwoArray[0];
  const shipThreeArray = ship.getShips().filter((ship) => ship.id === "3A");
  const shipThree = shipThreeArray[0];
  const shipFourArray = ship.getShips().filter((ship) => ship.id === "3B");
  const shipFour = shipFourArray[0];
  const shipFiveArray = ship.getShips().filter((ship) => ship.id === "2");
  const shipFive = shipFiveArray[0];
  gameboard.placeShip(shipOne, [0, 0], [0, 4]);
  gameboard.placeShip(shipTwo, [1, 0], [1, 3]);
  gameboard.placeShip(shipThree, [2, 0], [2, 2]);
  gameboard.placeShip(shipFour, [3, 0], [3, 2]);
  gameboard.placeShip(shipFive, [4, 0], [4, 1]);
  for (let i = 0; i < 5; i++) {
    gameboard.receiveAttack([0, i]);
  }
  for (let i = 0; i < 4; i++) {
    gameboard.receiveAttack([1, i]);
  }
  for (let i = 0; i < 3; i++) {
    gameboard.receiveAttack([2, i]);
    gameboard.receiveAttack([3, i]);
  }
  gameboard.receiveAttack([4, 0]);
  expect(gameboard.allShipsSunk()).toBeFalsy;
  gameboard.receiveAttack([4, 1]);
  expect(gameboard.allShipsSunk()).toBeTruthy;
});
