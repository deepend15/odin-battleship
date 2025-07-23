import { expect, test, describe, beforeEach } from "@jest/globals";
import { createGameboard } from "./gameboard.js";

describe("Gameboard test suite", () => {
  let gameboard;
  let board;
  let ships;
  let fiveShipArray;
  let fiveShip;
  let twoShipArray;
  let twoShip;

  beforeEach(() => {
    gameboard = createGameboard();
    board = gameboard.getBoard();
    ships = gameboard.ships;
    fiveShipArray = ships.filter((ship) => ship.id === "5");
    fiveShip = fiveShipArray[0];
    twoShipArray = ships.filter((ship) => ship.id === "2");
    twoShip = twoShipArray[0];
  });

  test("createGameboard() creates a gameboard object with a getBoard() method that returns an array with 10 rows and 10 columns", () => {
    expect(board.length).toBe(10);
    board.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });

  test("The gameboard contains a ships property that returns an array of ships created by createShips() (imported from ship.js)", () => {
    expect(Array.isArray(ships)).toBeTruthy;
    expect(ships.length).toBe(5);
    ships.forEach((ship) => {
      expect(ship).toHaveProperty("id");
      expect(ship).toHaveProperty("length");
      expect(ship).toHaveProperty("hits");
      expect(ship).toHaveProperty("placed");
      expect(typeof ship.hit).toBe("function");
      expect(typeof ship.isSunk).toBe("function");
    });
  });

  test("The gameboard contains a placeShip() method that places a ship on the gameboard in a row", () => {
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    const firstRow = board[0];
    const firstFiveSquares = firstRow.slice(0, 5);
    firstFiveSquares.forEach((square) => {
      expect(square).toContain("5");
    });
    gameboard.placeShip(twoShip, [4, 4], [4, 5]);
    expect(board[4][4]).toContain("2");
    expect(board[4][5]).toContain("2");
  });

  test("The placeShip() method places a ship on the gameboard in a column", () => {
    gameboard.placeShip(fiveShip, [0, 0], [4, 0]);
    const firstColumn = [];
    board.forEach((row) => {
      firstColumn.push(row[0]);
    });
    const firstFiveColumnSquares = firstColumn.slice(0, 5);
    firstFiveColumnSquares.forEach((square) => {
      expect(square).toContain("5");
    });
    gameboard.placeShip(twoShip, [4, 4], [5, 4]);
    expect(board[4][4]).toContain("2");
    expect(board[5][4]).toContain("2");
  });

  test("The placeShip() method does not allow a new ship to be placed on an area on the board that is already occupied by a ship", () => {
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    expect(() => gameboard.placeShip(twoShip, [0, 0], [1, 0])).toThrow;
  });

  test("The placeShip() method does not allow coordinates off of the board", () => {
    expect(() => gameboard.placeShip(fiveShip, [-1, 0], [0, 0])).toThrow;
    expect(() => gameboard.placeShip(fiveShip, [0, 0], [0, 10])).toThrow;
  });

  test("The placeShip() method does not allow diagonals", () => {
    expect(() => gameboard.placeShip(fiveShip, [0, 0], [4, 4])).toThrow;
  });

  test("The distance between the inputted coordinates in placeShip() must equal the inputted ship's length", () => {
    expect(() => gameboard.placeShip(fiveShip, [0, 0], [0, 5])).toThrow;
    expect(() => gameboard.placeShip(fiveShip, [0, 0], [0, 3])).toThrow;
    expect(() => gameboard.placeShip(fiveShip, [0, 0], [5, 0])).toThrow;
  });

  test("The placeShip() method allows valid coordinates in any order, i.e. gameboard.placeShip(ship, [0,0], [0,4]) works the same as gameboard.placeShip(ship, [0,4], [0,0])", () => {
    gameboard.placeShip(fiveShip, [0, 4], [0, 0]);
    const firstRow = board[0];
    const firstFiveSquares = firstRow.slice(0, 5);
    firstFiveSquares.forEach((square) => {
      expect(square).toContain("5");
    });
    gameboard.placeShip(twoShip, [5, 4], [4, 4]);
    expect(board[4][4]).toContain("2");
    expect(board[5][4]).toContain("2");
  });

  test("The clearBoard() method clears the board", () => {
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    gameboard.clearBoard();
    board.forEach((row) => {
      row.forEach((column) => {
        expect(column).toBe(null);
      });
    });
  });

  test("If a gameboard receives an attack, via the receiveAttack() method, to a space occupied by a ship, it adds a hit to that ship", () => {
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    gameboard.receiveAttack([0, 0]);
    expect(fiveShip.hits).toBe(1);
  });

  test("If the gameboard receives an attack to a space occupied by a ship, it adds a hit to that space on the board", () => {
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    gameboard.receiveAttack([0, 0]);
    expect(board[0][0]).toContain("hit");
  });

  test("If the gameboard receives an attack to an unoccupied space, it adds a miss to that space on the board", () => {
    gameboard.receiveAttack([0, 0]);
    expect(board[0][0]).toContain("miss");
  });

  test("The receiveAttack() method does not allow received attacks to spaces that have already been attacked (either hit or miss)", () => {
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([1, 0]);
    expect(() => gameboard.receiveAttack([0, 0])).toThrow;
    expect(() => gameboard.receiveAttack([1, 0])).toThrow;
  });

  test("If the gameboard receives an attack that sinks a ship, that ship's isSunk() method returns true", () => {
    gameboard.placeShip(twoShip, [0, 0], [0, 1]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    expect(twoShip.isSunk()).toBeTruthy;
  });

  test("If the gameboard receives an attack that sinks a ship, value 'is sunk' is added to all spaces on the board occupied by that ship", () => {
    gameboard.placeShip(twoShip, [0, 0], [0, 1]);
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    expect(board[0][0]).toContain("is sunk");
    expect(board[0][1]).toContain("is sunk");
  });

  test("If all ships on the board are sunk, the allShipsSunk() method returns true", () => {
    const fourShipArray = ships.filter((ship) => ship.id === "4");
    const fourShip = fourShipArray[0];
    const threeShipAArray = ships.filter((ship) => ship.id === "3A");
    const threeShipA = threeShipAArray[0];
    const threeShipBArray = ships.filter((ship) => ship.id === "3B");
    const threeShipB = threeShipBArray[0];
    gameboard.placeShip(fiveShip, [0, 0], [0, 4]);
    gameboard.placeShip(fourShip, [1, 0], [1, 3]);
    gameboard.placeShip(threeShipA, [2, 0], [2, 2]);
    gameboard.placeShip(threeShipB, [3, 0], [3, 2]);
    gameboard.placeShip(twoShip, [4, 0], [4, 1]);
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
});
