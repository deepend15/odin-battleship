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

test('getShips() array contains ships that each have an "id" property', () => {
  const ships = ship.getShips();
  for (const ship of ships) {
    expect(Object.keys(ship)).toContain("id");
  }
});

test('getShips() array contains ships that each have a "hits" property that initiates with value "0"', () => {
  const ships = ship.getShips();
  for (const ship of ships) {
    const { hits } = ship;
    expect(hits).toBe(0);
  }
});

test('getShips() array contains ships that each have a "isSunk" property that initiates with value "no"', () => {
  const ships = ship.getShips();
  for (const ship of ships) {
    const { isSunk } = ship;
    expect(isSunk).toBe("no");
  }
});
