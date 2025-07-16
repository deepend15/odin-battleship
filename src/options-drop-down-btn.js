import { game } from "./game";
import { displayController } from "./display-controller";
import { activateNewGame } from "./activate-new-game";

export function createAndAddOptionsButton() {
  const body = document.querySelector("body");
  const topLineMenuDiv = document.querySelector(".top-line-menu-div");

  const optionsBtn = document.createElement("button");
  optionsBtn.dataset.closeEventListener = "OFF";
  optionsBtn.textContent = "Options";

  const optionsBtnMenu = document.createElement("div");
  optionsBtnMenu.classList.add("options-button-menu");
  optionsBtnMenu.classList.add("hidden");

  const newGameRow = document.createElement("button");
  newGameRow.classList.add("options-menu-row");
  newGameRow.textContent = "New game";
  const restartGameRow = document.createElement("button");
  restartGameRow.classList.add("options-menu-row");
  restartGameRow.textContent = "Restart game";
  optionsBtnMenu.append(newGameRow, restartGameRow);

  topLineMenuDiv.append(optionsBtn, optionsBtnMenu);

  newGameRow.addEventListener("click", activateNewGame);

  restartGameRow.addEventListener("click", () => {
    const player1 = game.getPlayer1();
    const player2 = game.getPlayer2();

    const restartGameDialog = document.createElement("dialog");
    restartGameDialog.setAttribute("id", "restart-game-dialog");
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("dialog-cancel-btn");
    cancelBtn.textContent = "X";
    restartGameDialog.append(cancelBtn);
    cancelBtn.addEventListener("click", () => {
      restartGameDialog.close();
      restartGameDialog.remove();
    });
    const warningSymbol = document.createElement("p");
    warningSymbol.textContent = `\u2757`;
    restartGameDialog.append(warningSymbol);
    const warningText = document.createElement("p");
    warningText.textContent = "Are you sure you want to restart this game?";
    restartGameDialog.appendChild(warningText);
    const restartGameDialogBtnsDiv = document.createElement("div");
    restartGameDialogBtnsDiv.classList.add("restart-game-dialog-buttons");
    const confirmNoBtn = document.createElement("button");
    confirmNoBtn.textContent = "No";
    restartGameDialogBtnsDiv.appendChild(confirmNoBtn);
    const confirmYesBtn = document.createElement("button");
    confirmYesBtn.textContent = "Yes";
    restartGameDialogBtnsDiv.appendChild(confirmYesBtn);
    restartGameDialog.appendChild(restartGameDialogBtnsDiv);
    body.appendChild(restartGameDialog);
    restartGameDialog.showModal();

    confirmNoBtn.addEventListener("click", () => {
      restartGameDialog.close();
      restartGameDialog.remove();
    });

    confirmYesBtn.addEventListener("click", () => {
      restartGameDialog.close();
      restartGameDialog.remove();
      game.startGame(player1.name, player2.name);
      displayController.updateScreen();
    });
  });

  optionsBtn.addEventListener("mouseenter", () => {
    optionsBtn.classList.toggle("options-btn-hover");
  });

  optionsBtn.addEventListener("mouseleave", () => {
    optionsBtn.classList.toggle("options-btn-hover");
  });

  const menuCloseEvent = new CustomEvent("menuCloseEvent");

  function closeMenu() {
    optionsBtn.classList.remove("options-btn-active");
    optionsBtnMenu.classList.add("hidden");

    optionsBtn.dispatchEvent(menuCloseEvent);
  }

  optionsBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (optionsBtn.classList.contains("options-btn-active")) {
      closeMenu();
    } else {
      optionsBtn.classList.add("options-btn-active");
      optionsBtnMenu.classList.remove("hidden");

      body.addEventListener("click", closeMenu);

      if (optionsBtn.dataset.closeEventListener === "OFF") {
        optionsBtn.addEventListener("menuCloseEvent", () => {
          body.removeEventListener("click", closeMenu);
        });
        optionsBtn.dataset.closeEventListener = "ON";
      }
    }
  });
}
