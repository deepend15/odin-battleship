export const ship = (function () {
  const ships = [
    {
      length: 5,
      id: "5",
      hits: 0,
      isSunk() {
        if (this.hits < this.length) return "no";
        else return "yes";
      },
      hit() {
        if (this.isSunk() === "no") this.hits += 1;
      },
    },
    {
      length: 4,
      id: "4",
      hits: 0,
      isSunk() {
        if (this.hits < this.length) return "no";
        else return "yes";
      },
      hit() {
        if (this.isSunk() === "no") this.hits += 1;
      },
    },
    {
      length: 3,
      id: "3A",
      hits: 0,
      isSunk() {
        if (this.hits < this.length) return "no";
        else return "yes";
      },
      hit() {
        if (this.isSunk() === "no") this.hits += 1;
      },
    },
    {
      length: 3,
      id: "3B",
      hits: 0,
      isSunk() {
        if (this.hits < this.length) return "no";
        else return "yes";
      },
      hit() {
        if (this.isSunk() === "no") this.hits += 1;
      },
    },
    {
      length: 2,
      id: "2",
      hits: 0,
      isSunk() {
        if (this.hits < this.length) return "no";
        else return "yes";
      },
      hit() {
        if (this.isSunk() === "no") this.hits += 1;
      },
    },
  ];

  const getShips = () => ships;

  return { getShips };
})();
