const bearings = ['N', 'E', 'S', 'W'];

function directionAsNumber(direction) {
  let bearingsIndex = bearings.indexOf(direction);
  return bearingsIndex;
}

function compareArrays(arrOne, arrTwo){
  let result;
  
  arr1.forEach((eleOne) => arrTwo.forEach(eleTwo => {
    return (eleOne != eleTwo) ? result = false : result = true;
  }))

  return result;
  }

class Rover {
  constructor (originalLocation, direction, plateau) {
    this.xCoordinate = originalLocation[0],
    this.yCoordinate = originalLocation[1],
    this.direction = direction,
    this.plateau = plateau
  };

  nextMove() {
    let nextMove;
    switch (this.direction) {
      case 'W': 
        nextMove = [this.xCoordinate - 1, this.yCoordinate];
        break;
      case 'N': 
        nextMove = [this.xCoordinate, this.yCoordinate + 1];
        break;
      case 'E': 
        nextMove = [this.xCoordinate + 1, this.yCoordinate];
        break;
      case 'S':
        nextMove = [this.xCoordinate, this.yCoordinate - 1];
        break;
      }

      return nextMove;
    }

  checkNoObstacles() {
    if (this.plateau.obstacles.length > 0) {
      return !this.plateau.obstacles.some(ele => compareArrays(this.nextMove(), ele));
      } 
      return true;
  }

  checkInsideBoundaries() {
    if (this.nextMove().every((ele) => ele >= 0) && this.nextMove().every((ele, idx) =>
    ele <=  this.plateau.gridSize[idx])) {
      return true;
    } else {
      return false;
    }
  }

  move () {
    if (this.checkInsideBoundaries() && this.checkNoObstacles()) {
      this.xCoordinate = this.nextMove()[0];
      this.yCoordinate = this.nextMove()[1];
      return [this.xCoordinate, this.yCoordinate];
    } else {
      return false;
    }

  }

  turnLeft() {
    let bearingsIndex = directionAsNumber(this.direction)
    if(bearingsIndex > 0) {
      bearingsIndex = bearingsIndex - 1;
    } else {
      bearingsIndex = bearings.length - 1;
    }
    this.direction = bearings[bearingsIndex];
    return this.direction;
  }

  turnRight() {
    let bearingsIndex = directionAsNumber(this.direction)
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