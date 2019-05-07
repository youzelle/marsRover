A squad of robotic rovers are to be landed by NASA on a plateau on Mars. This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.

A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0 0 N, which means the rover is in the bottom left corner and facing North.

The rover is controlled by a set of instructions in the form of a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading. If an instruction takes the rover outside the grid or an obstacle is encountered the rover stops. 

INSTALL:
You will need node and npm. Type npm install.

TESTS: 
marsRover directory run npm run test from command line

USER INPUT
marsRover directory run npm start from command line. Input should be in the form

Coordinates: Number Number
Direction: N, E, S or W
Instructions: L, M or R

