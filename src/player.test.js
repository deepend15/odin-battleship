import { expect, test } from "@jest/globals";
import { Player } from "./player.js";

test("The Player class creates a new player object with properties 'name', 'id', and 'type'", () => {
  const player1 = new Player("Bob", 1, "human");
  expect(player1.name).toBe("Bob");
  expect(player1.id).toBe("Player 1");
  expect(player1.type).toBe("human");
});

test("The player object includes a 'gameboard' property that contains a gameboard for that player", () => {
  const player1 = new Player("Bob", 1, "human");
  const gameboard = player1.gameboard;
  const board = gameboard.getBoard();
  expect(Array.isArray(board)).toBeTruthy;
  expect(board.length).toBe(10);
  board.forEach((row) => {
    expect(Array.isArray(row)).toBeTruthy;
    expect(row.length).toBe(10);
    row.forEach((square) => {
      expect(square).toBe(null);
    });
  });
});
