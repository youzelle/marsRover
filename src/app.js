const prompts = require('prompts');
const deployRovers = require('./deploy');
const Plateau = require('./plateau')

 const questions = [
     {
     name: 'gridSize',
     type: 'text',
     message: 'Grid size',
    //  validate: value => /^\d\s\d\s?$/.test(value) ? value : 'Incorrect Format'

    }, 
    {
        name: 'obstacles',
        type: 'text',
        message: 'Obstacles'
     }, 
     {
     name: 'locationRoverOne',
     type: 'text',
     message: 'Rover One: Location',
    //  validate: value => /^\d\s\d\s[NEWS]$/.test(value) ? value : 'Incorrect Format'
    }, {
     name: 'instructionsRoverOne',
     type: 'text',
     message: 'Rover One: Instructions',
    //  validate: value => /^[LMR]*$/.test(instructions) ? value : 'Incorrect Formt'
   },
   {
    name: 'locationRoverTwo',
    type: 'text',
    message: 'Rover Two: Location',
    //  validate: value => /^\d\s\d\s[NEWS]$/.test(value) ? value : 'Incorrect Format'
    }, {
    name: 'instructionsRoverTwo',
    type: 'text',
    message: 'Rover Two: Instructions',
    //  validate: value => /^[LMR]*$/.test(instructions) ? value : 'Incorrect Formt'
    }
];
  
   // Promise
prompts(questions).then(function(response) {
        let plateauData = {};
        let missionData = {};

        plateauData.gridSize = response.gridSize.split(' ').map(Number);
        plateauData.obstacles = (response.obstacles === undefined) ? new Array() : response.obstacles.split(' ').map(Number);

        let locatOne = response.locationRoverOne.split(' ');
        let locatTwo = response.locationRoverTwo.split(' ');


        missionData.roverOne = { 
            location: [Number(locatOne[0]), Number(locatOne[1])],
            direction: [locatOne[2]],
            instructions: response.instructionsRoverOne

        };
        missionData.roverTwo = { 
                location: [Number(locatTwo[0]), Number(locatTwo[1])],
                direction: [locatTwo[2]],
                instructions: response.instructionsRoverTwo
    
            };

        let rovers = [missionData.roverOne,missionData.roverTwo]
        let plateau = new Plateau(plateauData.gridSize, plateauData.obstacles);
        console.log(deployRovers(rovers, plateau));

        
    })

  
