export function showShipPlacementScreen(player) {
  const gameDiv = document.querySelector(".game-div");

  // create column and row label arrays

  const columnLabelsText = "ABCDEFGHIJ".split("");
  const rowLabelsText = "1,2,3,4,5,6,7,8,9,10".split(",");

  // create 'ship placement text' div 1

  const shipPlacementTextDiv1 = document.createElement("div");
  shipPlacementTextDiv1.classList.add("ship-placement-text-div-1");
  const shipPlacementText1 = document.createElement("p");
  shipPlacementText1.textContent = "Place your ships on your board:";
  const shipPlacementText2 = document.createElement("p");
  shipPlacementText2.textContent =
    "Choose the starting and ending squares where you want each ship to be placed on your board.";
  const shipPlacementText3 = document.createElement("p");
  shipPlacementText3.textContent =
    "Make sure the distance between your two squares matches the length of each ship!";
  const shipPlacementText4 = document.createElement("p");
  shipPlacementText4.textContent = "*Note: Diagonals are not allowed.";
  shipPlacementTextDiv1.append(
    shipPlacementText1,
    shipPlacementText2,
    shipPlacementText3,
    shipPlacementText4,
  );
  gameDiv.append(shipPlacementTextDiv1);

  // create 'ship placement text' div 2

  const shipPlacementTextDiv2 = document.createElement("div");
  shipPlacementTextDiv2.classList.add("ship-placement-text-div-2");
  const shipPlacementLines = document.createElement("div");
  shipPlacementLines.classList.add("ship-placement-lines");
  const line1 = document.createElement("p");
  line1.textContent = "To place a ship on your board:";
  const line2 = document.createElement("p");
  line2.textContent = "1. Click on a ship";
  const line3 = document.createElement("p");
  line3.textContent =
    "2. Click a square on the board to select that ship's starting square. Alternatively, you may type in the capital letter and number of the square's coordinates, (e.g. A1)";
  const line4 = document.createElement("p");
  line4.textContent =
    "3. Click a square on the board (or type in the square's coordinates) to select the ship's ending square";
  const line5 = document.createElement("p");
  line5.textContent = "4. Click OK";
  const line6 = document.createElement("p");
  line6.textContent = "5. Repeat Steps 1-4 for each remaining ship";
  shipPlacementLines.append(line1, line2, line3, line4, line5, line6);
  gameDiv.append(shipPlacementTextDiv2);

  // create 'ship placement' form

  const shipPlacementForm = document.createElement("form");

  const playerShips = player.gameboard.ships;
  playerShips.forEach((ship) => {
    const shipDiv = document.createElement("div");

    const shipLine = document.createElement("div");
    const shipText = document.createElement("p");
    shipText.textContent = "Ship:";
    const displayedShip = document.createElement("div");
    displayedShip.classList.add("ship-div");
    for (let i = 0; i < ship.length; i++) {
      const squareDiv = document.createElement("div");
      squareDiv.textContent = ship.length.toString();
      displayedShip.append(squareDiv);
    }
    shipLine.append(shipText, displayedShip);
    shipDiv.append(shipLine);

    const square1Line = document.createElement("p");
    const square1Label = document.createElement("label");
    square1Label.setAttribute("for", `${ship.id}-square1`);
    square1Label.textContent = "Square 1:";
    const square1Input = document.createElement("input");
    square1Input.setAttribute("type", "text");
    square1Input.setAttribute("id", `${ship.id}-square1`);
    square1Input.setAttribute("name", `${ship.id}-square1`);
    square1Input.setAttribute("required", "");
    square1Line.append(square1Label, square1Input);
    shipDiv.append(square1Line);

    const square2Line = document.createElement("p");
    const square2Label = document.createElement("label");
    square2Label.setAttribute("for", `${ship.id}-square2`);
    square2Label.textContent = "Square 2:";
    const square2Input = document.createElement("input");
    square2Input.setAttribute("type", "text");
    square2Input.setAttribute("id", `${ship.id}-square2`);
    square2Input.setAttribute("name", `${ship.id}-square2`);
    square2Input.setAttribute("required", "");
    square2Line.append(square2Label, square2Input);
    shipDiv.append(square2Line);

    const shipDivOKBtn = document.createElement("button");
    shipDivOKBtn.setAttribute("type", "button");
    shipDivOKBtn.textContent = "OK";
    shipDiv.append(shipDivOKBtn);

    shipPlacementForm.append(shipDiv);
  });

  const shipPlacementFormButtons = document.createElement("div");
  shipPlacementFormButtons.classList.add("ship-placement-form-buttons");
  const shipPlacementFormOKBtn = document.createElement("button");
  shipPlacementFormOKBtn.textContent = "OK";
  const shipPlacementFormRandomSelectionBtn = document.createElement("button");
  shipPlacementFormRandomSelectionBtn.setAttribute("type", "button");
  shipPlacementFormRandomSelectionBtn.textContent = "Pick for me!";
  shipPlacementFormButtons.append(shipPlacementFormOKBtn, shipPlacementFormRandomSelectionBtn);
  shipPlacementForm.append(shipPlacementFormButtons);

  gameDiv.append(shipPlacementForm);

  // create board

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
  for (let i = 0; i < 100; i++) {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    blankBoardDiv.append(newSquare);
  }
  gameDiv.append(playerBoardDiv);
}
