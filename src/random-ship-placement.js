import { possiblePositions } from "./possible-ship-positions.js";

export function randomShipPlacement(player) {
  const playerGameboard = player.gameboard;
  const playerBoard = playerGameboard.getBoard();

  function getRandomStartingSquare() {
    function isValid(square) {
      if (playerBoard[square[0]][square[1]] === null) return true;
      return false;
    }

    const startingSquareQueue = [];

    function generateRandomStartingSquare() {
      const startingX = Math.floor(Math.random() * 10);
      const startingY = Math.floor(Math.random() * 10);
      startingSquareQueue.push([startingX, startingY]);
    }

    generateRandomStartingSquare();

    let randomStartingSquare;

    while (startingSquareQueue.length !== 0) {
      if (isValid(startingSquareQueue[0])) {
        randomStartingSquare = startingSquareQueue.shift();
      } else {
        generateRandomStartingSquare();
        startingSquareQueue.shift();
      }
    }

    return randomStartingSquare;
  }

  function placeInRandomPosition(ship, startingSquare = null) {
    function getRandomPosition(startingSquare) {
      const shipPossiblePositionsObject = possiblePositions(
        ship,
        startingSquare,
      );

      const possiblePositionArrays = Object.values(shipPossiblePositionsObject);
      const filteredPossiblePositionArrays = possiblePositionArrays.filter(
        (array) => array !== null,
      );
      const numberOfValidPossiblePositions =
        filteredPossiblePositionArrays.length;

      const randomIndex = Math.floor(
        Math.random() * numberOfValidPossiblePositions,
      );
      return filteredPossiblePositionArrays[randomIndex];
    }

    function occupied(position) {
      let answer = false;
      position.forEach((value) => {
        if (playerBoard[value[0]][value[1]] !== null) {
          answer = true;
        }
      });
      return answer;
    }

    function getFinalSquare(position) {
      return position[position.length - 1];
    }

    const queue = [];

    let randomStartingSquare;
    if (startingSquare === null)
      randomStartingSquare = getRandomStartingSquare();

    let randomPosition;
    if (startingSquare === null)
      randomPosition = getRandomPosition(randomStartingSquare);
    else randomPosition = getRandomPosition(startingSquare);

    let finalSquare;

    queue.push(randomPosition);

    while (queue.length !== 0) {
      if (!occupied(queue[0])) {
        finalSquare = getFinalSquare(queue[0]);
        if (startingSquare === null)
          playerGameboard.placeShip(ship, randomStartingSquare, finalSquare);
        else playerGameboard.placeShip(ship, startingSquare, finalSquare);
        ship.placed = true;
        queue.shift();
      } else {
        if (startingSquare === null) {
          randomStartingSquare = getRandomStartingSquare();
          randomPosition = getRandomPosition(randomStartingSquare);
          queue.push(randomPosition);
          queue.shift();
        } else {
          randomPosition = getRandomPosition(startingSquare);
          queue.push(randomPosition);
          queue.shift();
        }
      }
    }
  }

  return { placeInRandomPosition };
}
