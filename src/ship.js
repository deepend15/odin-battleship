export const ship = (function () {
  const ships = [
    {
      length: 5,
      id: "5",
      hits: 0,
      isSunk: "no",
    },
    {
      length: 4,
      id: "4",
      hits: 0,
      isSunk: "no",
    },
    {
      length: 3,
      id: "3A",
      hits: 0,
      isSunk: "no",
    },
    {
      length: 3,
      id: "3B",
      hits: 0,
      isSunk: "no",
    },
    {
      length: 2,
      id: "2",
      hits: 0,
      isSunk: "no",
    },
  ];

  const getShips = () => ships;

  return { getShips };
})();
