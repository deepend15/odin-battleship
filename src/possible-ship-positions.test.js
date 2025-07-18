import { describe, beforeEach, expect, test } from "@jest/globals";
import { possiblePositions } from "./possible-ship-positions";

describe("possiblePositions() test suite", () => {
  let ship;
  let positions;

  beforeEach(() => {
    ship = { length: 3 };
    positions = possiblePositions(ship, [3, 4]);
  });

  test(`Function possiblePositions(), called with two parameters: 
        1. a 'ship' object with a length property equal to 3
        2. a 'startingSquare' array of [3, 4]
    will return an object with four 'positions' properties, each containing an array with a length of 3`, () => {
    expect(Array.isArray(positions.firstPosition)).toBeTruthy;
    expect(Array.isArray(positions.secondPosition)).toBeTruthy;
    expect(Array.isArray(positions.thirdPosition)).toBeTruthy;
    expect(Array.isArray(positions.fourthPosition)).toBeTruthy;

    expect(positions.firstPosition.length).toBe(3);
    expect(positions.secondPosition.length).toBe(3);
    expect(positions.thirdPosition.length).toBe(3);
    expect(positions.fourthPosition.length).toBe(3);
  });

  test("possiblePositions(), called with the same parameters as the above test, will return a firstPosition property that contains an array that includes arrays [3, 4], [3, 5], and [3, 6]", () => {
    expect(positions.firstPosition).toEqual([
      [3, 4],
      [3, 5],
      [3, 6],
    ]);
  });

  test("possiblePositions(), called with the same parameters as the above tests, will return a secondPosition property that contains an array that includes arrays [3, 4], [3, 3], and [3, 2]", () => {
    expect(positions.secondPosition).toEqual([
      [3, 4],
      [3, 3],
      [3, 2],
    ]);
  });

  test("possiblePositions(), called with the same parameters as the above tests, will return a thirdPosition property that contains an array that includes arrays [3, 4], [4, 4], and [5, 4]", () => {
    expect(positions.thirdPosition).toEqual([
      [3, 4],
      [4, 4],
      [5, 4],
    ]);
  });

  test("possiblePositions(), called with the same parameters as the above tests, will return a fourthPosition property that contains an array that includes arrays [3, 4], [2, 4], and [1, 4]", () => {
    expect(positions.fourthPosition).toEqual([
      [3, 4],
      [2, 4],
      [1, 4],
    ]);
  });
});
