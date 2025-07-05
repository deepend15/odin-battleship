import { expect, test } from "@jest/globals";
import { gameboard } from "./gameboard.js";

test("gameboard.getBoard() returns an array with 10 rows and 10 columns", () => {
  const board = gameboard.getBoard();
  expect(board.length).toBe(10);
  board.forEach((row) => {
    expect(row.length).toBe(10);
  });
});
