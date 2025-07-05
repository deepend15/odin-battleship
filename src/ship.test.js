import { expect, test } from "@jest/globals";
import { ship } from "./ship.js";

test("getShips() returns an array of 5 ships", () => {
  expect(Array.isArray(ship.getShips())).toBeTruthy;
  expect(ship.getShips().length).toBe(5);
});

test("getShips() array contains ships with lengths of 5, 4, 3, 3, and 2", () => {
  const shipLengths = [];
  ship.getShips().forEach((ship) => shipLengths.push(ship.length));
  expect(shipLengths).toEqual[(5, 4, 3, 3, 2)];
});

test('Each ship in getShips() has an "id" property', () => {
  const ships = ship.getShips();
  for (const ship of ships) {
    expect(Object.keys(ship)).toContain("id");
  }
});

test('Each ship in getShips() has a "hits" property that initiates with value "0"', () => {
  const ships = ship.getShips();
  for (const ship of ships) {
    expect(ship.hits).toBe(0);
  }
});

test('Each ship in getShips() has an isSunk() method that initiates with return value "no"', () => {
  const ships = ship.getShips();
  for (const ship of ships) {
    expect(ship.isSunk()).toBe("no");
  }
});

test("Each ship in getShips() has a hit() method that increases its hit value by 1", () => {
  const ships = ship.getShips();
  ships.forEach((ship) => {
    const startingHits = ship.hits;
    ship.hit();
    expect(ship.hits).toBe(startingHits + 1);
  });
});

test(`When a ship's hits value equals its length, isSunk() returns "yes"`, () => {
  const ships = ship.getShips();
  ships.forEach((ship) => {
    ship.hits = ship.length;
    expect(ship.isSunk()).toBe("yes");
  })
})