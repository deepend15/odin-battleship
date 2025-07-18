export function showShipPlacementScreen(playerScreen) {
  const player = playerScreen.player;
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
  }

  // const line2 = document.createElement("p");
  // line2.textContent =
  //   "2. Click a square on the board to select that ship's starting square (alternatively, you may type in the capital letter and number of the square's coordinates, e.g. A1)";
  // const line3 = document.createElement("p");
  // line3.textContent =
  //   "3. Click a square on the board (or type in the square's coordinates) to select the ship's ending square";
  // const line4 = document.createElement("p");
  // line4.textContent = "4. Click OK";
  // const line5 = document.createElement("p");
  // line5.textContent = "5. Repeat Steps 1-4 for each remaining ship";
  // const line6 = document.createElement("p");
  // line6.textContent = "6. Click the green OK button";
  shipPlacementLines.append(line1);
  shipPlacementTextDiv.append(shipPlacementLines);
  // const shipPlacementNotes = document.createElement("div");
  // const note1 = document.createElement("p");
  // note1.textContent =
  //   "Make sure the distance between your two squares matches the length of each ship!";
  // const note2 = document.createElement("p");
  // note2.textContent = "*Note: Diagonals are not allowed.";
  // shipPlacementNotes.append(note1, note2);
  // shipPlacementTextDiv.append(shipPlacementNotes);
  shipPlacementSection.append(shipPlacementTextDiv);

  // create 'ship selection' div

  const shipSelectionDiv = document.createElement("div");
  shipSelectionDiv.classList.add("ship-selection-div");

  // const shipSelectionButtonsDiv = document.querySelector("button");
  // shipSelectionButtonsDiv.classList.add("ship-selections-button-div");

  playerShips.forEach((ship) => {
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
    shipSelectionDiv.append(shipButton);
  });

  shipPlacementSection.append(shipSelectionDiv);

  if (screenStatus === "click-ship") {
    const shipButtons = document.querySelectorAll(".ship-selection-button");
    shipButtons.forEach((shipButton) => {
      function toggleShipHover(e) {
        e.target.classList.toggle("ship-hover");
      }

      shipButton.addEventListener("mouseenter", toggleShipHover);
      shipButton.addEventListener("mouseleave", toggleShipHover);

      shipButton.addEventListener("click", () => {
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
        playerScreen.status = "starting-square";
        playerScreen.activeShip = matchingShip;
        showShipPlacementScreen(playerScreen);
      });
    });
  }

  const shipPlacementButtons = document.createElement("div");
  shipPlacementButtons.classList.add("ship-placement-buttons");
  const shipPlacementRandomBtn = document.createElement("button");

  if (screenStatus === "click-ship")
    shipPlacementRandomBtn.textContent = "Place my ships for me!";
  else shipPlacementRandomBtn.textContent = "Place this ship for me!";
  shipPlacementButtons.append(shipPlacementRandomBtn);
  shipPlacementSection.append(shipPlacementButtons);

  // const shipPlacementForm = document.createElement("form");

  // const playerShips = player.gameboard.ships;
  // playerShips.forEach((ship) => {
  //   const shipDiv = document.createElement("div");
  //   shipDiv.classList.add("form-ship-section");

  //   const shipLine = document.createElement("div");
  //   const shipText = document.createElement("p");
  //   shipText.textContent = "Ship:";
  //   const displayedShip = document.createElement("div");
  //   displayedShip.classList.add("ship-div");
  //   for (let i = 0; i < ship.length; i++) {
  //     const squareDiv = document.createElement("div");
  //     squareDiv.textContent = ship.length.toString();
  //     displayedShip.append(squareDiv);
  //   }
  //   shipLine.append(shipText, displayedShip);
  //   shipDiv.append(shipLine);

  // const square1Line = document.createElement("p");
  // const square1Label = document.createElement("label");
  // square1Label.setAttribute("for", `${ship.id}-square1`);
  // square1Label.textContent = "Square 1:";
  // const square1Input = document.createElement("input");
  // square1Input.setAttribute("type", "text");
  // square1Input.setAttribute("id", `${ship.id}-square1`);
  // square1Input.setAttribute("name", `${ship.id}-square1`);
  // square1Input.setAttribute("required", "");
  // square1Line.append(square1Label, square1Input);
  // shipDiv.append(square1Line);

  // const square2Line = document.createElement("p");
  // const square2Label = document.createElement("label");
  // square2Label.setAttribute("for", `${ship.id}-square2`);
  // square2Label.textContent = "Square 2:";
  // const square2Input = document.createElement("input");
  // square2Input.setAttribute("type", "text");
  // square2Input.setAttribute("id", `${ship.id}-square2`);
  // square2Input.setAttribute("name", `${ship.id}-square2`);
  // square2Input.setAttribute("required", "");
  // square2Line.append(square2Label, square2Input);
  // shipDiv.append(square2Line);

  // const shipDivOKBtn = document.createElement("button");
  // shipDivOKBtn.setAttribute("type", "button");
  // shipDivOKBtn.textContent = "OK";
  // shipDiv.append(shipDivOKBtn);

  //   shipPlacementForm.append(shipDiv);
  // });

  // create board

  const playerBoardDiv = document.createElement("div");
  playerBoardDiv.classList.add("board-div");
  if (screenStatus === "click-ship") playerBoardDiv.classList.add("inactive-board");
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
  for (let i = 0; i < 100; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    blankBoardDiv.append(newSquare);
  }
  gameDiv.append(playerBoardDiv);
}
