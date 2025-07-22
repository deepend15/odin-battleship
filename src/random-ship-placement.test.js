import { expect, test, describe, beforeEach } from "@jest/globals";
import { randomShipPlacement } from "./random-ship-placement.js";
import { Player } from "./player.js";
import { possiblePositions } from "./possible-ship-positions.js";

describe("randomShipPlacement() test suite", () => {
  let player1;
  let player1RandomShipPlacement;
  let playerShips;
  let fiveShipArray;
  let fiveShip;
  let playerBoard;

  beforeEach(() => {
    player1 = new Player("Bob", 1, "human");
    player1RandomShipPlacement = randomShipPlacement(player1);
    playerShips = player1.gameboard.ships;
    fiveShipArray = playerShips.filter((ship) => ship.id === "5");
    fiveShip = fiveShipArray[0];
    playerBoard = player1.gameboard.getBoard();
  });

  test("The randomShipPlacement() factory returns a placeInRandomPosition() method", () => {
    expect(typeof player1RandomShipPlacement.placeInRandomPosition).toBe(
      "function",
    );
  });

  test("placeInRandomPosition() called with a 'ship' parameter sets that ship's 'placed' property to true", () => {
    expect(fiveShip.placed).toBeFalsy;
    player1RandomShipPlacement.placeInRandomPosition(fiveShip);
    expect(fiveShip.placed).toBeTruthy;
  });

  test("placeInRandomPosition() called with a 'ship' parameter places that ship on the player's board", () => {
    player1RandomShipPlacement.placeInRandomPosition(fiveShip);
    let array = [];
    playerBoard.forEach((row) => {
      row.forEach((square) => {
        if (Array.isArray(square)) array.push(square[0]);
      });
    });
    expect(array.length).toBe(5);
    array.forEach((item) => {
      expect(item).toBe("5");
    });
  });

  test("placeInRandomPosition() called with a 'ship' parameter and a 'starting square' parameter places that ship on the player's board at the starting square", () => {
    const startingSquare = [3, 5];
    player1RandomShipPlacement.placeInRandomPosition(fiveShip, startingSquare);
    expect(playerBoard[3][5]).toContain("5");
    const fiveShipPossiblePositionsObject = possiblePositions(
      fiveShip,
      startingSquare,
    );
    const fiveShipPossiblePositions = Object.values(
      fiveShipPossiblePositionsObject,
    );
    const filteredFiveShipPossiblePositions = fiveShipPossiblePositions.filter(
      (array) => array !== null,
    );
    function containsFiveShip1(possiblePositions) {
      let response = false;
      function containsFiveShip2(position) {
        let response = true;
        for (let i = 0; i < position.length; i++) {
          let square = playerBoard[position[i][0]][position[i][1]];
          if (!Array.isArray(square)) {
            response = false;
            break;
          }
        }
        return response;
      }
      possiblePositions.forEach((position) => {
        if (containsFiveShip2(position)) {
          response = true;
        }
      });
      return response;
    }
    expect(containsFiveShip1(filteredFiveShipPossiblePositions)).toBeTruthy;
  });
});
