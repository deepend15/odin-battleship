import { game } from "./game.js";
import { displayController } from "./display-controller.js";

export function showEnterPlayerInfoScreen(e) {
  const newGameDialog = document.querySelector("#new-game-dialog");

  let numberOfPlayers;
  if (e.target.textContent === "1 player") numberOfPlayers = 1;
  else numberOfPlayers = 2;

  newGameDialog.textContent = "";

  const cancelBtn = document.createElement("div");
  cancelBtn.classList.add("dialog-cancel-btn");
  cancelBtn.textContent = "X";
  newGameDialog.append(cancelBtn);

  cancelBtn.addEventListener("click", () => newGameDialog.close());

  const form = document.createElement("form");

  const enterPlayer1 = document.createElement("p");
  const p1Label = document.createElement("label");
  p1Label.setAttribute("for", "p1-name");
  let firstWord;
  if (numberOfPlayers === 1) firstWord = "Your ";
  else firstWord = "Player 1 ";
  p1Label.textContent = firstWord + "name:";
  const p1Input = document.createElement("input");
  p1Input.setAttribute("type", "text");
  p1Input.setAttribute("id", "p1-name");
  p1Input.setAttribute("name", "p1-name");
  p1Input.setAttribute("placeholder", "Player 1");
  p1Input.setAttribute("required", "");
  enterPlayer1.append(p1Label, p1Input);
  form.append(enterPlayer1);

  let p2Input;

  if (numberOfPlayers === 2) {
    const enterPlayer2 = document.createElement("p");
    const p2Label = document.createElement("label");
    p2Label.setAttribute("for", "p2-name");
    p2Label.textContent = "Player 2 name:";
    p2Input = document.createElement("input");
    p2Input.setAttribute("type", "text");
    p2Input.setAttribute("id", "p2-name");
    p2Input.setAttribute("name", "p2-name");
    p2Input.setAttribute("placeholder", "Player 2");
    p2Input.setAttribute("required", "");
    enterPlayer2.append(p2Label, p2Input);
    form.append(enterPlayer2);
  }

  const okButton = document.createElement("button");
  okButton.textContent = "OK";
  okButton.setAttribute("formmethod", "dialog");
  form.append(okButton);

  okButton.addEventListener("click", () => {
    if (p1Input.value === "") p1Input.value = "Player 1";
    if (numberOfPlayers === 2) {
      if (p2Input.value === "") p2Input.value = "Player 2";
    }

    if (numberOfPlayers === 1) game.startGame(p1Input.value);
    else game.startGame(p1Input.value, p2Input.value);
    displayController.updateScreen();
  });

  newGameDialog.append(form);
}
