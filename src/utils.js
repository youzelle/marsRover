function compareArrays(arrOne, arrTwo){
    let result;
  
    arrOne.forEach((eleOne) => arrTwo.forEach(eleTwo => {
      return (eleOne != eleTwo) ? result = false : result = true;
    }))
  
    return result;
  }

function validateCoordinates(coordinates) {
  return /^\d+\s*\,\d+\s*$/.test(coordinates.join());
}

function validateDirection(direction) {
  return /[NEWS]/.test(direction);
}

function validateInstructions(instructions) {
  return /^[LMR]*$/.test(instructions);
}

module.exports = {
              compareArrays,
              validateCoordinates,
              validateDirection,
              validateInstructions
}