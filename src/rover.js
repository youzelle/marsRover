//const Plateau = require('./plateau');
//const Input = require('./input');

const bearings = ['N', 'E', 'S', 'W'];

function isClear(nextMove, coord, plateau) {
  //check if can move
      for (let i = 0; i < plateau[1].length; i++) {
        if (nextMove == plateau[1][i][coord]) {
          console.log('`Obstacle: [${this.xCoordinate},${this.yCoordinate}] cannot move forward`');
          return false;
        }
      }
      return true;
}

class Rover {
  constructor (originalLocation, originalDirection, plateau) {
    this.xCoordinate = originalLocation[0],
    this.yCoordinate = originalLocation[1],
    this.direction = originalDirection,
    this.plateau = plateau
  };

  move () {
    let nextMove;
    let coord;
    let insideBoundaries;
    let changeCoordinate;
    let maxXCoord = this.plateau[0][0];
    let maxYCoord = this.plateau[0][1];

    switch (this.direction) {
      case 'W': {
        nextMove = this.xCoordinate - 1;
        coord = 0;
        insideBoundaries = nextMove >= 0;
        changeCoordinate = () => {
          this.xCoordinate--;
        };

        break;
      }
      case 'N': {
        nextMove = this.yCoordinate + 1;
        coord = 1;
        insideBoundaries = nextMove <= maxYCoord;
        changeCoordinate = () => {
          this.yCoordinate++;
        };

        break;
      }
      case 'E': {
        nextMove = this.xCoordinate + 1;
        coord = 0;
        insideBoundaries = nextMove <= maxXCoord;
        changeCoordinate = () => {
          this.xCoordinate++;
        };

        break;
      }
      case 'S': {
        nextMove = this.yCoordinate - 1;
        coord = 1;
        insideBoundaries = nextMove >= 0;
        changeCoordinate = () => {
          this.yCoordinate--;
        };
        break;
      }
    }
    
    // Tries to make the move
    //
    if (insideBoundaries && isClear(nextMove, coord, this.plateau)) {
      changeCoordinate();
    } else {
      return false;
    }
    return [this.xCoordinate, this.yCoordinate];
  }//

  directionAsNumber(direction) {
    let bearingsIndex = bearings.indexOf(this.direction);
    return bearingsIndex;
  }

  turnLeft() {
    let bearingsIndex = this.directionAsNumber(this.direction)
    if(bearingsIndex > 0) {
      bearingsIndex = bearingsIndex - 1;
    } else {
      bearingsIndex = bearings.length - 1;
    }
    this.direction = bearings[bearingsIndex];
    return this.direction;
  }

  turnRight() {
    let bearingsIndex = this.directionAsNumber(this.direction)
    if(bearingsIndex < bearings.length - 1 ) {
      bearingsIndex = bearingsIndex + 1;
    } else {
      bearingsIndex = 0;
    }
    this.direction = bearings[bearingsIndex];
    return this.direction;
  }

}

let roverOne = new Rover([1,2], 'N', [[5,5], []]);
let roverTwo = new Rover([3,3], 'E', [[5,5], []]);

console.log(roverOne.move());

module.exports = Rover;