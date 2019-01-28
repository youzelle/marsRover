const Rover = require('./rover');

function executeInstructions(rover, instructions) {
    
    let stop;
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i]) {
        case 'M':
        if(rover.move() === false) {
            stop = true;
        }
        break;
        case 'R':
        rover.turnRight();
        break;
        case 'L':
        rover.turnLeft();
        break;
        }

        if(stop) {
            return [rover.xCoordinate, rover.yCoordinate, rover.direction, 'Obstacle ahead'];
        break;
        }
    }

    return [rover.xCoordinate, rover.yCoordinate, rover.direction];
}

module.exports = executeInstructions;