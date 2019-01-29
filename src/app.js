const prompts = require('prompts');
const deployRovers = require('./deploy');
const Plateau = require('./plateau')

 const questions = [
     {
     name: 'gridSize',
     type: 'text',
     message: 'Grid size',
     validate: gridSize =>  /^\d\s\d$/.test(gridSize) ? gridSize : 'Incorrect Format'
     //value => /^\d\s\d$/.test(value) ? value : 'Incorrect Format'

    }, 
     {
     name: 'locationRoverOne',
     type: 'text',
     message: 'Rover One: Location',
    validate: value => /^\d\s\d\s[NEWS]$/.test(value) ? value : 'Incorrect Format'
    }, {
     name: 'instructionsRoverOne',
     type: 'text',
     message: 'Rover One: Instructions',
    validate: value => /^[LMR]*$/.test(value) ? value : 'Incorrect Formt'
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

        plateauData.gridSize = [Number(response.gridSize.split(' ')[0]), Number(response.gridSize.split(' ')[0])];
        plateauData.obstacles = [];


        let locatOne = response.locationRoverOne.split(' ');
        let locatTwo = response.locationRoverTwo.split(' ');


        missionData.roverOne = { 
            location: [Number(locatOne[0]), Number(locatOne[1])],
            direction: locatOne[2],
            instructions: response.instructionsRoverOne

        };
        missionData.roverTwo = { 
                location: [Number(locatTwo[0]), Number(locatTwo[1])],
                direction: locatTwo[2],
                instructions: response.instructionsRoverTwo
    
            };

        let rovers = [missionData.roverOne,missionData.roverTwo]
        let plateau = new Plateau(plateauData.gridSize, plateauData.obstacles);
        console.log(deployRovers(rovers, plateau));

        
    }).catch(err => console.log('Error: ', err))

  
