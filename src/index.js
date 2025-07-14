import "./styles.css";
import { displayController } from "./display-controller.js";

// function computerWinGame() {
//   const player1 = game.getPlayer1();
//   const player1Gameboard = player1.gameboard;
//   const player1Board = player1Gameboard.getBoard();

//   const ids = ["2", "3A", "3B", "4", "5"];

//   player1Board.forEach((row, index) => {
//     const rowIndex = index;
//     row.forEach((square, index) => {
//       if (Array.isArray(square)) {
//         ids.forEach((id) => {
//           if (square.includes(id)) {
//             player1Gameboard.receiveAttack([rowIndex, index]);
//           }
//         });
//       }
//     });
//   });

//   player1.lastAttack = ["J", "10"];
//   player1.lastAttackResult = "MISS";
//   game.setGameStatus("game-over");
//   displayController.updateScreen();
// }

// computerWinGame();

// function computerSinkAShip() {
//   const player1 = game.getPlayer1();
//   const player1Gameboard = player1.gameboard;
//   const computer = game.getPlayer2();

//   player1Gameboard.receiveAttack([4, 0]);
//   player1Gameboard.receiveAttack([4, 1]);

//   computer.lastAttack = ["A", "5"];
//   computer.lastAttackResult = "SINK";
//   game.setGameStatus("computer-attack");
//   displayController.updateScreen();
// }

// computerSinkAShip();
