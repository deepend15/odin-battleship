import { Player } from "./player.js";
import { displayController } from "./display-controller.js";

export const game = (function () {
  let player1;
  let player2;
  let activePlayer;

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;
  const getActivePlayer = () => activePlayer;

  const switchPlayerTurn = () => {
    if (activePlayer === player1) activePlayer = player2;
    else activePlayer = player1;
  };

  let gameStatus = "new";
  const getGameStatus = () => gameStatus;

  const startGame = (player1Name, player2name = "Computer") => {
    player1 = new Player(player1Name, 1, "human");
    if (player2name === "Computer")
      player2 = new Player(player2name, 2, "computer");

    const player1Gameboard = player1.gameboard;
    const player1ships = player1Gameboard.ships;
    const player2Gameboard = player2.gameboard;
    const player2ships = player2Gameboard.ships;

    player1Gameboard.placeShip(
      player1ships.filter((ship) => ship.id === "5")[0],
      [0, 0],
      [0, 4],
    );
    player1Gameboard.placeShip(
      player1ships.filter((ship) => ship.id === "4")[0],
      [1, 0],
      [1, 3],
    );
    player1Gameboard.placeShip(
      player1ships.filter((ship) => ship.id === "3A")[0],
      [2, 0],
      [2, 2],
    );
    player1Gameboard.placeShip(
      player1ships.filter((ship) => ship.id === "3B")[0],
      [3, 0],
      [3, 2],
    );
    player1Gameboard.placeShip(
      player1ships.filter((ship) => ship.id === "2")[0],
      [4, 0],
      [4, 1],
    );

    player2Gameboard.placeShip(
      player2ships.filter((ship) => ship.id === "5")[0],
      [5, 9],
      [9, 9],
    );
    player2Gameboard.placeShip(
      player2ships.filter((ship) => ship.id === "4")[0],
      [6, 8],
      [9, 8],
    );
    player2Gameboard.placeShip(
      player2ships.filter((ship) => ship.id === "3A")[0],
      [7, 7],
      [9, 7],
    );
    player2Gameboard.placeShip(
      player2ships.filter((ship) => ship.id === "3B")[0],
      [7, 6],
      [9, 6],
    );
    player2Gameboard.placeShip(
      player2ships.filter((ship) => ship.id === "2")[0],
      [8, 5],
      [9, 5],
    );

    activePlayer = player1;

    gameStatus = "active";

    displayController.updateScreen();
  };

  return {
    getPlayer1,
    getPlayer2,
    getActivePlayer,
    switchPlayerTurn,
    getGameStatus,
    startGame,
  };
})();
