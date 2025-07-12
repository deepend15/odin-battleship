import { game } from "./game.js";

export function computer() {
  let computerPlayer;
  let humanPlayer;

  if (game.getPlayer2().name === "Computer") {
    computerPlayer = game.getPlayer2();
    humanPlayer = game.getPlayer1();
  }

  const humanPlayerGameboard = humanPlayer.gameboard;
  const humanPlayerBoard = humanPlayerGameboard.getBoard();

  function computerAttack() {
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

    function generateRandomCoordinates() {
      const x = Math.floor(Math.random() * 9);
      const y = Math.floor(Math.random() * 9);

      if (isValid([x, y])) {
        return [x, y];
      } else {
        generateRandomCoordinates();
      }
    }

    const randomCoordinates = generateRandomCoordinates();

    humanPlayerGameboard.receiveAttack(randomCoordinates);

    const columnLabels = "ABCDEFGHIJ".split("");
    const rowLabels = "1,2,3,4,5,6,7,8,9,10".split(",");

    computerPlayer.lastAttack = [
      columnLabels[randomCoordinates[1]],
      rowLabels[randomCoordinates[0]],
    ];

    if (humanPlayerBoard[randomCoordinates[0]][randomCoordinates[1]].includes("miss"))
      computerPlayer.lastAttackResult = "MISS";
    if (humanPlayerBoard[randomCoordinates[0]][randomCoordinates[1]].includes("hit")) {
      if (humanPlayerBoard[randomCoordinates[0]][randomCoordinates[1]].includes("is sunk")) {
        computerPlayer.lastAttackResult = "SINK";
      } else computerPlayer.lastAttackResult = "HIT";
    }
  }

  return { computerAttack };
}
