const plateauData = {
    gridSize: [5,5],
    obstacles: [],
}

const missionData = {
  roverOne: {
      location: [1, 2],
      direction: 'N',
      instructions: 'LMLMLMLMM'
  },
  roverTwo: {
      location: [3, 3],
      direction: 'E',
      instructions: 'MMRMMRMRRM'
  }
}

module.exports = {
    missionData,
    plateauData
}