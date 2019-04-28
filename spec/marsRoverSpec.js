let Rover = require('../src/rover');
let Instructions = require('../src/instructions');
let Deploy = require('../src/deploy')

describe("Rover Methods", function() { 

  describe("Turning Left", function() {
  
      let roverOne = new Rover([1,2], 'N', {maxCoordinates: [5,5], obstacles: []});
      let roverTwo = new Rover([3,3], 'E', {maxCoordinates: [5,5], obstacles: []});
      Instructions(roverOne, 'L');
      Instructions(roverTwo, 'L');

    it("Only changes direction", function() {
      expect(roverOne.xCoordinate).toEqual(1);
      expect(roverOne.yCoordinate).toEqual(2);
      expect(roverOne.direction).toEqual('W');
      expect(roverTwo.xCoordinate).toEqual(3);
      expect(roverTwo.yCoordinate).toEqual(3);
      expect(roverTwo.direction).toEqual('N');
    });
  });

  describe("Turning Right", function() {

      let roverOne = new Rover([1,2], 'N', {maxCoordinates: [5,5], obstacles: []});
      let roverTwo = new Rover([3,3], 'E', {maxCoordinates: [5,5], obstacles: []});
      Instructions(roverOne, 'R');
      Instructions(roverTwo, 'R');
     
    it("It should only change direction", function() {

      expect(roverOne.xCoordinate).toEqual(1);
      expect(roverOne.yCoordinate).toEqual(2);
      expect(roverOne.direction).toEqual('E');
      expect(roverTwo.xCoordinate).toEqual(3);
      expect(roverTwo.yCoordinate).toEqual(3);
      expect(roverTwo.direction).toEqual('S');
    });
  });

  describe("Moving inside boundary", function() {

      let roverOne = new Rover([1,2], 'N', {maxCoordinates: [5,5], obstacles: []});
      let roverTwo = new Rover([3,3], 'E', {maxCoordinates: [5,5], obstacles: []});
      Instructions(roverOne, 'M');
      Instructions(roverTwo, 'M');
   
    it("It should only change coordinates", function() {

      expect(roverOne.xCoordinate).toEqual(1);
      expect(roverOne.yCoordinate).toEqual(3);
      expect(roverOne.direction).toEqual('N');
      expect(roverTwo.xCoordinate).toEqual(4);
      expect(roverTwo.yCoordinate).toEqual(3);
      expect(roverTwo.direction).toEqual('E');
    });
  });
  
  describe("Moving outside the boundary", function() {

    let roverOne = new Rover([1,5], 'N', {maxCoordinates: [5,5], obstacles: []});
    let roverTwo = new Rover([5,3], 'E', {maxCoordinates: [5,5], obstacles: []});
    Instructions(roverOne, 'M');
    Instructions(roverTwo, 'M');
  
    it("It should not move", function() {

      expect(roverOne.xCoordinate).toEqual(1);
      expect(roverOne.yCoordinate).toEqual(5);
      expect(roverOne.direction).toEqual('N');
      expect(roverTwo.xCoordinate).toEqual(5);
      expect(roverTwo.yCoordinate).toEqual(3);
      expect(roverTwo.direction).toEqual('E');
    });
  });

  describe("Complete execution of instructions", function() {

    let roverOne = new Rover([1,2], 'N', {maxCoordinates: [5,5], obstacles: []});
    let roverTwo = new Rover([3,3], 'E', {maxCoordinates: [5,5], obstacles: []});
    Instructions(roverOne, 'LMLMLMLMM');
    Instructions(roverTwo, 'MMRMMRMRRM');
  
    it("It should not move", function() {

      expect(roverOne.xCoordinate).toEqual(1);
      expect(roverOne.yCoordinate).toEqual(3);
      expect(roverOne.direction).toEqual('N');
      expect(roverTwo.xCoordinate).toEqual(5);
      expect(roverTwo.yCoordinate).toEqual(1);
      expect(roverTwo.direction).toEqual('E');
    });
  });   
  
  describe("Complete execution of instructions", function() {

    let roverOne = new Rover([1,2], 'N', {maxCoordinates: [5,5], obstacles: [[0,0]]});
    let roverTwo = new Rover([3,3], 'E', {maxCoordinates: [5,5], obstacles: [[4,3]]});
    Instructions(roverOne, 'LMLMLMLMM');
    Instructions(roverTwo, 'MMRMMRMRRM');
  
    it("It should not move", function() {

      expect(roverOne.xCoordinate).toEqual(1);
      expect(roverOne.yCoordinate).toEqual(3);
      expect(roverOne.direction).toEqual('N');
      expect(roverTwo.xCoordinate).toEqual(3);
      expect(roverTwo.yCoordinate).toEqual(3);
      expect(roverTwo.direction).toEqual('E');
    });
  });

  describe("Deploy multiple rovers", function() {

    const roverOne = {coordinates: [1, 2], direction: 'N', instructions: 'LMLMLMLMM'};
    const roverTwo = {coordinates: [3, 3], direction: 'E', instructions: 'MMRMMRMRRM'};
    const plateau = {maxCoordinates: [5,5], obstacles: []}
    const rovers = [roverOne, roverTwo];
    const deployResults = Deploy(rovers, plateau);
  
    it("should results for each rover", function() {

      expect(deployResults[0][1]).toEqual({ x: 1, y: 3, direction: 'N', message: 'Mission complete' });
      expect(deployResults[1][1]).toEqual({ x: 3, y: 3, direction: 'E', message: 'Obstacle or boundary ahead' });
    });
  });

});




  