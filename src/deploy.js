const Rover = require('./rover');
const Instructions = require('./instructions');

function  deployRovers(rovers, plateau) {
    let missionResults = [];

    for (let i = 0; i < rovers.length; i++) {
        //create instance of rover
        let rover = new Rover(rovers[i].location, rovers[i].direction, plateau );

        //execute instructions for each rover
        let result = Instructions(rover, rovers[i].instructions);
        
        //update obstacles in mission data with first two elements of result
        plateau.obstacles.push(result.slice(0,2));

        missionResults.push(`Rover ${i + 1}: `, result);
    }
    return missionResults;
}

module.exports = deployRovers;
