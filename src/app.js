const prompts = require('prompts');
const deployRovers = require('./deploy');
const Plateau = require('./plateau')

const questions = [
    {
    name: 'maxPlateauCoord',
    type: 'text',
    message: 'What are the maximum plateau coordinates?',
    validate: maxPlateauCoord => /^\d+\s\d+$/.test(maxPlateauCoord) || 'Must be in format [x y] ',
   }, 
    {
    name: 'coordinatesRoverOne',
    type: 'text',
    message: 'Rover One: Coordinates',
   validate: coordinatesRoverOne => /^\d+\s\d+\s$/.test(coordinatesRoverOne) || 'Must be in format [x y]',
   }, 
   {
    name: 'directionRoverOne',
    type: 'text',
    message: 'Rover One: Direction',
   validate: directionRoverOne => /[NEWS]/.test(directionRoverOne) || 'Must be in format [x y]',
   },
   {
    name: 'instructionsRoverOne',
    type: 'text',
    message: 'Rover One: Instructions',
   validate: instructionsRoverOne => /^[LMR]*$/.test(instructionsRoverOne) || 'Must be a string of L, M and/or R',
  },
  {
   name: 'coordinatesRoverTwo',
   type: 'text',
   message: 'Rover Two: Coordinates',
   validate: coordinatesRoverTwo => /^\d+\s\d+\s[NEWS]$/.test(coordinatesRoverTwo) ? true : 'Must be in format [x y direction]'
   }, 
   {
    name: 'directionRoverTwo',
    type: 'text',
    message: 'Rover Two: Direction',
    validate: directionRoverTwo => /^\d+\s\d+\s[NEWS]$/.test(directionRoverTwo) ? true : 'Must be in format [x y direction]'
    },{
   name: 'instructionsRoverTwo',
   type: 'text',
   message: 'Rover Two: Instructions',
   validate: instructionsRoverTwo => /^[LMR]*$/.test(instructionsRoverTwo) ? true : 'Must be a string of L, M and/or R'
   }
];
 
prompts(questions).then(function(response) {
       let plateauData = {};
       let missionData = {};

       plateauData.maxCoordinates = [Number(response.gridSize.split(' ')[0]), Number(response.gridSize.split(' ')[0])];
       plateauData.obstacles = [];

    //    need to change

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
       let plateau = new Plateau(plateauData.maxCoordinates, plateauData.obstacles);
       
       console.log(deployRovers(rovers, plateau));

       
   }).catch(err => console.log('Error: ', err))