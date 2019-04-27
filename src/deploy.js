const Rover = require('./rover');
const Instructions = require('./instructions');

function  deployRovers(rovers, plateau) {
    let missionResults = [];

    for (let i = 0; i < rovers.length; i++) {
        let rover = new Rover(rovers[i].location, rovers[i].direction, plateau );

        let finalCoord = Instructions(rover, rovers[i].instructions);
        
        plateau.obstacles.push([finalCoord.x, finalCoord.y]);

        missionResults.push(`Rover ${i + 1}: `, finalCoord);
    }
    return missionResults;
}

module.exports = deployRovers;
