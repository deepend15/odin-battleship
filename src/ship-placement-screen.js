import { game } from "./game.js";
import { possiblePositions } from "./possible-ship-positions.js";
import { randomShipPlacement } from "./random-ship-placement.js";
import { displayController } from "./display-controller.js";
import { PlaceShipmentScreen } from "./ship-placement-screen-class.js";

export function showShipPlacementScreen(playerScreen) {
  const player = playerScreen.player;
  const player2 = game.getPlayer2();
  const playerShips = player.gameboard.ships;
  const screenStatus = playerScreen.status;
  const activeShip = playerScreen.activeShip;

  const gameDiv = document.querySelector(".game-div");

  // create column and row label arrays

  const columnLabelsText = "ABCDEFGHIJ".split("");
  const rowLabelsText = "1,2,3,4,5,6,7,8,9,10".split(",");

  // clear gameDiv & h2 if present

  gameDiv.textContent = "";
  if (gameDiv.previousElementSibling.nodeName === "H2") {
    gameDiv.previousElementSibling.remove();
  }

  // create ship-placement h2

  const h2 = document.createElement("h2");
  h2.textContent = `${player.name}, place your ships on your board!`;
  gameDiv.before(h2);

  // create 'ship placement section' div

  const shipPlacementSection = document.createElement("div");
  shipPlacementSection.classList.add("ship-placement-section");
  gameDiv.append(shipPlacementSection);

  // create 'ship placement text' div

  const shipPlacementTextDiv = document.createElement("div");
  shipPlacementTextDiv.classList.add("ship-placement-text-div");
  const shipPlacementLines = document.createElement("div");
  shipPlacementLines.classList.add("ship-placement-lines");
  const line1 = document.createElement("p");

  switch (screenStatus) {
    case "click-ship":
      line1.textContent = "Click on a ship:";
      break;
    case "starting-square":
      line1.textContent = "Click a starting square on your board.";
      break;
    case "ending-square":
      line1.textContent =
        "Click an available position on your board to place your ship.";
      break;
    case "next-player-ready":
      line1.textContent = `Click "Continue" to allow ${player2.name} to place their ships!`;
      break;
    case "game-ready":
      line1.textContent = 'Click "Start Game" to start the game!';
      break;
  }

  shipPlacementLines.append(line1);
  shipPlacementTextDiv.append(shipPlacementLines);

  shipPlacementSection.append(shipPlacementTextDiv);

  // create 'ship selection' div

  const shipSelectionDiv = document.createElement("div");
  shipSelectionDiv.classList.add("ship-selection-div");

  playerShips.forEach((ship) => {
    const shipSelectionLine = document.createElement("div");
    shipSelectionLine.classList.add("ship-selection-line");

    const shipButton = document.createElement("button");
    shipButton.classList.add("ship-selection-button");

    if (activeShip !== null) {
      if (ship.id === activeShip.id) shipButton.classList.add("active-ship");
      else shipButton.classList.add("inactive-ship");
    }

    const shipText = document.createElement("p");
    switch (ship.id) {
      case "5":
        shipText.textContent = "Carrier:";
        break;
      case "4":
        shipText.textContent = "Battleship:";
        break;
      case "3A":
        shipText.textContent = "Destroyer:";
        break;
      case "3B":
        shipText.textContent = "Submarine:";
        break;
      case "2":
        shipText.textContent = "Patrol Boat:";
        break;
    }

    const displayedShip = document.createElement("div");
    displayedShip.classList.add("ship-div");
    for (let i = 0; i < ship.length; i++) {
      const squareDiv = document.createElement("div");
      squareDiv.textContent = ship.length.toString();
      displayedShip.append(squareDiv);
    }

    shipButton.append(shipText, displayedShip);
    shipSelectionLine.append(shipButton);

    const placedText = document.createElement("p");
    let placedSymbol;
    if (ship.placed === true) {
      placedText.classList.add("placed-text-placed");
      placedSymbol = "\u2705";
    } else {
      placedText.classList.add("placed-text-not-placed");
      placedSymbol = "\uD83D\uDDD9";
    }
    placedText.textContent = placedSymbol + " placed";
    shipSelectionLine.append(placedText);

    shipSelectionDiv.append(shipSelectionLine);
  });

  shipPlacementSection.append(shipSelectionDiv);

  if (
    screenStatus === "click-ship" ||
    screenStatus === "game-ready" ||
    screenStatus === "next-player-ready"
  ) {
    const shipButtons = document.querySelectorAll(".ship-selection-button");
    shipButtons.forEach((shipButton) => {
      function getMatchingShip() {
        let selectedID;
        const shipText = shipButton.firstElementChild.textContent;
        switch (shipText) {
          case "Carrier:":
            selectedID = "5";
            break;
          case "Battleship:":
            selectedID = "4";
            break;
          case "Destroyer:":
            selectedID = "3A";
            break;
          case "Submarine:":
            selectedID = "3B";
            break;
          case "Patrol Boat:":
            selectedID = "2";
            break;
        }
        const matchingShip = playerShips.filter(
          (ship) => ship.id === selectedID,
        )[0];
        return matchingShip;
      }

      if (
        shipButton.nextElementSibling.classList.contains("placed-text-placed")
      ) {
        shipButton.classList.add("inactive-ship");
        const editShipButton = document.createElement("button");
        editShipButton.classList.add("edit-ship-button");
        editShipButton.textContent = "re-place";
        shipButton.parentElement.append(editShipButton);
        editShipButton.addEventListener("click", () => {
          const matchingShip = getMatchingShip();
          playerBoard.forEach((row) => {
            for (let i = 0; i < row.length; i++) {
              if (Array.isArray(row[i])) {
                if (row[i].includes(matchingShip.id)) {
                  row[i] = null;
                }
              }
            }
          });
          matchingShip.placed = false;
          playerScreen.activeShip = matchingShip;
          playerScreen.status = "starting-square";
          showShipPlacementScreen(playerScreen);
        });
      } else {
        if (screenStatus === "click-ship") {
          function toggleShipHover(e) {
            e.target.classList.toggle("ship-hover");
          }

          shipButton.addEventListener("mouseenter", toggleShipHover);
          shipButton.addEventListener("mouseleave", toggleShipHover);

          shipButton.addEventListener("click", () => {
            playerScreen.status = "starting-square";
            playerScreen.activeShip = getMatchingShip();
            showShipPlacementScreen(playerScreen);
          });
        }
      }
    });
  }

  const shipPlacementButtons = document.createElement("div");
  shipPlacementButtons.classList.add("ship-placement-buttons");

  if (screenStatus === "game-ready") {
    const startGameBtn = document.createElement("button");
    startGameBtn.classList.add("start-game-button");
    startGameBtn.textContent = "Start Game";
    shipPlacementButtons.append(startGameBtn);
    startGameBtn.addEventListener("click", () => {
      if (player2.type === "computer") {
        const computerShips = player2.gameboard.ships;
        computerShips.forEach((ship) =>
          randomShipPlacement(player2).placeInRandomPosition(ship),
        );
      }
      game.setGameStatus("player-turn");
      displayController.updateScreen();
      // function computerWinGame() {
      //   const playerBoard = player.gameboard.getBoard();

      //   const ids = ["2", "3A", "3B", "4", "5"];

      //   playerBoard.forEach((row, index) => {
      //     const rowIndex = index;
      //     row.forEach((square, index) => {
      //       if (Array.isArray(square)) {
      //         ids.forEach((id) => {
      //           if (square.includes(id)) {
      //             player.gameboard.receiveAttack([rowIndex, index]);
      //           }
      //         });
      //       }
      //     });
      //   });

      //   player2.lastAttack = ["J", "10"];
      //   player2.lastAttackResult = "MISS";
      //   game.setGameStatus("game-over");
      //   game.setWinner(player2);
      //   displayController.updateScreen();
      // }

      // computerWinGame();
    });
  } else if (screenStatus === "next-player-ready") {
    const continueBtn = document.createElement("button");
    continueBtn.classList.add("start-game-button");
    continueBtn.textContent = "Continue";
    shipPlacementButtons.append(continueBtn);
    continueBtn.addEventListener("click", () => {
      const mainContainer = document.querySelector(".main-container");
      const nextPlayerShipPlacementDialog = document.createElement("dialog");
      nextPlayerShipPlacementDialog.id = "next-player-ship-placement-dialog";
      const nextPlayerShipPlacementDialogDiv = document.createElement("div");
      const player1Name = document.createElement("span");
      player1Name.classList.add("next-player-dialog-player1-name");
      player1Name.textContent = player.name;
      const player2Name = document.createElement("span");
      player2Name.classList.add("next-player-dialog-player2-name");
      player2Name.textContent = player2.name;
      const clonedPlayer2Name = player2Name.cloneNode(true);
      const nextPlayerShipPlacementDialogText1 = document.createElement("p");
      nextPlayerShipPlacementDialogText1.append(
        player1Name,
        ", pass the screen to ",
      );
      nextPlayerShipPlacementDialogText1.append(
        player2Name,
        " so they can place their ships!",
      );
      const nextPlayerShipPlacementDialogText2 = document.createElement("p");
      nextPlayerShipPlacementDialogText2.append(
        clonedPlayer2Name,
        ", click OK when you're ready to continue!",
      );
      const nextPlayerShipPlacementDialogButtons =
        document.createElement("div");
      nextPlayerShipPlacementDialogButtons.classList.add(
        "next-player-dialog-buttons",
      );
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";
      nextPlayerShipPlacementDialogButtons.append(cancelBtn, okBtn);
      nextPlayerShipPlacementDialogDiv.append(
        nextPlayerShipPlacementDialogText1,
        nextPlayerShipPlacementDialogText2,
        nextPlayerShipPlacementDialogButtons,
      );
      nextPlayerShipPlacementDialog.append(nextPlayerShipPlacementDialogDiv);
      mainContainer.append(nextPlayerShipPlacementDialog);

      cancelBtn.addEventListener("click", () =>
        nextPlayerShipPlacementDialog.close(),
      );

      okBtn.addEventListener("click", () => {
        nextPlayerShipPlacementDialog.close();
        nextPlayerShipPlacementDialog.remove();
        const player2PlaceShipmentScreen = new PlaceShipmentScreen(
          player2,
          "click-ship",
        );
        showShipPlacementScreen(player2PlaceShipmentScreen);
      });

      nextPlayerShipPlacementDialog.showModal();
    });
  } else {
    const shipPlacementRandomBtn = document.createElement("button");
    shipPlacementRandomBtn.classList.add("ship-placement-random-button");

    if (screenStatus === "click-ship") {
      shipPlacementRandomBtn.textContent = "Place my ships for me!";
      shipPlacementRandomBtn.addEventListener("click", () => {
        playerShips.forEach((ship) => {
          if (!ship.placed)
            randomShipPlacement(player).placeInRandomPosition(ship);
        });
        playerScreen.activeShip = null;
        playerScreen.selectedStartingSquare = null;
        if (
          player2.type === "computer" ||
          (player2.type === "human" && player.id === "Player 2")
        ) {
          playerScreen.status = "game-ready";
        } else playerScreen.status = "next-player-ready";

        showShipPlacementScreen(playerScreen);
      });
    } else {
      shipPlacementRandomBtn.textContent = "Place this ship for me!";
      if (screenStatus === "starting-square") {
        shipPlacementRandomBtn.addEventListener("click", () => {
          randomShipPlacement(player).placeInRandomPosition(activeShip);
          activeShip.placed = true;
          playerScreen.activeShip = null;
          playerScreen.selectedStartingSquare = null;
          const nonPlacedShips = playerShips.filter((ship) => !ship.placed);
          if (nonPlacedShips.length === 0) {
            if (
              player2.type === "computer" ||
              (player2.type === "human" && player.id === "Player 2")
            ) {
              playerScreen.status = "game-ready";
            } else playerScreen.status = "next-player-ready";
          } else playerScreen.status = "click-ship";
          showShipPlacementScreen(playerScreen);
        });
      }
      if (screenStatus === "ending-square") {
        shipPlacementRandomBtn.addEventListener("click", () => {
          randomShipPlacement(player).placeInRandomPosition(
            activeShip,
            playerScreen.selectedStartingSquare,
          );
          activeShip.placed = true;
          playerScreen.activeShip = null;
          playerScreen.selectedStartingSquare = null;
          const nonPlacedShips = playerShips.filter((ship) => !ship.placed);
          if (nonPlacedShips.length === 0) {
            if (
              player2.type === "computer" ||
              (player2.type === "human" && player.id === "Player 2")
            ) {
              playerScreen.status = "game-ready";
            } else playerScreen.status = "next-player-ready";
          } else playerScreen.status = "click-ship";
          showShipPlacementScreen(playerScreen);
        });
      }
    }

    shipPlacementButtons.append(shipPlacementRandomBtn);
  }

  const resetBoardButton = document.createElement("button");
  resetBoardButton.classList.add("reset-board-button");
  resetBoardButton.textContent = "Reset board";
  shipPlacementButtons.append(resetBoardButton);

  resetBoardButton.addEventListener("click", () => {
    player.gameboard.clearBoard();
    playerShips.forEach((ship) => (ship.placed = false));
    playerScreen.activeShip = null;
    playerScreen.selectedStartingSquare = null;
    playerScreen.status = "click-ship";
    showShipPlacementScreen(playerScreen);
  });

  shipPlacementSection.append(shipPlacementButtons);

  // create board

  const playerBoard = player.gameboard.getBoard();

  const playerBoardDiv = document.createElement("div");
  playerBoardDiv.classList.add("board-div");
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
  playerBoardDiv.append(columnLabels, rowLabels, blankBoardDiv);

  playerBoard.forEach((row, index) => {
    let rowIndex = index;
    row.forEach((square, index) => {
      const newSquare = document.createElement("div");
      newSquare.classList.add("square");
      newSquare.dataset.row = rowIndex;
      newSquare.dataset.column = index;

      if (square !== null) {
        if (square.includes("3A") || square.includes("3B"))
          newSquare.textContent = "3";
        else newSquare.textContent = square[0];
      }

      blankBoardDiv.append(newSquare);

      if (
        screenStatus === "game-ready" ||
        screenStatus === "next-player-ready"
      ) {
        if (!(newSquare.textContent === "")) {
          newSquare.classList.add("active-player-ship");
        }
      }

      if (screenStatus === "ending-square") {
        const newSquareCoordinates = [
          Number(newSquare.dataset.row),
          Number(newSquare.dataset.column),
        ];

        if (
          newSquareCoordinates[0] === playerScreen.selectedStartingSquare[0] &&
          newSquareCoordinates[1] === playerScreen.selectedStartingSquare[1]
        ) {
          newSquare.classList.add("neutral-square");
        } else {
          const startingSquarePossiblePositions = possiblePositions(
            activeShip,
            playerScreen.selectedStartingSquare,
          );

          function isIn(smallArray, largeArray) {
            const match = largeArray.filter(
              (array) =>
                array[0] === smallArray[0] && array[1] === smallArray[1],
            );
            if (match.length !== 0) return true;
            return false;
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

          if (
            startingSquarePossiblePositions.firstPosition !== null &&
            isIn(
              newSquareCoordinates,
              startingSquarePossiblePositions.firstPosition,
            ) &&
            !occupied(startingSquarePossiblePositions.firstPosition)
          ) {
            newSquare.classList.add("position-1");
          } else if (
            startingSquarePossiblePositions.secondPosition !== null &&
            isIn(
              newSquareCoordinates,
              startingSquarePossiblePositions.secondPosition,
            ) &&
            !occupied(startingSquarePossiblePositions.secondPosition)
          ) {
            newSquare.classList.add("position-2");
          } else if (
            startingSquarePossiblePositions.thirdPosition !== null &&
            isIn(
              newSquareCoordinates,
              startingSquarePossiblePositions.thirdPosition,
            ) &&
            !occupied(startingSquarePossiblePositions.thirdPosition)
          ) {
            newSquare.classList.add("position-3");
          } else if (
            startingSquarePossiblePositions.fourthPosition !== null &&
            isIn(
              newSquareCoordinates,
              startingSquarePossiblePositions.fourthPosition,
            ) &&
            !occupied(startingSquarePossiblePositions.fourthPosition)
          ) {
            newSquare.classList.add("position-4");
          } else {
            newSquare.classList.add("inactive-square");
          }
        }
      }
    });
  });

  gameDiv.append(playerBoardDiv);

  if (screenStatus === "click-ship")
    playerBoardDiv.classList.add("inactive-board");
  if (screenStatus === "starting-square") {
    const boardSquares = document.querySelectorAll(".square");

    function toggleSquareHover(e) {
      e.target.classList.toggle("hover");
    }

    boardSquares.forEach((square) => {
      if (square.textContent === "") {
        square.addEventListener("mouseover", toggleSquareHover);
        square.addEventListener("mouseout", toggleSquareHover);

        square.addEventListener("click", (e) => {
          const startingSquare = [
            Number(e.target.dataset.row),
            Number(e.target.dataset.column),
          ];

          function isValid(startingSquare) {
            const startingSquarePossiblePositionsObject = possiblePositions(
              activeShip,
              startingSquare,
            );
            const startingSquarePossiblePositions = Object.values(
              startingSquarePossiblePositionsObject,
            );
            const validStartingSquarePossiblePositions =
              startingSquarePossiblePositions.filter((array) => array !== null);

            function occupied(position) {
              let answer = false;
              position.forEach((value) => {
                if (playerBoard[value[0]][value[1]] !== null) {
                  answer = true;
                }
              });
              return answer;
            }

            const occupiedValidPositions = [];

            validStartingSquarePossiblePositions.forEach((position) => {
              if (occupied(position)) {
                occupiedValidPositions.push(position);
              }
            });

            if (
              occupiedValidPositions.length ===
              validStartingSquarePossiblePositions.length
            )
              return false;
            else return true;
          }
          if (isValid(startingSquare)) {
            playerScreen.selectedStartingSquare = startingSquare;
            playerScreen.status = "ending-square";
            showShipPlacementScreen(playerScreen);
          } else {
            const shipPlacementLines = document.querySelector(
              ".ship-placement-lines",
            );
            shipPlacementLines.textContent =
              "Invalid square! Choose another starting square.";
          }
        });
      } else square.classList.add("active-player-ship");
    });
  }
  if (screenStatus === "ending-square") {
    let position1Squares = [];
    let position2Squares = [];
    let position3Squares = [];
    let position4Squares = [];

    const boardSquares = document.querySelectorAll(".square");

    boardSquares.forEach((square) => {
      if (square.classList.contains("position-1"))
        position1Squares.push(square);
      if (square.classList.contains("position-2"))
        position2Squares.push(square);
      if (square.classList.contains("position-3"))
        position3Squares.push(square);
      if (square.classList.contains("position-4"))
        position4Squares.push(square);
    });

    const positionSquareGroups = [
      position1Squares,
      position2Squares,
      position3Squares,
      position4Squares,
    ];

    positionSquareGroups.forEach((group) => {
      if (group.length !== 0) {
        group.forEach((square) => {
          square.addEventListener("mouseover", () => {
            const neutralSquare = document.querySelector(".neutral-square");
            neutralSquare.classList.toggle("position-group-hover");
            neutralSquare.textContent = activeShip.length;
            group.forEach((square) => {
              square.classList.toggle("position-group-hover");
              square.textContent = activeShip.length;
            });
          });
          square.addEventListener("mouseout", () => {
            const neutralSquare = document.querySelector(".neutral-square");
            neutralSquare.classList.toggle("position-group-hover");
            neutralSquare.textContent = "";
            group.forEach((square) => {
              square.classList.toggle("position-group-hover");
              square.textContent = "";
            });
          });
          square.addEventListener("click", () => {
            const selectedSquares = document.querySelectorAll(
              ".position-group-hover",
            );
            const firstSquare = selectedSquares[0];
            const lastSquare = selectedSquares[selectedSquares.length - 1];
            player.gameboard.placeShip(
              activeShip,
              [
                Number(firstSquare.dataset.row),
                Number(firstSquare.dataset.column),
              ],
              [
                Number(lastSquare.dataset.row),
                Number(lastSquare.dataset.column),
              ],
            );
            const matchingShip = playerShips.filter(
              (ship) => ship.id === activeShip.id,
            )[0];
            matchingShip.placed = true;
            playerScreen.activeShip = null;
            playerScreen.selectedStartingSquare = null;

            const nonPlacedShips = playerShips.filter((ship) => !ship.placed);
            if (nonPlacedShips.length === 0) {
              if (
                player2.type === "computer" ||
                (player2.type === "human" && player.id === "Player 2")
              ) {
                playerScreen.status = "game-ready";
              } else playerScreen.status = "next-player-ready";
            } else playerScreen.status = "click-ship";

            showShipPlacementScreen(playerScreen);
          });
        });
      }
    });
  }
}
