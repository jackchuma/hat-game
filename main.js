const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let end = false;
let whoops = false;

class Field {
  
  constructor(field) {
    this._field = field;
    this._position = [0, 0];
  }

  print() {
    for (let i=0; i < this._field.length; i++) {
      console.log(this._field[i].join(''));
    }
  }

  findHat() {
    for (let i=0; i < this._field.length; i++) {
      if (this._field[i].includes(hat)) {
        let hatIndex1 = i;
        let hatIndex2 = this._field[i].indexOf(hat);
        return [hatIndex1, hatIndex2];
      }
    }
  }

  currentPosition() {
    return this._position;
  }

  changePosition(dir) {
    if (dir === 'u') {
      this._position[0] -= 1;
    } else if (dir === 'd') {
      this._position[0] += 1;
    } else if (dir === 'r') {
      this._position[1] += 1;
    } else if (dir === 'l') {
      this._position[1] -= 1;
    } else {
      console.log('Error: enter valid direction');
      whoops = true;
    }
  }

  validatePosition() {
    if (this._position[0] < 0) {
      console.log('Out of bounds!');
      whoops = true;
      this._position[0] += 1;
    } else if (this._position[0] > this._field.length - 1) {
      console.log('Out of bounds!');
      whoops = true;
      this._position[0] -= 1;
    } else if (this._position[1] < 0) {
      console.log('Out of bounds!');
      whoops = true;
      this._position[1] += 1;
    } else if (this._position[1] > this._field[0].length - 1) {
      console.log('Out of bounds!');
      whoops = true;
      this._position[1] -= 1;
    }
  }

  newPositionStatus() {
    if (this._field[this._position[0]][this._position[1]] === hat) {
      console.log('Congrats, you found your hat!');
      end = true;
    } else if (this._field[this._position[0]][this._position[1]] === hole) {
      console.log('Sorry, you fell down a hole');
      end = true;
    } else if (this._field[this._position[0]][this._position[1]] === fieldCharacter) {
      this._field[this._position[0]][this._position[1]] = pathCharacter;
    }
  }

  static generateField(dim1, dim2, perc) {
    const hatLocation = [Math.floor(Math.random() * (dim1 - 1) + 1), Math.floor(Math.random() * (dim2 - 1) + 1)];
    let field = [];
    for (let i=0; i<dim1; i++) {
      let newLine = [];
      for (let j=0; j<dim2; j++) {
        let randNum = Math.floor(Math.random() * 100 + 1);
        if (i===0 && j===0) {
          newLine.push(pathCharacter);
        } else if (i===hatLocation[0] && j===hatLocation[1]) {
          newLine.push(hat);
        } else if (randNum <= perc) {
          newLine.push(hole);
        } else {
          newLine.push(fieldCharacter);
        }
      }
      field.push(newLine);
    }
    return field;
  }
}

const myField = new Field(Field.generateField(10, 5, 20));
console.clear();
while (end === false) {
  myField.print();
  let direction = prompt('Which way? ');
  myField.changePosition(direction);
  myField.validatePosition();
  myField.newPositionStatus();
  if (end === false && whoops === false) {
    console.clear();
  }
  whoops = false;
}