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
    expect(square).toBe("5");
  });
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  gameboard.placeShip(secondShip, [4, 4], [4, 5]);
  expect(board[4][4]).toBe("2");
  expect(board[4][5]).toBe("2");
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
    expect(square).toBe("5");
  });
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  gameboard.placeShip(secondShip, [4, 4], [5, 4]);
  expect(board[4][4]).toBe("2");
  expect(board[5][4]).toBe("2");
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
    expect(square).toBe("5");
  });
  const secondShipArray = ship.getShips().filter((ship) => ship.id === "2");
  const secondShip = secondShipArray[0];
  gameboard.placeShip(secondShip, [5, 4], [4, 4]);
  expect(board[4][4]).toBe("2");
  expect(board[5][4]).toBe("2");
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
