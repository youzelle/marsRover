const Plateau = require('../src/plateau');

describe("Max coordinates of the plateau", function() { d
  it("should return the maximum plateau coordinates", function() {
    // Arrange
    const maxCoordinates = [10, 10];
    const obstacles = [];

    // Act
    const plateau = new Plateau(maxCoordinates, obstacles)
    
    // Assert
    expect(plateau.maxCoordinates).toEqual(maxCoordinates);
  });
});