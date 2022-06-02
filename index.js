const SIZE_BLOCK = 30;

//  механика игры

const game = {
  area: [
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "x", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "x", "x", "x", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "0", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "x", "o"],
    ["o", "o", "o", "o", "x", "x", "o", "o", "x", "o"],
    ["o", "o", "o", "o", "x", "x", "o", "o", "x", "x"],
  ],

  activeTetromino() {
    block: [
      ["o", "x", "o"],
      ["o", "x", "o"],
      ["o", "x", "x"],
    ];
  },

  moveLeft() {},

  moveRight() {},

  moveDown() {},

  rotateTetromino() {},
};

//  отрисовка
const container = document.querySelector(".container");
console.log("container: ", container);

const canvas = document.createElement("canvas");
container.append(canvas);
// в тетрисе 10 колонок и 20 строк, то есть размер 2 к 1
canvas.classList.add("game-area");
canvas.width = SIZE_BLOCK * 10;
canvas.height = SIZE_BLOCK * 20;

const context = canvas.getContext("2d");
//  функция, отвечающая за отрисовку в поле
const showArea = (area) => {
  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block === "x") {
        context.fillStyle = "tomato";
        context.strokeStyle = "white";
        context.fillRect(
          x * SIZE_BLOCK,
          y * SIZE_BLOCK,
          SIZE_BLOCK,
          SIZE_BLOCK
        );
        context.strokeRect(
          x * SIZE_BLOCK,
          y * SIZE_BLOCK,
          SIZE_BLOCK,
          SIZE_BLOCK
        );
      }
    }
  }
};

showArea(game.area);
