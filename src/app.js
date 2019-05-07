const prompts = require('prompts');
const deployRovers = require('./deploy');
const Plateau = require('./plateau')

const {
    validateCoordinates, 
    validateDirection, 
    validateInstructions, 
    processPlateauInfo, 
    processRoverInfo
} = require('./utils')

const questions = [
    {
    name: 'maxPlateauCoord',
    type: 'text',
    message: 'What are the maximum plateau coordinates?',
    validate: maxPlateauCoord => validateCoordinates(maxPlateauCoord)  || 'Must be in format [x y] ',
   }, 
    {
    name: 'coordinatesRoverOne',
    type: 'text',
    message: 'Rover One: Coordinates',
   validate: coordinatesRoverOne => validateCoordinates(coordinatesRoverOne) || 'Must be in format [x y]',
   }, 
   {
    name: 'directionRoverOne',
    type: 'text',
    message: 'Rover One: Direction',
   validate: directionRoverOne => validateDirection(directionRoverOne) || 'Must be in format [x y]',
   },
   {
    name: 'instructionsRoverOne',
    type: 'text',
    message: 'Rover One: Instructions',
   validate: instructionsRoverOne => validateInstructions(instructionsRoverOne) || 'Must be a string of L, M and/or R',
  },
  {
   name: 'coordinatesRoverTwo',
   type: 'text',
   message: 'Rover Two: Coordinates',
   validate: coordinatesRoverTwo => validateCoordinates(coordinatesRoverTwo) ? true : 'Must be in format [x y direction]'
   }, 
   {
    name: 'directionRoverTwo',
    type: 'text',
    message: 'Rover Two: Direction',
    validate: directionRoverTwo => validateDirection(directionRoverTwo) ? true : 'Must be in format [x y direction]'
    },{
   name: 'instructionsRoverTwo',
   type: 'text',
   message: 'Rover Two: Instructions',
   validate: instructionsRoverTwo => validateInstructions(instructionsRoverTwo) ? true : 'Must be a string of L, M and/or R'
   }
];
 
async function main() {
    try {
        const userInput = await prompts(questions);

        let missionData = {};

        missionData.roverOne = processRoverInfo(userInput.coordinatesRoverOne, userInput.directionRoverOne, userInput.instructionsRoverOne)
        missionData.roverTwo = processRoverInfo(userInput.coordinatesRoverTwo, userInput.directionRoverTwo, userInput.instructionsRoverTwo)
    
        let plateau = processPlateauInfo(userInput.maxPlateauCoord);
    
        let rovers = [missionData.roverOne,missionData.roverTwo]
            
        console.log(deployRovers(rovers, plateau));

    } catch (error) {
        throw new Error('Error: ', error)
    } 
}
    
main();


