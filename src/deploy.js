const Rover = require('./rover');
const Instructions = require('./instructions');

function  deployRovers(rovers, plateau) {
    let missionResults = [];

    for (let i = 0; i < rovers.length; i++) {
        let rover = new Rover(rovers[i].location, rovers[i].direction, plateau );

        let result = Instructions(rover, rovers[i].instructions);
        
        plateau.obstacles.push(result.slice(0,2));

        missionResults.push(`Rover ${i + 1}: `, result);
    }
    return missionResults;
}

module.exports = deployRovers;
