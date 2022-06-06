//  механика игры
import { tetrominoes } from "./tetrominoes.js";
export class Game {
  area = [
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
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
    ["o", "o", "o", "o", "o", "o", "o", "o", "o", "o"],
  ];
  // формируем 2 фигуры.
  activeTetromino = this.createTetramino();

  nextTetramino = this.createTetramino();

  //  создаю рэндомную фигуру из базы
  createTetramino() {
    const keys = Object.keys(tetrominoes);
    const letterTetromino = keys[Math.floor(Math.random() * keys.length)];
    const rotation = tetrominoes[letterTetromino];
    // фигура появляется в рэндомном положении
    const rotationIndex = Math.floor(Math.random() * rotation.length);
    const block = rotation[rotationIndex];

    return {
      block,
      rotationIndex,
      rotation,
      x: 3,
      y: 0,
    };
  }
  //  в этом методе меняю ективную на следующуа, а  следующую создаю по новой.
  changeTetramino() {
    this.activeTetromino = this.nextTetramino;
    this.nextTetramino = this.createTetramino;
  }

  moveLeft() {
    if (
      this.checkOutPosition(this.activeTetromino.x - 1, this.activeTetromino.y)
    ) {
      this.activeTetromino.x -= 1;
    }
  }

  moveRight() {
    if (
      this.checkOutPosition(this.activeTetromino.x + 1, this.activeTetromino.y)
    ) {
      this.activeTetromino.x += 1;
    }
  }

  moveDown() {
    if (
      this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y + 1)
    ) {
      this.activeTetromino.y += 1;
    } else {
      this.stopMove();
    }
  }

  rotateTetromino() {
    this.activeTetromino.rotationIndex =
      this.activeTetromino.rotationIndex < 3
        ? this.activeTetromino.rotationIndex + 1
        : 0;

    this.activeTetromino.block =
      this.activeTetromino.rotation[this.activeTetromino.rotationIndex];

    if (
      !this.checkOutPosition(this.activeTetromino.x, this.activeTetromino.y)
    ) {
      this.activeTetromino.rotationIndex =
        this.activeTetromino.rotationIndex > 0
          ? this.activeTetromino.rotationIndex - 1
          : 3;

      this.activeTetromino.block =
        this.activeTetromino.rotation[this.activeTetromino.rotationIndex];
    }
  }

  get viewArea() {
    const area = JSON.parse(JSON.stringify(this.area));
    const { x, y, block } = this.activeTetromino;
    for (let i = 0; i < block.length; i++) {
      const row = block[i];

      for (let j = 0; j < row.length; j++) {
        if (row[j] !== "o") {
          area[y + i][x + j] = block[i][j];
        }
      }
    }
    return area;
  }
  // проверка на выход фигуры из игровоф зоны
  checkOutPosition(x, y) {
    const tetromino = this.activeTetromino.block;

    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === "o") continue;

        if (
          !this.area[y + i] ||
          !this.area[y + i][x + j] ||
          this.area[y + i][x + j] !== "o"
        ) {
          return false;
        }
      }
    }
    return true;
  }
  stopMove() {
    const { x, y, block } = this.activeTetromino;

    for (let i = 0; i < block.length; i++) {
      const row = block[i];

      for (let j = 0; j < row.length; j++) {
        if (row[j] !== "o") {
          this.area[y + i][x + j] = block[i][j];
        }
      }
    }
    this.changeTetramino();
  }
}
