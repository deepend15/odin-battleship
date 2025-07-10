import { createGameboard } from "./gameboard.js";

export class Player {
  constructor(name, id, type) {
    this.name = name;
    this.id = `Player ${id}`;
    this.type = type;
  }

  lastAttack = null;

  gameboard = createGameboard();
}
