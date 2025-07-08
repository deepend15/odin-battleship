export function createShips() {
  function createShip() {
    function isSunk() {
      if (this.hits < this.length) return false;
      else return true;
    }

    function hit() {
      if (!this.isSunk()) this.hits += 1;
    }

    let hits = 0;

    return { isSunk, hit, hits };
  }

  const ships = [
    Object.assign({}, createShip(), { length: 5, id: "5" }),
    Object.assign({}, createShip(), { length: 4, id: "4" }),
    Object.assign({}, createShip(), { length: 3, id: "3A" }),
    Object.assign({}, createShip(), { length: 3, id: "3B" }),
    Object.assign({}, createShip(), { length: 2, id: "2" }),
  ];

  const getShips = () => ships;

  return { getShips };
}
