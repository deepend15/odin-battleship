import { game } from "./game.js";

export function computer() {
  let computerPlayer;
  let humanPlayer;

  if (game.getPlayer2().type === "computer") {
    computerPlayer = game.getPlayer2();
    humanPlayer = game.getPlayer1();
  }

  const humanPlayerGameboard = humanPlayer.gameboard;
  const humanPlayerBoard = humanPlayerGameboard.getBoard();

  function computerAttack() {
    const columnLabels = "ABCDEFGHIJ".split("");
    const rowLabels = "1,2,3,4,5,6,7,8,9,10".split(",");

    function isValid([first, second]) {
      if (Array.isArray(humanPlayerBoard[first][second])) {
        if (
          humanPlayerBoard[first][second].includes("hit") ||
          humanPlayerBoard[first][second].includes("miss")
        )
          return false;
        else return true;
      }
      return true;
    }

    const queue = [];

    function generateRandomCoordinates() {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      queue.push([x, y]);
    }

    function generatePossibleAttacksFromPreviousHit(previousHitCoordinates) {
      const previousHitRow = previousHitCoordinates[0];
      const previousHitColumn = previousHitCoordinates[1];

      let rightAttack = null;
      let leftAttack = null;
      let upAttack = null;
      let downAttack = null;

      if (previousHitColumn + 1 <= 9) {
        rightAttack = [previousHitRow, previousHitColumn + 1];
      }

      if (previousHitColumn - 1 >= 0) {
        leftAttack = [previousHitRow, previousHitColumn - 1];
      }

      if (previousHitRow - 1 >= 0) {
        upAttack = [previousHitRow - 1, previousHitColumn];
      }

      if (previousHitRow + 1 <= 9) {
        downAttack = [previousHitRow + 1, previousHitColumn];
      }

      const possibleAttacks = [rightAttack, leftAttack, upAttack, downAttack];
      return possibleAttacks;
    }

    let randomCoordinates;

    if (
      computerPlayer.lastAttackResult === "HIT" &&
      computerPlayer.attackTurn === 1
    ) {
      const lastAttackRow = rowLabels.indexOf(computerPlayer.lastAttack[1]);
      const lastAttackColumn = columnLabels.indexOf(
        computerPlayer.lastAttack[0],
      );
      const possibleAttacks = generatePossibleAttacksFromPreviousHit([
        lastAttackRow,
        lastAttackColumn,
      ]);

      let randomIndex = Math.floor(Math.random() * 4);
      let randomAttack = possibleAttacks[randomIndex];

      queue.push(randomAttack);

      while (queue.length !== 0) {
        if (queue[0] !== null && isValid(queue[0])) {
          randomCoordinates = queue.shift();
        } else {
          randomIndex = Math.floor(Math.random() * 4);
          randomAttack = possibleAttacks[randomIndex];
          queue.push(randomAttack);
          queue.shift();
        }
      }
    } else if (
      computerPlayer.lastAttack === "SINK" &&
      computerPlayer.tryingToSink
    ) {
      const possibleAttacks = generatePossibleAttacksFromPreviousHit(
        computerPlayer.firstHit,
      );

      let randomIndex = Math.floor(Math.random() * 4);
      let randomAttack = possibleAttacks[randomIndex];

      queue.push(randomAttack);

      while (queue.length !== 0) {
        if (queue[0] !== null && isValid(queue[0])) {
          randomCoordinates = queue.shift();
        } else {
          randomIndex = Math.floor(Math.random() * 4);
          randomAttack = possibleAttacks[randomIndex];
          queue.push(randomAttack);
          queue.shift();
        }
      }
    } else if (
      computerPlayer.tryingToSink &&
      computerPlayer.lastAttackResult === "HIT" &&
      computerPlayer.attackTurn !== 1
    ) {
      const lastAttackRow = rowLabels.indexOf(computerPlayer.lastAttack[1]);
      const lastAttackColumn = columnLabels.indexOf(
        computerPlayer.lastAttack[0],
      );
      const firstHitRow = computerPlayer.firstHit[0];
      const firstHitColumn = computerPlayer.firstHit[1];

      if (lastAttackRow === firstHitRow) {
        let nextCoordinates = [lastAttackRow, lastAttackColumn + 1];
        if (isValid(nextCoordinates)) {
          randomCoordinates = nextCoordinates;
        } else {
          nextCoordinates = [lastAttackRow, lastAttackColumn - 1];
          if (isValid(nextCoordinates)) {
            randomCoordinates = nextCoordinates;
          } else randomCoordinates = [firstHitRow, firstHitColumn - 1];
        }
      } else if (lastAttackColumn === firstHitColumn) {
        let nextCoordinates = [lastAttackRow + 1, lastAttackColumn];
        if (isValid(nextCoordinates)) {
          randomCoordinates = nextCoordinates;
        } else {
          nextCoordinates = [lastAttackRow - 1, lastAttackColumn];
          if (isValid(nextCoordinates)) {
            randomCoordinates = nextCoordinates;
          } else {
            randomCoordinates = [firstHitRow - 1, firstHitColumn];
          }
        }
      }
    } else if (
      computerPlayer.tryingToSink &&
      computerPlayer.lastAttackResult === "MISS" &&
      computerPlayer.attackTurn !== 1
    ) {
      const firstHitRow = computerPlayer.firstHit[0];
      const firstHitColumn = computerPlayer.firstHit[1];

      const ids = ["2", "3A", "3B", "4", "5"];
      const idArray = humanPlayerBoard[firstHitRow][firstHitColumn].filter(
        (item) => ids.includes(item),
      );
      const id = idArray[0];
      const hitShipArray = humanPlayerGameboard.ships.filter(
        (ship) => ship.id === id,
      );
      const hitShip = hitShipArray[0];

      if (hitShip.hits === 1) {
        const possibleAttacks = generatePossibleAttacksFromPreviousHit(
          computerPlayer.firstHit,
        );

        let randomIndex = Math.floor(Math.random() * 4);
        let randomAttack = possibleAttacks[randomIndex];

        queue.push(randomAttack);

        while (queue.length !== 0) {
          if (queue[0] !== null && isValid(queue[0])) {
            randomCoordinates = queue.shift();
          } else {
            randomIndex = Math.floor(Math.random() * 4);
            randomAttack = possibleAttacks[randomIndex];
            queue.push(randomAttack);
            queue.shift();
          }
        }
      } else {
        const hitShipSquares = [];
        humanPlayerBoard.forEach((row, index) => {
          let rowIndex = index;
          row.forEach((square, index) => {
            if (Array.isArray(square)) {
              if (square.includes(hitShip.id) && square.includes("hit")) {
                hitShipSquares.push([rowIndex, index]);
              }
            }
          });
        });
        const firstHitShipSquare = hitShipSquares[0];
        const secondHitShipSquare = hitShipSquares[1];

        if (firstHitShipSquare[0] === secondHitShipSquare[0]) {
          let nextCoordinates = [firstHitRow, firstHitColumn - 1];
          if (isValid(nextCoordinates)) {
            randomCoordinates = nextCoordinates;
          } else randomCoordinates = [firstHitRow, firstHitColumn + 1];
        } else if (firstHitShipSquare[1] === secondHitShipSquare[1]) {
          let nextCoordinates = [firstHitRow - 1, firstHitColumn];
          if (isValid(nextCoordinates)) {
            randomCoordinates = nextCoordinates;
          } else {
            randomCoordinates = [firstHitRow + 1, firstHitColumn];
          }
        }
      }
    } else {
      generateRandomCoordinates();

      while (queue.length !== 0) {
        if (isValid(queue[0])) {
          randomCoordinates = queue.shift();
        } else {
          generateRandomCoordinates();
          queue.shift();
        }
      }
    }

    humanPlayerGameboard.receiveAttack(randomCoordinates);

    computerPlayer.lastAttack = [
      columnLabels[randomCoordinates[1]],
      rowLabels[randomCoordinates[0]],
    ];

    if (
      humanPlayerBoard[randomCoordinates[0]][randomCoordinates[1]].includes(
        "miss",
      )
    )
      computerPlayer.lastAttackResult = "MISS";
    if (computerPlayer.tryingToSink) computerPlayer.attackTurn += 1;
    if (
      humanPlayerBoard[randomCoordinates[0]][randomCoordinates[1]].includes(
        "hit",
      )
    ) {
      const ids = ["2", "3A", "3B", "4", "5"];
      const idArray = humanPlayerBoard[randomCoordinates[0]][
        randomCoordinates[1]
      ].filter((item) => ids.includes(item));
      const id = idArray[0];
      const hitShipArray = humanPlayerGameboard.ships.filter(
        (ship) => ship.id === id,
      );
      const hitShip = hitShipArray[0];

      if (
        humanPlayerBoard[randomCoordinates[0]][randomCoordinates[1]].includes(
          "is sunk",
        )
      ) {
        computerPlayer.lastAttackResult = "SINK";

        let hitShipIndex;

        computerPlayer.hitButNotSunkShips.forEach((ship, index) => {
          if (ship.id === hitShip.id) hitShipIndex = index;
        });
        computerPlayer.hitButNotSunkShips.splice(hitShipIndex, 1);
        if (computerPlayer.hitButNotSunkShips.length === 0) {
          delete computerPlayer.hitButNotSunkShips;
          delete computerPlayer.tryingToSink;
          delete computerPlayer.firstHit;
          delete computerPlayer.attackTurn;
        } else {
          const nextShip = computerPlayer.hitButNotSunkShips[0];
          const hitButNotSunkSquares = [];
          humanPlayerBoard.forEach((row, index) => {
            let rowIndex = index;
            row.forEach((square, index) => {
              if (Array.isArray(square)) {
                if (square.includes(nextShip.id) && square.includes("hit")) {
                  hitButNotSunkSquares.push([rowIndex, index]);
                }
              }
            });
          });
          computerPlayer.firstHit = hitButNotSunkSquares[0];
          computerPlayer.attackTurn = hitButNotSunkSquares.length;
        }
      } else {
        computerPlayer.lastAttackResult = "HIT";

        if (!computerPlayer.hitButNotSunkShips) {
          computerPlayer.hitButNotSunkShips = [];
        }

        if (computerPlayer.hitButNotSunkShips.length === 0) {
          computerPlayer.hitButNotSunkShips.push(hitShip);
        } else {
          function isIn(ship, array) {
            let response = false;
            for (let i = 0; i < array.length; i++) {
              if (array[i].id === ship.id) response = true;
              break;
            }
            return response;
          }
          if (!isIn(hitShip, computerPlayer.hitButNotSunkShips)) {
            computerPlayer.hitButNotSunkShips.push(hitShip);
          }
        }

        if (!computerPlayer.tryingToSink) {
          computerPlayer.tryingToSink = true;
          computerPlayer.firstHit = randomCoordinates;
          computerPlayer.attackTurn = 1;
        } else computerPlayer.attackTurn += 1;
      }
    }
  }

  return { computerAttack };
}
