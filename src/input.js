const {validateCoordinates, validateDirection, validateInstructions} = require('./utils')
const deployRover = require('./deploy');

function main(roversInfoArr, plateauInfo) {
    roversInfoArr.forEach((roverInfo) => {
        if (!validateCoordinates(roverInfo.coordinates)) {
            throw new Error('Invalid rover coordinates')
        } else if (!validateDirection(roverInfo.direction)) {
            throw new Error('Invalid rover direction');
        } else if (!validateInstructions(roverInfo.instructions)) {
            throw new Error('Invalid rover instructions')
        }
    })

    if (!validateCoordinates(plateauInfo.coordinates)) {
        throw new Error('Invalid plateau coordinates, must be two numbers!')
    } 

    return deployRover(roversInfoArr, plateauInfo);

}

module.exports = main;
