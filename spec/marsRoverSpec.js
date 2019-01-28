let Input = require('../src/input');
let Rover = require('../src/rover');
let Plateau = require('../src/plateau');
let Deploy = require('../src/deploy');
let Instructions = require('../src/instructions');

describe("Rover Methods", function() { 

  describe("Turning Left", function() {
  
      let roverOne = new Rover([1,2], 'N', [[5,5], []]);
      let roverTwo = new Rover([3,3], 'E', [[5,5], []]);
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

      let roverOne = new Rover([1,2], 'N', [[5,5], []]);
      let roverTwo = new Rover([3,3], 'E', [[5,5], []]);
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

      let roverOne = new Rover([1,2], 'N', [[5,5], []]);
      let roverTwo = new Rover([3,3], 'E', [[5,5], []]);
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

    let roverOne = new Rover([1,5], 'N', [[5,5], []]);
    let roverTwo = new Rover([5,3], 'E', [[5,5], []]);
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

    let roverOne = new Rover([1,2], 'N', [[5,5], []]);
    let roverTwo = new Rover([3,3], 'E', [[5,5], []]);
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
});


//tests for obstacles

//validate input


  