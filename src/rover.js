const bearings = ['N', 'E', 'S', 'W'];

function arraysEqual(arr1, arr2) {
  if(arr1.length !== arr2.length)
      return false;
  for(var i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i])
          return false;
  }
  return true;
}

function checkObstacles(nextMove, plateau) {
  if (plateau.obstacles.length > 0) {
    return !plateau.obstacles.some((ele) => arraysEqual(nextMove, ele));
    } 
    return true;
}

function checkBoundary() {

}

class Rover {
  constructor (originalLocation, originalDirection, plateau) {
    this.xCoordinate = originalLocation[0],
    this.yCoordinate = originalLocation[1],
    this.maxXCoord = plateau.gridSize[0],
    this.maxYCoord = plateau.gridSize[1],
    this.direction = originalDirection,
    this.plateau = plateau
  };


  move () {
    let nextMove;
    //let coord;
    let insideBoundaries;
    let changeCoordinate;
    //let maxXCoord = this.plateau.gridSize[0];
    //let maxYCoord = this.plateau.gridSize[1];

    //canMove
    //checkBoundary
    //checkObstacles
    //return boolean

    switch (this.direction) {
      case 'W': {
        nextMove = [this.xCoordinate - 1, this.yCoordinate];
        //coord = 0;
        insideBoundaries = nextMove[0] >= 0;
        changeCoordinate = () => {
          this.xCoordinate--;
        };

        break;
      }
      case 'N': {
        nextMove = [this.xCoordinate, this.yCoordinate + 1];
        //coord = 1;
        insideBoundaries = nextMove[1] <= this.maxYCoord;
        changeCoordinate = () => {
          this.yCoordinate++;
        };

        break;
      }
      case 'E': {
        nextMove = [this.xCoordinate + 1, this.yCoordinate];
        //coord = 0;
        insideBoundaries = nextMove[0] <= this.maxXCoord;
        changeCoordinate = () => {
          this.xCoordinate++;
        };

        break;
      }
      case 'S': {
        nextMove = [this.xCoordinate, this.yCoordinate - 1];
        //coord = 1;
        insideBoundaries = nextMove[1] >= 0;
        changeCoordinate = () => {
          this.yCoordinate--;
        };
        break;
      }
    }
    
    // Tries to make the move
    if (insideBoundaries && checkObstacles(nextMove, this.plateau)) {
      changeCoordinate();
    } else {
      return false;
    }
    return [this.xCoordinate, this.yCoordinate];
  };

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

module.exports = Rover;