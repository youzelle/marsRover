const Plateau = require('./plateau')

// ROVER

function compareArrayEle(arrOne, arrTwo){
    return arrOne[0] === arrTwo[0] && arrOne[1] == arrTwo[1];
  }

  // VALIDATION

function validateCoordinates(coordinates) {
  return /^\d+\s\d+$/.test(coordinates);
}

function validateDirection(direction) {
  return /[NEWS]/.test(direction);
}

function validateInstructions(instructions) {
  return /^[LMR]*$/.test(instructions);
}

// CLEAN INPUT

function processPlateauInfo(plateauInfo) {
  let plateauData = {};

  plateauData.maxCoordinates = [Number(plateauInfo.split(' ')[0]), Number(plateauInfo.split(' ')[0])];
  plateauData.obstacles = [];

  return new Plateau(plateauData.maxCoordinates, plateauData.obstacles);
}

function processRoverInfo(coords, direction, instructions) {
 const coordinates = coords.split(' ');

  return { 
     coordinates: [Number(coordinates[0]), Number(coordinates[1])],
     direction: direction,
     instructions: instructions
 };
}

module.exports = {
              compareArrayEle,
              validateCoordinates,
              validateDirection,
              validateInstructions,
              processPlateauInfo,
              processRoverInfo
}