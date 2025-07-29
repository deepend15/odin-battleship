import { game } from "./game.js";
import { activateNewGame } from "./activate-new-game.js";
import { PlaceShipmentScreen } from "./ship-placement-screen-class.js";
import { showShipPlacementScreen } from "./ship-placement-screen.js";
import { createAndAddOptionsButton } from "./options-drop-down-btn.js";
import { computer } from "./computer.js";

export const displayController = (function () {
  const updateScreen = () => {
    window.scrollTo(0, 0);

    const gameDiv = document.querySelector(".game-div");
    const topLineMenuDiv = document.querySelector(".top-line-menu-div");

    // create column and row label arrays

    const columnLabelsText = "ABCDEFGHIJ".split("");
    const rowLabelsText = "1,2,3,4,5,6,7,8,9,10".split(",");

    // clear h2, gameDiv, topLineMenuDiv, opponent ships div, & board div

    if (gameDiv.previousElementSibling.nodeName === "H2") {
      gameDiv.previousElementSibling.remove();
    }
    gameDiv.textContent = "";
    topLineMenuDiv.textContent = "";
    if (gameDiv.nextElementSibling) gameDiv.nextElementSibling.remove();

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

      // show ship-placement screen if game is in that status

      if (game.getGameStatus() === "ship-placement") {
        const player1PlaceShipmentScreen = new PlaceShipmentScreen(
          activePlayer,
          "click-ship",
        );
        showShipPlacementScreen(player1PlaceShipmentScreen);
      } else {
        const mainContainer = document.querySelector(".main-container");
        const bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottom-div");
        mainContainer.append(bottomDiv);

        // add 'options' button & menu to top line

        createAndAddOptionsButton();

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
          infoDivTextDivFourthLine.textContent = `-The game ends once either you or your opponent sinks all of the other player's ships on the board`;
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
          if (
            game.getGameStatus() === "computer-attack" ||
            (game.getGameStatus() === "game-over" &&
              game.getWinner().type === "computer")
          ) {
            infoDivTextDivFirstLine.textContent = `The computer attacked: ${opponent.lastAttack.join("")}`;
          } else if (
            game.getGameStatus() === "active-player-attack" ||
            (game.getGameStatus() === "game-over" &&
              game.getWinner().id === activePlayer.id)
          ) {
            infoDivTextDivFirstLine.textContent = `You attacked: ${activePlayer.lastAttack.join("")}`;
          }

          const infoDivTextDivSecondLine = document.createElement("p");
          let result;
          if (
            game.getGameStatus() === "computer-attack" ||
            (game.getGameStatus() === "game-over" &&
              game.getWinner().type === "computer")
          ) {
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
            infoDivTextDivBottom.append(
              infoDivTextDivFourthLine,
              nextTurnOKBtn,
            );

            function initiateNextTurn() {
              if (game.getGameStatus() === "active-player-attack") {
                if (opponent.type === "computer") {
                  computer().computerAttack();

                  if (activePlayerGameboard.allShipsSunk()) {
                    game.setGameStatus("game-over");
                    game.setWinner(opponent);
                  } else game.setGameStatus("computer-attack");

                  displayController.updateScreen();

                  const infoDivTextDivTop = document.querySelector(
                    ".info-div-text-div-top",
                  );
                  const infoDivTextDivTop1 =
                    infoDivTextDivTop.firstElementChild;
                  const infoDivTextDivTop2 =
                    infoDivTextDivTop1.nextElementSibling;

                  if (game.getGameStatus() === "game-over") {
                    const gameOverDiv =
                      document.querySelector(".game-over-div");
                    const gameOverButtonsDiv =
                      document.querySelector(".game-over-buttons");

                    const computerMissedShips = document.querySelectorAll(
                      ".game-over-regular-wait",
                    );
                    const computerMissedShipsHits = document.querySelectorAll(
                      ".game-over-hit-ship-wait",
                    );

                    setTimeout(() => {
                      infoDivTextDivTop1.classList.remove("hidden");
                    }, 1000);

                    setTimeout(() => {
                      infoDivTextDivTop2.classList.remove("hidden");
                    }, 2500);

                    setTimeout(() => {
                      const ids = ["2", "3A", "3B", "4", "5"];
                      computerMissedShips.forEach((ship) => {
                        ship.classList.remove("game-over-regular-wait");
                        ids.forEach((id) => {
                          if (
                            opponentBoard[Number(ship.dataset.row)][
                              Number(ship.dataset.column)
                            ].includes(id)
                          ) {
                            if (id === "3A" || id === "3B")
                              ship.textContent = "3";
                            else ship.textContent = id;
                          }
                        });
                      });
                      if (computerMissedShipsHits !== undefined) {
                        computerMissedShipsHits.forEach((ship) => {
                          ship.classList.remove("game-over-hit-ship-wait");
                          ids.forEach((id) => {
                            if (
                              opponentBoard[Number(ship.dataset.row)][
                                Number(ship.dataset.column)
                              ].includes(id)
                            ) {
                              if (id === "3A" || id === "3B")
                                ship.textContent = "3";
                              else ship.textContent = id;
                            }
                          });
                        });
                      }
                    }, 4000);

                    setTimeout(() => {
                      gameOverDiv.classList.remove("hidden");
                    }, 4000);

                    setTimeout(() => {
                      gameOverButtonsDiv.classList.remove("hidden");
                    }, 4000);
                  }

                  if (game.getGameStatus() === "computer-attack") {
                    let sinkTextDiv;
                    let infoDivNextTurn;

                    if (opponent.lastAttackResult === "SINK") {
                      sinkTextDiv = document.querySelector(".sink-text-div");
                      infoDivNextTurn = sinkTextDiv.nextElementSibling;
                    } else
                      infoDivNextTurn = infoDivTextDivTop.nextElementSibling;

                    const infoDivTextDivBottom = document.querySelector(
                      ".info-div-text-div-bottom",
                    );

                    const waitSquares = document.querySelectorAll(".wait");
                    setTimeout(() => {
                      waitSquares.forEach((square) =>
                        square.classList.remove("wait"),
                      );
                    }, 1000);

                    setTimeout(() => {
                      infoDivTextDivTop1.classList.remove("hidden");
                    }, 1000);
                    setTimeout(() => {
                      infoDivTextDivTop2.classList.remove("hidden");
                    }, 2500);

                    if (opponent.lastAttackResult === "SINK") {
                      setTimeout(() => {
                        sinkTextDiv.classList.remove("hidden");
                      }, 4000);
                      setTimeout(() => {
                        infoDivNextTurn.classList.remove("hidden");
                      }, 5500);
                      setTimeout(() => {
                        infoDivTextDivBottom.classList.remove("hidden");
                      }, 5500);
                    } else {
                      setTimeout(() => {
                        infoDivNextTurn.classList.remove("hidden");
                      }, 4000);
                      setTimeout(() => {
                        infoDivTextDivBottom.classList.remove("hidden");
                      }, 4000);
                    }
                  }
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

            infoDivTextDiv.append(
              infoDivTextDivThirdLine,
              infoDivTextDivBottom,
            );
          } else {
            const gameOverDiv = document.createElement("div");
            gameOverDiv.classList.add("game-over-div");
            const gameOverText1 = document.createElement("p");
            gameOverText1.textContent = "*GAME OVER!*";
            const gameOverText2 = document.createElement("p");
            if (opponentGameboard.allShipsSunk()) {
              if (opponent.type === "computer")
                gameOverText2.textContent = `Congrats! You win!`;
              else gameOverText2.textContent = `${activePlayer.name} wins!`;
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

            playAgainOKBtn.addEventListener("click", () => {
              if (game.getPlayer2().type === "computer") {
                game.startGame(game.getPlayer1().name);
              } else {
                game.startGame(
                  game.getPlayer1().name,
                  game.getPlayer2().name,
                  "human",
                );
              }
              game.setGameStatus("ship-placement");
              displayController.updateScreen();
            });
            changePlayersBtn.addEventListener("click", activateNewGame);
          }
        }

        infoDiv.append(infoDivPlayersDiv, infoDivTextDiv);
        gameDiv.append(infoDiv);

        if (
          game.getGameStatus() === "active-player-attack" ||
          game.getGameStatus() === "computer-attack" ||
          game.getGameStatus() === "game-over"
        ) {
          const infoDivTextDivTop = document.querySelector(
            ".info-div-text-div-top",
          );
          const infoDivTextDivTop1 = infoDivTextDivTop.firstElementChild;
          const infoDivTextDivTop2 = infoDivTextDivTop1.nextElementSibling;

          let sinkTextDiv;
          let infoDivNextTurn;

          if (game.getGameStatus() === "active-player-attack") {
            if (activePlayer.lastAttackResult === "SINK") {
              sinkTextDiv = document.querySelector(".sink-text-div");
              infoDivNextTurn = sinkTextDiv.nextElementSibling;
            } else infoDivNextTurn = infoDivTextDivTop.nextElementSibling;
          } else if (!(game.getGameStatus() === "game-over")) {
            if (opponent.lastAttackResult === "SINK") {
              sinkTextDiv = document.querySelector(".sink-text-div");
              infoDivNextTurn = sinkTextDiv.nextElementSibling;
            } else infoDivNextTurn = infoDivTextDivTop.nextElementSibling;
          }

          const gameOverDiv = document.querySelector(".game-over-div");
          const gameOverButtonsDiv =
            document.querySelector(".game-over-buttons");

          const infoDivTextDivBottom = document.querySelector(
            ".info-div-text-div-bottom",
          );

          if (
            game.getGameStatus() === "computer-attack" ||
            (game.getGameStatus() === "game-over" &&
              game.getWinner().type === "computer")
          ) {
            infoDivTextDivTop1.classList.add("hidden");
          }

          infoDivTextDivTop2.classList.add("hidden");

          if (
            (game.getGameStatus() === "active-player-attack" &&
              activePlayer.lastAttackResult === "SINK") ||
            (game.getGameStatus() === "computer-attack" &&
              opponent.lastAttackResult === "SINK")
          ) {
            sinkTextDiv.classList.add("hidden");
          }

          if (game.getGameStatus() === "game-over") {
            gameOverDiv.classList.add("hidden");
            gameOverButtonsDiv.classList.add("hidden");
          }

          if (!(game.getGameStatus() === "game-over")) {
            infoDivNextTurn.classList.add("hidden");
            infoDivTextDivBottom.classList.add("hidden");
          }
        }

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
                    if (square.includes("is sunk"))
                      newSquare.classList.add("is-sunk");
                    else {
                      newSquare.classList.add("missed-ship");
                      if (square.includes("hit")) {
                        newSquare.classList.add("game-over-hit-ship-wait");
                        newSquare.textContent = "X";
                      } else newSquare.classList.add("game-over-regular-wait");
                    }
                    if (!newSquare.classList.contains("missed-ship")) {
                      if (id === "3A" || id === "3B")
                        newSquare.textContent = "3";
                      else newSquare.textContent = id;
                    }
                  }
                });
              } else {
                if (square.includes("hit")) {
                  newSquare.classList.add("hit");
                  if (square.includes("is sunk")) {
                    newSquare.classList.add("is-sunk");
                    const ids = ["2", "3A", "3B", "4", "5"];
                    const matchingID = ids.filter((id) =>
                      square.includes(id),
                    )[0];
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
            if (
              opponentBoard[selectedRow][selectedColumn].includes("is sunk")
            ) {
              activePlayer.lastAttackResult = "SINK";
            } else activePlayer.lastAttackResult = "HIT";
          }
          if (opponentGameboard.allShipsSunk()) {
            game.setGameStatus("game-over");
            game.setWinner(activePlayer);
          } else {
            game.setGameStatus("active-player-attack");
          }

          displayController.updateScreen();

          const infoDivTextDivTop = document.querySelector(
            ".info-div-text-div-top",
          );

          if (game.getGameStatus() === "game-over") {
            const infoDivTextDivTop1 = infoDivTextDivTop.firstElementChild;
            const infoDivTextDivTop2 = infoDivTextDivTop1.nextElementSibling;

            const gameOverDiv = document.querySelector(".game-over-div");
            const gameOverButtonsDiv =
              document.querySelector(".game-over-buttons");

            setTimeout(() => {
              infoDivTextDivTop1.classList.remove("hidden");
            }, 1000);

            setTimeout(() => {
              infoDivTextDivTop2.classList.remove("hidden");
            }, 2500);

            setTimeout(() => {
              gameOverDiv.classList.remove("hidden");
            }, 4000);

            setTimeout(() => {
              gameOverButtonsDiv.classList.remove("hidden");
            }, 4000);
          }

          if (game.getGameStatus() === "active-player-attack") {
            const infoDivTextDivTop2 = infoDivTextDivTop.lastElementChild;

            let sinkTextDiv;
            let infoDivNextTurn;

            if (activePlayer.lastAttackResult === "SINK") {
              sinkTextDiv = document.querySelector(".sink-text-div");
              infoDivNextTurn = sinkTextDiv.nextElementSibling;
            } else infoDivNextTurn = infoDivTextDivTop.nextElementSibling;

            const infoDivTextDivBottom = document.querySelector(
              ".info-div-text-div-bottom",
            );

            setTimeout(() => {
              infoDivTextDivTop2.classList.remove("hidden");
            }, 1500);

            if (activePlayer.lastAttackResult === "SINK") {
              setTimeout(() => {
                sinkTextDiv.classList.remove("hidden");
              }, 3000);
              setTimeout(() => {
                infoDivNextTurn.classList.remove("hidden");
              }, 4500);
              setTimeout(() => {
                infoDivTextDivBottom.classList.remove("hidden");
              }, 4500);
            } else {
              setTimeout(() => {
                infoDivNextTurn.classList.remove("hidden");
              }, 3000);
              setTimeout(() => {
                infoDivTextDivBottom.classList.remove("hidden");
              }, 3000);
            }
          }
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

        if (game.getGameStatus() === "computer-attack") {
          const attackedSquareRow = rowLabelsText.indexOf(
            opponent.lastAttack[1],
          );
          const attackedSquareColumn = columnLabelsText.indexOf(
            opponent.lastAttack[0],
          );

          const activePlayerSection = document.querySelector(
            ".active-player-section",
          );
          const attackedSquare = activePlayerSection.querySelector(
            `[data-row="${attackedSquareRow}"][data-column="${attackedSquareColumn}"]`,
          );

          if (!(opponent.lastAttackResult === "SINK")) {
            attackedSquare.classList.add("wait");
          } else {
            const ids = ["2", "3A", "3B", "4", "5"];
            const idArray = activePlayerBoard[attackedSquareRow][
              attackedSquareColumn
            ].filter((item) => ids.includes(item));
            const id = idArray[0];
            const idSquares = [];
            activePlayerBoard.forEach((row, index) => {
              let rowIndex = index;
              row.forEach((square, index) => {
                if (Array.isArray(square)) {
                  if (square.includes(id)) {
                    idSquares.push(
                      activePlayerSection.querySelector(
                        `[data-row="${rowIndex}"][data-column="${index}"]`,
                      ),
                    );
                  }
                }
              });
            });
            idSquares.forEach((square) => square.classList.add("wait"));
          }
        }

        // fill in opponent ship count

        const bottomDivText = document.createElement("p");
        bottomDivText.textContent = `Opponent ships remaining:`;
        bottomDiv.append(bottomDivText);

        // without the below code, if the game ends and the opponent has no more ships remaining, the
        // empty "opponent ships" section at the bottom of the page might shift the other elements on
        // the page in an undesired way. creating and formatting an empty square div prevents this

        if (opponentGameboard.allShipsSunk()) {
          const emptySquareDiv = document.createElement("div");
          emptySquareDiv.classList.add("empty-square-div");
          bottomDiv.append(emptySquareDiv);
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
            bottomDiv.append(shipDiv);
          }
        });

        // show pass screen dialog if 2-player game

        if (game.getPlayer2().type === "human") {
          if (game.getGameStatus() === "player-turn") {
            const nextPlayerTurnDialog = document.createElement("dialog");
            nextPlayerTurnDialog.id = "next-player-turn-dialog";
            const nextPlayerTurnDialogDiv = document.createElement("div");
            const activePlayerName = document.createElement("span");
            activePlayerName.classList.add("next-player-dialog-player2-name");
            activePlayerName.textContent = activePlayer.name;
            const clonedActivePlayerName = activePlayerName.cloneNode(true);
            const clonedActivePlayerName2 = activePlayerName.cloneNode(true);
            const opponentName = document.createElement("span");
            opponentName.classList.add("next-player-dialog-player1-name");
            opponentName.textContent = opponent.name;
            const line1 = document.createElement("p");
            line1.append("Next up: ", activePlayerName);
            const line2 = document.createElement("p");
            line2.append(
              opponentName,
              ", pass the screen to ",
              clonedActivePlayerName,
              "!",
            );
            const line3 = document.createElement("p");
            line3.append(
              clonedActivePlayerName2,
              ", click OK when you're ready!",
            );
            const nextPlayerTurnDialogButtons = document.createElement("div");
            nextPlayerTurnDialogButtons.classList.add(
              "next-player-dialog-buttons",
            );

            const okBtn = document.createElement("button");
            okBtn.textContent = "OK";
            nextPlayerTurnDialogButtons.append(okBtn);
            nextPlayerTurnDialogDiv.append(
              line1,
              line2,
              line3,
              nextPlayerTurnDialogButtons,
            );
            nextPlayerTurnDialog.append(nextPlayerTurnDialogDiv);
            mainContainer.append(nextPlayerTurnDialog);

            okBtn.addEventListener("click", () => {
              nextPlayerTurnDialog.close();
              nextPlayerTurnDialog.remove();

              if (opponent.lastAttack !== null) {
                const lastTurnDialog = document.createElement("dialog");
                lastTurnDialog.id = "last-turn-dialog";
                const lastTurnDialogDiv = document.createElement("div");
                const lastTurnLine1 = document.createElement("p");
                const lastTurnDialogOpponentName =
                  document.createElement("span");
                lastTurnDialogOpponentName.classList.add(
                  "next-player-dialog-player1-name",
                );
                lastTurnDialogOpponentName.textContent = opponent.name;
                lastTurnLine1.append(
                  "Last turn: ",
                  lastTurnDialogOpponentName,
                  ` attacked ${opponent.lastAttack.join("")}`,
                );
                const lastTurnLine2 = document.createElement("p");
                let result;
                if (opponent.lastAttackResult === "SINK") result = "HIT";
                else result = opponent.lastAttackResult;
                lastTurnLine2.textContent = "This was a " + result;
                const lastTurnLine3 = document.createElement("p");
                const lastTurnLine4 = document.createElement("p");
                if (opponent.lastAttackResult === "SINK") {
                  lastTurnLine3.textContent = "*SHIP SUNK!*";
                  lastTurnLine3.classList.add("ship-sunk-text");
                  lastTurnLine4.textContent = "Click OK to continue:";
                } else lastTurnLine3.textContent = "Click OK to continue:";
                const lastTurnOKBtnDiv = document.createElement("div");
                lastTurnOKBtnDiv.classList.add("next-player-dialog-buttons");
                const lastTurnOKBtn = document.createElement("button");
                lastTurnOKBtn.textContent = "OK";
                lastTurnOKBtnDiv.append(lastTurnOKBtn);
                lastTurnDialogDiv.append(
                  lastTurnLine1,
                  lastTurnLine2,
                  lastTurnLine3,
                  lastTurnOKBtnDiv,
                );
                if (opponent.lastAttackResult === "SINK")
                  lastTurnOKBtnDiv.before(lastTurnLine4);
                lastTurnDialog.append(lastTurnDialogDiv);
                mainContainer.append(lastTurnDialog);

                lastTurnOKBtn.addEventListener("click", () => {
                  lastTurnDialog.close();
                  lastTurnDialog.remove();
                });

                lastTurnDialog.showModal();
              }
            });

            nextPlayerTurnDialog.showModal();
          }
        }
      }
    }
  };

  updateScreen();

  return { updateScreen };
})();
