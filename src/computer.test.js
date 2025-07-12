import { expect, test } from "@jest/globals";
import { computer } from "./computer.js";
import { game } from "./game.js";

test("computer().computerAttack() generates a random, valid attack to the human player's gameboard", () => {
  game.startGame("Bob");
  expect(() => computer().computerAttack()).not.toThrow;
});

test("computer().computerAttack() sets the computer player's lastAttack property to an array of coordinates", () => {
  const computerPlayer = game.getPlayer2();
  const columnLabels = "ABCDEFGHIJ".split("");
  const rowLabels = "1,2,3,4,5,6,7,8,9,10".split(",");

  computer().computerAttack();
    
  expect(Array.isArray(computerPlayer.lastAttack)).toBeTruthy;
  expect(columnLabels).toContain(computerPlayer.lastAttack[0]);
  expect(rowLabels).toContain(computerPlayer.lastAttack[1]);
});

test("computer().computerAttack() sets the computer player's lastAttackResult property to 'HIT', 'MISS', or 'SINK'", () => {
  const computerPlayer = game.getPlayer2();
  const possibleValues = ["HIT", "MISS", "SINK"];

  expect(possibleValues).toContain(computerPlayer.lastAttackResult);
});
