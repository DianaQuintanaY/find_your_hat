const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(arrayHighLevel) {
    this.field = arrayHighLevel;
  }
  print() {
    let arrayGroup = [];
    for (let element of this.field) {
      arrayGroup.push(element.join(""));
    }
    process.stdout.write(arrayGroup.join("\n"));
  }
  static generateField(h, w, p = 30) {
    const width = Array(w).fill(fieldCharacter, 0);
    let fieldCreate = [];
    for (let x = 0; x < h; x++) {
      fieldCreate.push([...width]);
    }
    let numberOfHoles = Math.floor((h * w * p) / 100);
    while (numberOfHoles > 0) {
      let randomx = Math.floor(Math.random() * w);
      let randomy = Math.floor(Math.random() * h);
      if (fieldCreate[randomy][randomx] === fieldCharacter) {
        fieldCreate[randomy][randomx] = hole;
        numberOfHoles--;
      }
    }
    fieldCreate[0][0] = pathCharacter;
    fieldCreate[h - 2][Math.floor(Math.random() * w)] = hat;
    return fieldCreate;
  }
}
const playingField = new Field(Field.generateField(10, 10, 50));
playingField.print();
process.stdout.write("\nWhich way?");
let posicionx = 0;
let posiciony = 0;

const upDown = {
  u: -1,
  d: 1,
  r: 0,
  l: 0,
};
const leftRight = {
  r: 1,
  l: -1,
  u: 0,
  d: 0,
};
const allowedUserInput = ["l", "r", "d", "u"];
const checkSignNewPosition = (x, y, array) => {
  let sign = array[y][x];
  switch (sign) {
    case "^":
      console.log("You Won! you have found the hat");
      process.exit();
      break;
    case "O":
      console.log("You Lost! you have fallen in a hole");
      process.exit();
      break;
    case "░":
      array[y][x] = "*";
      posicionx = x;
      posiciony = y;
      break;
    case "*":
      array[posiciony][posicionx] = "O";
      posicionx = x;
      posiciony = y;
      break;
  }
};
const checkNewPosition = (x, y, array) => {
  return x < 0 || y < 0 || x >= array[0].length || y >= array.length;
};

const checkedUserInput = (userInput, array) => {
  if (userInput === "quit") {
    process.exit();
  }
  if (!allowedUserInput.includes(userInput)) {
    process.stdout.write(
      "Please, write \n l for left\n r for right\n u for up\n d for down... "
    );
  } else {
    let positionXi = posicionx + leftRight[userInput];
    let positionYi = posiciony + upDown[userInput];
    if (checkNewPosition(positionXi, positionYi, array)) {
      process.stdout.write("Don't move “outside” the field.");
      process.stdout.write("\n");
    } else {
      checkSignNewPosition(positionXi, positionYi, array);
    }
  }
};
const dataconvert = (buffer) => {
  let userInput = buffer.toString("utf-8").trim();
  checkedUserInput(userInput, playingField.field);
  playingField.print();
  process.stdout.write("\nWhich way?");
};
process.stdin.on("data", dataconvert);
