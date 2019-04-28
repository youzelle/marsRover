const Rover = require('./rover');
const executeInstructions = require('./instructions');
const {validateCoordinates, validateDirection, validateInstructions} = require('./utils')


function  deployRovers(roversInfoArr, plateauInfo) {
    let missionResults = [];

    if (!validateCoordinates(plateauInfo.maxCoordinates)) {
        throw new Error('Cannot deploy: Invalid plateau info, must be two coordinates')
    }

    roversInfoArr.forEach((roverInfo, idx) => {

        if (validateCoordinates(roverInfo.coordinates) && validateDirection(roverInfo.direction) && validateInstructions(roverInfo.instructions)) {
        
        const rover = new Rover(roverInfo.coordinates, roverInfo.direction, plateauInfo);
        const finalCoord = executeInstructions(rover, roverInfo.instructions);
        
        plateauInfo.obstacles.push([finalCoord.x, finalCoord.y]);

        missionResults.push([`Rover ${idx + 1}: `, finalCoord]);
        } else {
            throw new Error('Invalid rover input');
        }
    })

    return missionResults;
}

module.exports = deployRovers;
