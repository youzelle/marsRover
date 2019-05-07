const {validateCoordinates, validateDirection, validateInstructions} = require('./utils')
const deployRover = require('./deploy');

function main(roversInfoArr, plateauInfo) {
    roversInfoArr.forEach((roverInfo) => {
        if (!validateCoordinates(roverInfo.coordinates)) {
            throw new Error('Invalid rover coordinates, must be two numbers')
        } else if (!validateDirection(roverInfo.direction)) {
            throw new Error('Invalid rover direction, must be N, E, S or W');
        } else if (!validateInstructions(roverInfo.instructions)) {
            throw new Error('Invalid rover instructions, must be L, M or R')
        }
    })

    if (!validateCoordinates(plateauInfo.coordinates)) {
        throw new Error('Invalid plateau coordinates, must be two numbers!')
    } 

    return deployRover(roversInfoArr, plateauInfo);

}

module.exports = main;
