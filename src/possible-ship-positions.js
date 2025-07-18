export function possiblePositions(ship, startingSquare) {
  const firstCoordinate = startingSquare[0];
  const secondCoordinate = startingSquare[1];

  const shipPositions = {
    firstPosition: null,
    secondPosition: null,
    thirdPosition: null,
    fourthPosition: null,
  };

  let currentShip = [];

  // get horizontal-right ship position

  if (secondCoordinate + ship.length - 1 <= 9) {
    for (let i = secondCoordinate; i < secondCoordinate + ship.length; i++) {
      currentShip.push([firstCoordinate, i]);
    }
    shipPositions.firstPosition = currentShip;
  }

  // get horizontal-left ship position

  if (secondCoordinate - ship.length + 1 >= 0) {
    currentShip = [];
    for (let i = secondCoordinate; i > secondCoordinate - ship.length; i--) {
      currentShip.push([firstCoordinate, i]);
    }
    shipPositions.secondPosition = currentShip;
  }

  // get vertical-down ship position

  if (firstCoordinate + ship.length - 1 <= 9) {
    currentShip = [];
    for (let i = firstCoordinate; i < firstCoordinate + ship.length; i++) {
      currentShip.push([i, secondCoordinate]);
    }
    shipPositions.thirdPosition = currentShip;
  }

  // get vertical-up ship position

  if (firstCoordinate - ship.length + 1 >= 0) {
    currentShip = [];
    for (let i = firstCoordinate; i > firstCoordinate - ship.length; i--) {
      currentShip.push([i, secondCoordinate]);
    }
    shipPositions.fourthPosition = currentShip;
  }

  return shipPositions;
}
