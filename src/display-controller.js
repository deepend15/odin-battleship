import { game } from "./game.js";
import { computer } from "./computer.js";
import { activateNewGame } from "./activate-new-game.js";

export const displayController = (function () {
  const updateScreen = () => {
    window.scrollTo(0, 0);

    const gameDiv = document.querySelector(".game-div");
    const opponentShipsDiv = document.querySelector(".opponent-ships-div");

    // clear gameDiv & opponent ships div

    gameDiv.textContent = "";
    opponentShipsDiv.textContent = "";

    // create column and row label arrays

    const columnLabelsText = "ABCDEFGHIJ".split("");
    const rowLabelsText = "1,2,3,4,5,6,7,8,9,10".split(",");

    // create initial page load display

    if (game.getGameStatus() === "new") {
      const newGameButton = document.createElement("button");
      newGameButton.textContent = "New game";
      gameDiv.before(newGameButton);

      newGameButton.addEventListener("click", activateNewGame);

      const generalBoardDiv = document.createElement("div");
      generalBoardDiv.classList.add("board-div");
      const columnLabels = document.createElement("div");
      columnLabels.classList.add("column-labels");
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("p");
        p.textContent = columnLabelsText[i];
        columnLabels.append(p);
      }
      const rowLabels = document.createElement("div");
      rowLabels.classList.add("row-labels");
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("p");
        p.textContent = rowLabelsText[i];
        rowLabels.append(p);
      }
      const blankBoardDiv = document.createElement("div");
      blankBoardDiv.classList.add("board");
      generalBoardDiv.append(columnLabels, rowLabels, blankBoardDiv);
      for (let i = 0; i < 100; i++) {
        const newSquare = document.createElement("div");
        newSquare.classList.add("square");
        blankBoardDiv.append(newSquare);
      }
      gameDiv.append(generalBoardDiv);
    } else {
      // remove new game button

      if (gameDiv.previousElementSibling.nodeName === "BUTTON") {
        gameDiv.previousElementSibling.remove();
      }

      // get activePlayer and opponent info

      const activePlayer = game.getActivePlayer();
      const activePlayerGameboard = activePlayer.gameboard;
      const activePlayerBoard = activePlayerGameboard.getBoard();

      const opponent = game.getOpponent();
      const opponentGameboard = opponent.gameboard;
      const opponentBoard = opponentGameboard.getBoard();
      const opponentShips = opponentGameboard.ships;

      // create game info text & add to gameDiv

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info-div");
      const infoDivPlayersDiv = document.createElement("div");
      infoDivPlayersDiv.classList.add("info-div-players");
      const infoDivPlayersActivePlayerLine1 = document.createElement("p");
      infoDivPlayersActivePlayerLine1.classList.add("info-active-player");
      infoDivPlayersActivePlayerLine1.textContent = `Current turn: `;
      const infoDivPlayersActivePlayerLine2 = document.createElement("p");
      infoDivPlayersActivePlayerLine2.classList.add("info-active-player");
      if (game.getGameStatus() === "computer-attack") {
        infoDivPlayersActivePlayerLine2.textContent = `${opponent.name}`;
      } else {
        infoDivPlayersActivePlayerLine2.textContent = `${activePlayer.name}`;
      }
      const infoDivPlayersOpponentLine1 = document.createElement("p");
      infoDivPlayersOpponentLine1.classList.add("info-opponent");
      infoDivPlayersOpponentLine1.textContent = `Opponent: `;
      const infoDivPlayersOpponentLine2 = document.createElement("p");
      infoDivPlayersOpponentLine2.classList.add("info-opponent");
      if (game.getGameStatus() === "computer-attack") {
        infoDivPlayersOpponentLine2.textContent = `${activePlayer.name}`;
      } else {
        infoDivPlayersOpponentLine2.textContent = `${opponent.name}`;
      }
      infoDivPlayersDiv.append(
        infoDivPlayersActivePlayerLine1,
        infoDivPlayersActivePlayerLine2,
        infoDivPlayersOpponentLine1,
        infoDivPlayersOpponentLine2,
      );

      const infoDivTextDiv = document.createElement("div");
      infoDivTextDiv.classList.add("info-div-text-div");
      const infoDivTextDivFirstLine = document.createElement("p");

      if (game.getGameStatus() === "player-turn") {
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
      }

      if (
        game.getGameStatus() === "active-player-attack" ||
        game.getGameStatus() === "computer-attack" ||
        game.getGameStatus() === "game-over"
      ) {
        infoDivTextDiv.classList.add("info-div-player-attack");
        const infoDivTextDivTop = document.createElement("div");
        infoDivTextDivTop.classList.add("info-div-text-div-top");
        if (game.getGameStatus() === "computer-attack") {
          infoDivTextDivFirstLine.textContent = `The computer attacked: ${opponent.lastAttack.join("")}`;
        } else {
          infoDivTextDivFirstLine.textContent = `You attacked: ${activePlayer.lastAttack.join("")}`;
        }
        const infoDivTextDivSecondLine = document.createElement("p");
        let result;
        if (game.getGameStatus() === "computer-attack") {
          if (opponent.lastAttackResult === "SINK") result = "HIT";
          else result = opponent.lastAttackResult;
        } else {
          if (activePlayer.lastAttackResult === "SINK") result = "HIT";
          else result = activePlayer.lastAttackResult;
        }
        infoDivTextDivSecondLine.textContent = "This was a " + result;
        infoDivTextDivTop.append(
          infoDivTextDivFirstLine,
          infoDivTextDivSecondLine,
        );
        infoDivTextDiv.append(infoDivTextDivTop);

        if (!(game.getGameStatus() === "game-over")) {
          if (
            (game.getGameStatus() === "computer-attack" &&
              opponent.lastAttackResult === "SINK") ||
            (game.getGameStatus() === "active-player-attack" &&
              activePlayer.lastAttackResult === "SINK")
          ) {
            const sinkTextDiv = document.createElement("div");
            sinkTextDiv.classList.add("sink-text-div");
            const sinkText1 = document.createElement("p");
            sinkText1.textContent = "*SHIP SUNK!*";
            sinkTextDiv.append(sinkText1);
            if (game.getGameStatus() === "active-player-attack") {
              const sinkText2 = document.createElement("p");
              sinkText2.textContent = "Woo-hoo!";
              sinkTextDiv.append(sinkText2);
            }
            infoDivTextDiv.append(sinkTextDiv);
          }
          const infoDivTextDivThirdLine = document.createElement("p");
          if (game.getGameStatus() === "computer-attack") {
            infoDivTextDivThirdLine.textContent = `Next turn: ${activePlayer.name}`;
          } else {
            infoDivTextDivThirdLine.textContent = `Next turn: ${opponent.name}`;
          }
          const infoDivTextDivBottom = document.createElement("div");
          infoDivTextDivBottom.classList.add("info-div-text-div-bottom");
          const infoDivTextDivFourthLine = document.createElement("p");
          infoDivTextDivFourthLine.textContent = `Click OK to proceed:`;
          const nextTurnOKBtn = document.createElement("button");
          nextTurnOKBtn.textContent = "OK";
          infoDivTextDivBottom.append(infoDivTextDivFourthLine, nextTurnOKBtn);

          function initiateNextTurn() {
            if (game.getGameStatus() === "active-player-attack") {
              if (opponent.name === "Computer") {
                computer().computerAttack();
                if (activePlayerGameboard.allShipsSunk())
                  game.setGameStatus("game-over");
                else game.setGameStatus("computer-attack");
                displayController.updateScreen();
              } else {
                game.switchPlayerTurn();
                game.setGameStatus("player-turn");
                displayController.updateScreen();
              }
            } else {
              game.setGameStatus("player-turn");
              displayController.updateScreen();
            }
          }

          nextTurnOKBtn.addEventListener("click", initiateNextTurn);

          infoDivTextDiv.append(infoDivTextDivThirdLine, infoDivTextDivBottom);
        } else {
          const gameOverDiv = document.createElement("div");
          gameOverDiv.classList.add("game-over-div");
          const gameOverText1 = document.createElement("p");
          gameOverText1.textContent = "*GAME OVER!*";
          const gameOverText2 = document.createElement("p");
          if (opponentGameboard.allShipsSunk()) {
            gameOverText2.textContent = `Congrats! You win!`;
          } else gameOverText2.textContent = `Sorry, you lose :(`;
          gameOverDiv.append(gameOverText1, gameOverText2);
          const gameOverButtonsDiv = document.createElement("div");
          gameOverButtonsDiv.classList.add("game-over-buttons");
          const playAgainOKBtn = document.createElement("button");
          playAgainOKBtn.textContent = "Play again";
          const changePlayersBtn = document.createElement("button");
          changePlayersBtn.textContent = "Change players";
          gameOverButtonsDiv.append(playAgainOKBtn, changePlayersBtn);
          infoDivTextDiv.append(gameOverDiv, gameOverButtonsDiv);
        }
      }

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
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("p");
        p.textContent = columnLabelsText[i];
        opponentColumnLabels.append(p);
      }
      const opponentRowLabels = document.createElement("div");
      opponentRowLabels.classList.add("row-labels");
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("p");
        p.textContent = rowLabelsText[i];
        opponentRowLabels.append(p);
      }
      const opponentBoardDiv = document.createElement("div");
      opponentBoardDiv.classList.add("board");
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
        p.textContent = columnLabelsText[i];
        activePlayerColumnLabels.append(p);
      }
      const activePlayerRowLabels = document.createElement("div");
      activePlayerRowLabels.classList.add("row-labels");
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("p");
        p.textContent = rowLabelsText[i];
        activePlayerRowLabels.append(p);
      }
      const activePlayerBoardDiv = document.createElement("div");
      activePlayerBoardDiv.classList.add("board");
      generalBoardDiv2.append(
        activePlayerColumnLabels,
        activePlayerRowLabels,
        activePlayerBoardDiv,
      );
      activePlayerSection.append(activePlayerSectionH2, generalBoardDiv2);

      // add opponentSection & activePlayerSection to gameDiv

      gameDiv.append(opponentSection, activePlayerSection);

      // fill in opponent board

      opponentBoard.forEach((row, index) => {
        let rowIndex = index;
        row.forEach((square, index) => {
          const newSquare = document.createElement("div");
          newSquare.classList.add("square");
          newSquare.dataset.row = rowIndex;
          newSquare.dataset.column = index;
          if (Array.isArray(square)) {
            if (square.includes("miss")) newSquare.classList.add("miss");
            if (game.getGameStatus() === "game-over") {
              const ids = ["2", "3A", "3B", "4", "5"];
              ids.forEach((id) => {
                if (square.includes(id)) {
                  newSquare.classList.add("is-sunk");
                  if (id === "3A" || id === "3B") newSquare.textContent = "3";
                  else newSquare.textContent = id;
                }
              });
            } else {
              if (square.includes("hit")) {
                newSquare.classList.add("hit");
                if (square.includes("is sunk")) {
                  newSquare.classList.add("is-sunk");
                  const ids = ["2", "3A", "3B", "4", "5"];
                  const matchingID = ids.filter((id) => square.includes(id))[0];
                  if (matchingID === "3A" || matchingID === "3B")
                    newSquare.textContent = "3";
                  else newSquare.textContent = matchingID;
                } else newSquare.textContent = "X";
              }
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

      function attackSquare(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        opponentGameboard.receiveAttack([selectedRow, selectedColumn]);
        activePlayer.lastAttack = [
          columnLabelsText[Number(selectedColumn)],
          rowLabelsText[Number(selectedRow)],
        ];
        if (opponentBoard[selectedRow][selectedColumn].includes("miss"))
          activePlayer.lastAttackResult = "MISS";
        if (opponentBoard[selectedRow][selectedColumn].includes("hit")) {
          if (opponentBoard[selectedRow][selectedColumn].includes("is sunk")) {
            activePlayer.lastAttackResult = "SINK";
          } else activePlayer.lastAttackResult = "HIT";
        }
        if (opponentGameboard.allShipsSunk()) {
          game.setGameStatus("game-over");
        } else {
          game.setGameStatus("active-player-attack");
        }
        displayController.updateScreen();
      }

      if (game.getGameStatus() === "player-turn") {
        opponentSquares.forEach((square) => {
          if (
            !(
              square.classList.contains("hit") ||
              square.classList.contains("miss")
            )
          ) {
            square.addEventListener("mouseover", toggleSquareHover);
            square.addEventListener("mouseout", toggleSquareHover);
            square.addEventListener("click", attackSquare);
          }
        });
      }

      // fill in active player board

      activePlayerBoard.forEach((row, index) => {
        let rowIndex = index;
        row.forEach((square, index) => {
          const newSquare = document.createElement("div");
          newSquare.classList.add("square");
          newSquare.dataset.row = rowIndex;
          newSquare.dataset.column = index;
          if (square !== null) {
            if (square.includes("miss")) newSquare.classList.add("miss");
            else {
              const ids = ["2", "3A", "3B", "4", "5"];
              ids.forEach((id) => {
                if (square.includes(id)) {
                  newSquare.classList.add("active-player-ship");
                  if (square.includes("hit")) newSquare.classList.add("hit");
                  if (square.includes("is sunk"))
                    newSquare.classList.add("is-sunk");
                  if (id === "3A" || id === "3B") newSquare.textContent = "3";
                  else newSquare.textContent = id;
                }
              });
            }
          }
          activePlayerBoardDiv.append(newSquare);
        });
      });

      // fill in opponent ship count

      opponentShipsDiv.classList.add("opponent-ships-div");
      const opponentShipsDivText = document.createElement("p");
      opponentShipsDivText.textContent = `Opponent ships remaining:`;
      opponentShipsDiv.append(opponentShipsDivText);

      // without the below code, if the game ends and the opponent has no more ships remaining, the
      // empty "opponent ships" section at the bottom of the page might shift the other elements on
      // the page in an undesired way. creating and formatting an empty square div prevents this

      if (opponentGameboard.allShipsSunk()) {
        const emptySquareDiv = document.createElement("div");
        emptySquareDiv.classList.add("empty-square-div");
        opponentShipsDiv.append(emptySquareDiv);
      }

      opponentShips.forEach((ship) => {
        if (!ship.isSunk()) {
          const shipDiv = document.createElement("div");
          shipDiv.classList.add("ship-div");
          for (let i = 0; i < ship.length; i++) {
            const squareDiv = document.createElement("div");
            squareDiv.textContent = ship.length.toString();
            shipDiv.append(squareDiv);
          }
          opponentShipsDiv.append(shipDiv);
        }
      });
    }
  };

  updateScreen();

  return { updateScreen };
})();
