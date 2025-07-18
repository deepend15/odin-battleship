import { expect, test } from "@jest/globals";
import { PlaceShipmentScreen } from "./ship-placement-screen-class";
import { Player } from "./player";

test("The PlaceShipmentScreen class creates a new screen object with properties 'player', 'status', 'activeShip', and 'selectedStartingSquare'", () => {
  const player1 = new Player("Bob", 1, "human");
  const player1Screen = new PlaceShipmentScreen(player1, "pick-ship");
  expect(player1Screen.player.name).toBe("Bob");
  expect(player1Screen.status).toBe("pick-ship");
  expect(player1Screen.activeShip).toBe(null);
  expect(player1Screen.selectedStartingSquare).toBe(null);
});
