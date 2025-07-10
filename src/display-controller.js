import { game } from "./game.js";

export const displayController = (function () {
  const gameDiv = document.querySelector(".game-div");

  const updateScreen = () => {
    // clear gameDiv

    gameDiv.textContent = "";

    // get activePlayer and opponent

    const activePlayer = game.getActivePlayer();
    const opponent = game.getOpponent();

    // create game info text & add to gameDiv

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-div");
    const infoDivPlayersDiv = document.createElement("div");
    infoDivPlayersDiv.classList.add("info-div-players");
    const infoDivPlayersActivePlayerLine1 = document.createElement("p");
    infoDivPlayersActivePlayerLine1.classList.add("info-active-player");
    infoDivPlayersActivePlayerLine1.textContent = `Active player: `;
    const infoDivPlayersActivePlayerLine2 = document.createElement("p");
    infoDivPlayersActivePlayerLine2.classList.add("info-active-player");
    infoDivPlayersActivePlayerLine2.textContent = `${activePlayer.name}`;
    const infoDivPlayersOpponentLine1 = document.createElement("p");
    infoDivPlayersOpponentLine1.classList.add("info-opponent");
    infoDivPlayersOpponentLine1.textContent = `Opponent: `;
    const infoDivPlayersOpponentLine2 = document.createElement("p");
    infoDivPlayersOpponentLine2.classList.add("info-opponent");
    infoDivPlayersOpponentLine2.textContent = `${opponent.name}`;
    infoDivPlayersDiv.append(
      infoDivPlayersActivePlayerLine1,
      infoDivPlayersActivePlayerLine2,
      infoDivPlayersOpponentLine1,
      infoDivPlayersOpponentLine2,
    );
    const infoDivTextDiv = document.createElement("div");
    infoDivTextDiv.classList.add("info-div-text-div");
    const infoDivTextDivFirstLine = document.createElement("p");
    infoDivTextDivFirstLine.textContent = `Click a square on your opponent's board to attack that square!`;
    const infoDivTextDivSecondLine = document.createElement("p");
    infoDivTextDivSecondLine.textContent = `-If your opponent has a ship occupying that square, their ship will receive a hit`;
    const infoDivTextDivThirdLine = document.createElement("p");
    infoDivTextDivThirdLine.textContent = `-If you hit all of the squares containing one of your opponent's ships, you'll sink that ship!`;
    const infoDivTextDivFourthLine = document.createElement("p");
    infoDivTextDivFourthLine.textContent = `-Try to sink all of your opponent's ships! The game ends once either you or your opponent sinks all of the other player's ships on the board`;
    infoDivTextDiv.append(
      infoDivTextDivFirstLine,
      infoDivTextDivSecondLine,
      infoDivTextDivThirdLine,
      infoDivTextDivFourthLine,
    );

    infoDiv.append(infoDivPlayersDiv, infoDivTextDiv);
    gameDiv.append(infoDiv);

    // create opponent board side of webpage

    const opponentSection = document.createElement("div");
    opponentSection.classList.add("opponent-section");
    const opponentSectionH2 = document.createElement("h2");
    opponentSectionH2.textContent = `${opponent.name}'s waters:`;
    const generalBoardDiv1 = document.createElement("div");
    generalBoardDiv1.classList.add("board-div");
    const opponentColumnLabels = document.createElement("div");
    opponentColumnLabels.classList.add("column-labels");
    const columnLabelsText = "ABCDEFGHIJ".split("");
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("p");
      p.textContent = columnLabelsText[i];
      opponentColumnLabels.append(p);
    }
    const opponentRowLabels = document.createElement("div");
    opponentRowLabels.classList.add("row-labels");
    const rowLabelsText = "1,2,3,4,5,6,7,8,9,10".split(",");
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("p");
      p.textContent = rowLabelsText[i];
      opponentRowLabels.append(p);
    }
    const opponentBoardDiv = document.createElement("div");
    opponentBoardDiv.classList.add("opponent-board");
    generalBoardDiv1.append(
      opponentColumnLabels,
      opponentRowLabels,
      opponentBoardDiv,
    );
    opponentSection.append(opponentSectionH2, generalBoardDiv1);

    // create active player board side of webpage

    const activePlayerSection = document.createElement("div");
    activePlayerSection.classList.add("active-player-section");
    const activePlayerSectionH2 = document.createElement("h2");
    activePlayerSectionH2.textContent = `${activePlayer.name}'s waters:`;
    const generalBoardDiv2 = document.createElement("div");
    generalBoardDiv2.classList.add("board-div");
    const activePlayerColumnLabels = document.createElement("div");
    activePlayerColumnLabels.classList.add("column-labels");
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("p");
      p.textContent = columnLabelsText.shift();
      activePlayerColumnLabels.append(p);
    }
    const activePlayerRowLabels = document.createElement("div");
    activePlayerRowLabels.classList.add("row-labels");
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("p");
      p.textContent = rowLabelsText.shift();
      activePlayerRowLabels.append(p);
    }
    const activePlayerBoardDiv = document.createElement("div");
    activePlayerBoardDiv.classList.add("active-player-board");
    generalBoardDiv2.append(
      activePlayerColumnLabels,
      activePlayerRowLabels,
      activePlayerBoardDiv,
    );
    activePlayerSection.append(activePlayerSectionH2, generalBoardDiv2);

    // add opponentSection & activePlayerSection to gameDiv

    gameDiv.append(opponentSection, activePlayerSection);

    // fill in opponent board

    const opponentGameboard = opponent.gameboard;
    const opponentBoard = opponentGameboard.getBoard();

    opponentBoard.forEach((row, index) => {
      let rowIndex = index;
      row.forEach((square, index) => {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        newSquare.dataset.row = rowIndex;
        newSquare.dataset.column = index;
        if (Array.isArray(square)) {
          if (square.includes("miss")) newSquare.classList.add("miss");
          if (square.includes("hit")) {
            newSquare.classList.add("hit");
            newSquare.textContent = "X";
          }
        }
        opponentBoardDiv.appendChild(newSquare);
      });
    });

    // add event listeners to opponent board cells

    const opponentSquares = opponentBoardDiv.querySelectorAll(".square");

    function toggleSquareHover(e) {
      e.target.classList.toggle("hover");
    }

    opponentSquares.forEach((square) => {
      if (square.textContent === "") {
        square.addEventListener("mouseover", toggleSquareHover);
        square.addEventListener("mouseout", toggleSquareHover);
      }
    });

    // fill in active player board

    const activePlayerGameboard = activePlayer.gameboard;
    const activePlayerBoard = activePlayerGameboard.getBoard();

    activePlayerBoard.forEach((row, index) => {
      let rowIndex = index;
      row.forEach((square, index) => {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        newSquare.dataset.row = rowIndex;
        newSquare.dataset.column = index;
        if (square !== null) {
          const ids = ["2", "3A", "3B", "4", "5"];
          ids.forEach((id) => {
            if (square.includes(id)) {
              if (id === "3A" || id === "3B") newSquare.textContent = "3";
              else newSquare.textContent = id;
            }
          });
        }
        activePlayerBoardDiv.append(newSquare);
      });
    });
  };

  return { updateScreen };
})();
