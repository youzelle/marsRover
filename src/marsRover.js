const prompts = require('prompts');
require('colors');

let obstacles = [[2, 2], [3, 1], [5, 3]];

class Rover {
  constructor (gridSize, location, instructions) {
    this.xCoordinate = parseInt(location.split(' ')[0]);
    this.yCoordinate = parseInt(location.split(' ')[1]);
    this.orientation = location(location.split(' ')[2]);
    this.gridX = parseInt(gridSize.split(' ')[0]);
    this.gridY = parseInt(gridSize.split(' ')[1]);
    this.instructions = instructions;
    this.travelLog = [];
  }

  isClear (orient, coord) {
    for (let i = 0; i < obstacles.length; i++) {
      if (orient == obstacles[i][coord]) {
        console.log('Obstacle, cannot move forward');
        return false;
      }
    }
    return true;
  }

  move () {
    let orient;
    let coord;
    let insideBoundaries;
    let changeCoordinate;

    switch (this.orientation) {
      case 'W': {
        orient = this.xCoordinate - 1;
        coord = 0;
        insideBoundaries = orient >= 0;
        changeCoordinate = () => {
          this.xCoordinate--;
        };

        break;
      }
      case 'N': {
        orient = this.yCoordinate + 1;
        coord = 1;
        insideBoundaries = orient <= this.gridY;
        changeCoordinate = () => {
          this.yCoordinate++;
        };

        break;
      }
      case 'E': {
        orient = this.xCoordinate + 1;
        coord = 0;
        insideBoundaries = orient <= this.gridX;
        changeCoordinate = () => {
          this.xCoordinate++;
        };

        break;
      }
      case 'S': {
        orient = this.yCoordinate - 1;
        coord = 1;
        insideBoundaries = orient >= 0;
        changeCoordinate = () => {
          this.yCoordinate--;
        };
        break;
      }
    }
    
    // Tries to make the move
    if (insideBoundaries && this.isClear(orient, coord)) {
      changeCoordinate();
    } else {
      return false;
    }

    return [this.xCoordinate, this.yCoordinate];
  }

  turnLeft() {

    return 'E';
  }


  rotate (dir) {
    const bearings = ['N', 'E', 'S', 'W'];
    let bearingsIndex = bearings.indexOf(this.orientation);
    if (dir === 'L') {
      bearingsIndex = (bearingsIndex + 7) % 4;
    } else if (dir === 'R') {
      bearingsIndex = (bearingsIndex + 5) % 4;
    }
    this.orientation = bearings[bearingsIndex];
    return this.orientation;
  }

  executeInstructions () {
    const instructions = this.instructions.split('');
    let stop;
    for (let i = 0; i < instructions.length; i++) {
      switch (instructions[i]) {
        case 'M':
        if(this.move() === false) {
          stop = true;
        }
        break;
      case 'R':
        this.rotate('R');
        break;
      case 'L':
        this.rotate('L');
        break;
      }

      if(stop) {
        break;
      }
     }

    return `${this.xCoordinate} ` + `${this.yCoordinate} ` + `${this.orientation}`;
  }
}

Rover.validLocation = function(location) {
  return (/^\d\s\d\s[NEWS]$/).test(location);
}

Rover.validInstructions = function(instructions) {
  return (/^[LMR]*$/).test(instructions);
}

Rover.validGrid = function(gridSize) {
  return /^\d\s\d\s?$/.test(gridSize);
}

const questions = [{
  name: 'gridSize',
  type: 'text',
  message: 'Grid size',
  validate: Rover.validGrid
}, {
  name: 'location',
  type: 'text',
  message: 'Location',
  validate: Rover.validLocation
}, {
  name: 'instructions',
  type: 'text',
  message: 'Instructions',
  validate: Rover.validInstructions
}];


// Promise!
prompts(questions).then(function(response) {
  console.log(response);
  
  const rover = new Rover(response.gridSize, response.location, response.instructions);
  
  const result = rover.executeInstructions()

  console.log(result.underline.green);
});

module.exports = Rover;


