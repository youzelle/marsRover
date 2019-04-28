const {compareArrays} = require('./utils')

class Rover {
  constructor (coordinates, direction, plateauInfo) {
    this.xCoordinate = coordinates[0],
    this.yCoordinate = coordinates[1],
    this.direction = direction,
    this.plateauInfo = plateauInfo,
    this.canMove = true
  };

  nextMove() {
    switch (this.direction) {
      case 'W': 
        return [this.xCoordinate - 1, this.yCoordinate];
      case 'N': 
        return [this.xCoordinate, this.yCoordinate + 1];
      case 'E': 
        return [this.xCoordinate + 1, this.yCoordinate];
      case 'S':
        return [this.xCoordinate, this.yCoordinate - 1];
      }
    }

  areAnyObstacles() {
      return this.plateauInfo.obstacles.some(coordinates => compareArrays(this.nextMove(), coordinates));
  }

  checkInsideBoundaries() {
    return this.nextMove().every((coordinate, idx) => coordinate >= 0 && coordinate <= this.plateauInfo.maxCoordinates[idx]) ? true : false;
  }

  move() {
    if (this.checkInsideBoundaries() && !this.areAnyObstacles()) {
      this.xCoordinate = this.nextMove()[0];
      this.yCoordinate = this.nextMove()[1];
    } else {
      this.canMove = false;
    }
  }

  nextDirection(moduloNumber) {
    let compass = ['N', 'E', 'S', 'W'];
    let current = compass.indexOf(this.direction);
    this.direction = compass[(current + moduloNumber) % 4];
  }

  turnLeft() {
    this.nextDirection(3);
  }

  turnRight() {
    this.nextDirection(1);
  }

}

module.exports = Rover;
