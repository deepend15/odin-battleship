import { expect, test, describe, beforeEach } from "@jest/globals";
import { createShips } from "./ship.js";

describe("Ship test suite", () => {
  let ships;

  beforeEach(() => {
    ships = createShips().getShips();
  });

  test("createShips() creates an object with a getShips() method that returns an array of 5 ships", () => {
    expect(Array.isArray(ships)).toBeTruthy;
    expect(ships.length).toBe(5);
  });

  test("The array fetched by getShips() contains ships with lengths of 5, 4, 3, 3, and 2", () => {
    const shipLengths = [];
    ships.forEach((ship) => shipLengths.push(ship.length));
    expect(shipLengths).toEqual[(5, 4, 3, 3, 2)];
  });

  test('Each ship created by createShips() has an "id" property', () => {
    for (const ship of ships) {
      expect(Object.keys(ship)).toContain("id");
    }
  });

  test('Each ship created by createShips() has a "placed" property that initiates with value "false"', () => {
    for (const ship of ships) {
      expect(ship.placed).toBeFalsy;
    }
  });

  test('Each ship created by createShips() has a "hits" property that initiates with value "0"', () => {
    for (const ship of ships) {
      expect(ship.hits).toBe(0);
    }
  });

  test("Each ship created by createShips() has a hit() method that increases its hit value by 1", () => {
    ships.forEach((ship) => {
      const startingHits = ship.hits;
      ship.hit();
      expect(ship.hits).toBe(startingHits + 1);
    });
  });

  test("Each ship created by createShips() has an isSunk() method that initially returns false", () => {
    for (const ship of ships) {
      expect(ship.isSunk()).toBeFalsy;
    }
  });

  test(`When a ship's hits value equals its length, isSunk() returns true`, () => {
    ships.forEach((ship) => {
      ship.hits = ship.length;
      expect(ship.isSunk()).toBeTruthy;
    });
  });

  test("Two sets of ships can be created that will share the same methods and properties, and calling a method for one of the sets will only affect that set of ships", () => {
    const player1Ships = createShips().getShips();
    const player2Ships = createShips().getShips();

    const player1FiveShipArray = player1Ships.filter((ship) => ship.id === "5");
    const player1FiveShip = player1FiveShipArray[0];
    const player2FiveShipArray = player2Ships.filter((ship) => ship.id === "5");
    const player2FiveShip = player2FiveShipArray[0];

    player1FiveShip.hit();

    expect(player1FiveShip.hits).toBe(1);
    expect(player2FiveShip.hits).toBe(0);

    player2FiveShip.hits = 5;

    expect(player1FiveShip.isSunk()).toBeFalsy;
    expect(player2FiveShip.isSunk()).toBeTruthy;
  });
});
