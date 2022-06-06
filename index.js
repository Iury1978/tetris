import { Game } from "./modules/game.js";

const game = new Game();
console.log("game:", game);
const SIZE_BLOCK = 20;
const COLUMNS = 10;
const ROWS = 20;

// game.viewArea();

//  отрисовка
const container = document.querySelector(".container");

const canvas = document.createElement("canvas");
container.append(canvas);
// в тетрисе 10 колонок и 20 строк, то есть размер 2 к 1
canvas.classList.add("game-area");
canvas.width = SIZE_BLOCK * COLUMNS;
canvas.height = SIZE_BLOCK * ROWS;

const context = canvas.getContext("2d");
//  функция, отвечающая за отрисовку в поле
const showArea = (area) => {
  // очистка игрового поля при перемещении фигуры( что бы не оставался след)
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < area.length; y++) {
    const line = area[y];

    for (let x = 0; x < line.length; x++) {
      const block = line[x];
      if (block !== "o") {
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
// отслеживаем нажатие любой кнопки
window.addEventListener("keydown", (event) => {
  const key = event.code;
  switch (key) {
    case "ArrowLeft":
      game.moveLeft();
      showArea(game.viewArea);
      break;

    case "ArrowRight":
      game.moveRight();
      showArea(game.viewArea);
      break;
    case "ArrowDown":
      game.moveDown();
      showArea(game.viewArea);
      break;
    case "ArrowUp":
      game.rotateTetromino();
      showArea(game.viewArea);
      break;
  }
});

showArea(game.viewArea);
