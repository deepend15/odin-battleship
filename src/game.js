import { Player } from "./player.js";
// import { displayController } from "./display-controller.js";

export const game = (function () {
  let player1;
  let player2;
  let activePlayer;
  let opponent;

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  const getActivePlayer = () => activePlayer;
  const getOpponent = () => opponent;

  const switchPlayerTurn = () => {
    if (activePlayer === player1) {
      activePlayer = player2;
      opponent = player1;
    } else {
      activePlayer = player1;
      opponent = player2;
    }
  };

  let gameStatus = "new";
  const getGameStatus = () => gameStatus;
  const setGameStatus = (value) => (gameStatus = value);

  const startGame = (player1Name, player2name = "Computer") => {
    player1 = new Player(player1Name, 1, "human");
    if (player2name === "Computer")
      player2 = new Player(player2name, 2, "computer");

    activePlayer = player1;
    opponent = player2;

    // displayController.updateScreen();
  };

  return {
    getPlayer1,
    getPlayer2,
    getActivePlayer,
    getOpponent,
    switchPlayerTurn,
    getGameStatus,
    setGameStatus,
    startGame,
  };
})();
