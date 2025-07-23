import { expect, test } from "@jest/globals";
import { game } from "./game.js";

test("The game factory function creates a game object with methods getPlayer1(), getPlayer2(), getActivePlayer(), getOpponent(), switchPlayerTurn(), getGameStatus(), setGameStatus(), and startGame()", () => {
  expect(typeof game.getPlayer1).toBe("function");
  expect(typeof game.getPlayer2).toBe("function");
  expect(typeof game.getActivePlayer).toBe("function");
  expect(typeof game.getOpponent).toBe("function");
  expect(typeof game.switchPlayerTurn).toBe("function");
  expect(typeof game.getGameStatus).toBe("function");
  expect(typeof game.setGameStatus).toBe("function");
  expect(typeof game.startGame).toBe("function");
});

test("game.getGameStatus() initially returns 'new'", () => {
  expect(game.getGameStatus()).toBe("new");
});

test("The argument passed in game.setGameStatus() causes game.getGameStatus() to return that argument", () => {
  game.setGameStatus("player-turn");
  expect(game.getGameStatus()).toBe("player-turn");
  game.setGameStatus("new");
  expect(game.getGameStatus()).toBe("new");
})

test("When game.startGame() is called with a player 1 argument, game.getPlayer1() returns a player object for that player", () => {
  game.startGame("Bob");
  expect(game.getPlayer1().name).toBe("Bob");
  expect(game.getPlayer1().type).toBe("human");
  expect(game.getPlayer1().gameboard.ships.length).toBe(5);
});

test("When game.startGame() is called without a player 2 argument, game.getPlayer2() returns a player object for the computer", () => {
  game.startGame("Bob");
  expect(game.getPlayer2().name).toBe("Computer");
  expect(game.getPlayer2().type).toBe("computer");
});

test("Right after game.startGame() is called, game.getActivePlayer() returns the player 1 object", () => {
  game.startGame("Bob");
  expect(game.getActivePlayer().name).toBe("Bob");
});

test("Right after game.startGame() is called, game.getOpponent() returns the player 2 object", () => {
  game.startGame("Bob");
  expect(game.getOpponent().name).toBe("Computer");
});

test("After game.startGame() is called, game.switchPlayerTurn() switches the active player and opponent", () => {
  game.startGame("Bob");
  game.switchPlayerTurn();
  expect(game.getActivePlayer().name).toBe("Computer");
  expect(game.getOpponent().name).toBe("Bob");
  game.switchPlayerTurn();
  expect(game.getActivePlayer().name).toBe("Bob");
  expect(game.getOpponent().name).toBe("Computer");
});
