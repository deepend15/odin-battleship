import { showEnterPlayerInfoScreen } from "./show-enter-player-info-screen.js";

export function activateNewGame() {
  const newGameDialog = document.querySelector("#new-game-dialog");

  newGameDialog.textContent = "";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("dialog-cancel-btn");
  cancelBtn.textContent = "X";
  newGameDialog.append(cancelBtn);

  cancelBtn.addEventListener("click", () => newGameDialog.close());

  const chooseNumberOfPlayersDiv = document.createElement("div");
  chooseNumberOfPlayersDiv.classList.add("choose-players-div");

  const choosePlayersText = document.createElement("p");
  choosePlayersText.textContent = "Choose the number of players:";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("player-buttons-div");
  const onePlayerButton = document.createElement("button");
  onePlayerButton.textContent = "1 player";
  const twoPlayerButton = document.createElement("button");
  twoPlayerButton.textContent = "2 players";
  buttonsDiv.append(onePlayerButton, twoPlayerButton);

  chooseNumberOfPlayersDiv.append(choosePlayersText, buttonsDiv);
  newGameDialog.append(chooseNumberOfPlayersDiv);

  onePlayerButton.addEventListener("click", showEnterPlayerInfoScreen);
  // twoPlayerButton.addEventListener("click", showEnterPlayerInfoScreen);

  newGameDialog.showModal();
}
