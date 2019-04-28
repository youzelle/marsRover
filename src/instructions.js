const Rover = require('./rover');

function executeInstructions(rover, instructions) {
    
    for (let i = 0; i < instructions.length; i++) {
        switch (instructions[i]) {
        case 'M':
        rover.move();
        break;
        case 'R':
        rover.turnRight();
        break;
        case 'L':
        rover.turnLeft();
        break;
        }

        if (!rover.canMove) {
            return {
                "x": rover.xCoordinate,
                "y": rover.yCoordinate,
                "direction": rover.direction,
                "message": "Obstacle or boundary ahead"
                }
        }
    }

    return {
        "x": rover.xCoordinate,
        "y": rover.yCoordinate,
        "direction": rover.direction,
        "message": "Mission complete"
}
}

module.exports = executeInstructions;