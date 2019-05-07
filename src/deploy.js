const Rover = require('./rover');
const executeInstructions = require('./instructions');

function  deployRovers(roversInfoArr, plateauInfo) {
    // let missionResults = [];

    return roversInfoArr.map((roverInfo, idx) => {
        
        const rover = new Rover(roverInfo.coordinates, roverInfo.direction, plateauInfo);
        const finalCoord = executeInstructions(rover, roverInfo.instructions);
        
        plateauInfo.obstacles.push([finalCoord.x, finalCoord.y]);

        // missionResults.push([`Rover ${idx + 1}: `, finalCoord]);
        return [`Rover ${idx + 1}: `, finalCoord]
    })

    // return missionResults;
}

module.exports = deployRovers;
