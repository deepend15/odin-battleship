import { game } from "./game.js";

export const displayController = (function () {
  const currentPlayerBoardDiv = document.querySelector(".current-player-board");
  const otherPlayerBoardDiv = document.querySelector(".other-player-board");

  const updateScreen = () => {
    otherPlayerBoardDiv.textContent = "";
    currentPlayerBoardDiv.textContent = "";

    let currentPlayer;
    let otherPlayer;

    if (game.getActivePlayer().id === "Player 1") {
      currentPlayer = game.getPlayer1();
      otherPlayer = game.getPlayer2();
    } else {
      currentPlayer = game.getPlayer2();
      otherPlayer = game.getPlayer1();
    }

    const otherPlayerGameboard = otherPlayer.gameboard;
    const otherPlayerBoard = otherPlayerGameboard.getBoard();

    otherPlayerBoard.forEach((row) => {
      row.forEach((square) => {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        otherPlayerBoardDiv.appendChild(newSquare);
      });
    });

    const currentPlayerGameboard = currentPlayer.gameboard;
    const currentPlayerBoard = currentPlayerGameboard.getBoard();

    currentPlayerBoard.forEach((row) => {
      row.forEach((square) => {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        if (square !== null) {
          const ids = ["2", "3A", "3B", "4", "5"];
          ids.forEach((id) => {
            if (square.includes(id)) {
              if (id === "3A" || id === "3B") newSquare.textContent = "3";
              else newSquare.textContent = id;
            }
          });
        }
        currentPlayerBoardDiv.append(newSquare);
      });
    });
  };

  return { updateScreen }
})();
