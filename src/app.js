const prompts = require('prompts');
const deployRovers = require('./deploy');
const Plateau = require('./plateau')

console.log('Begininig!')


let globalRovers = []

function askQuestions(){
    let initialQuestionNumber = 1
    
    prompts({
        name: 'gridSize',
        type: 'text',
        message: 'Grid size',
        validate: gridSize => /^\d\s\d$/.test(gridSize) || 'Incorrect Format',
    }).then(async (gridResponse) => {
        await askRolloverQuestion(initialQuestionNumber)
        let plateau = processPlateau(gridResponse)
        console.log(deployRovers(globalRovers, plateau))
    });
}

function askContinueQuestion(){
    let continueQuestion = {
        name: 'continue',
        type: 'confirm',
        message: 'Do you want to continue?',
        validate: answer =>  /y|n/.test(answer) || 'Please enter y or n'
    }
    return prompts(continueQuestion)
}

function askRolloverQuestion(questionNumber){
    return prompts([
        {
          name: 'locationRover' + questionNumber,
          type: 'text',
          message: `Rover ${questionNumber}: Location`,
         validate: rollOver => /^\d\s\d\s[NEWS]$/.test(rollOver) || 'Incorrect Format',
         }, {
          name: `instructionsRover${questionNumber}`,
          type: 'text',
          message: `Rover ${questionNumber}: Instructions`,
         validate: instructionsRover => /^[LMR]*$/.test(instructionsRover) || 'Incorrect Format',
         }
      ]).then(rollOverAnswer => {
        return askContinueQuestion().then((continueResponse) => {
            if (continueResponse.continue){
                console.log('------Question number before addition', questionNumber)
                questionNumber += 1
                console.log('------Question number after addition', questionNumber)
                return askRolloverQuestion(questionNumber)
            }
            console.log((processRolloverQuestion(rollOverAnswer, questionNumber)))
        })
    });
}

function processRolloverQuestion(rollOverAnswer, questionNumber) {
    let missionData = {};

    let locat = rollOverAnswer[`locationRover${questionNumber}`].split(' ');

    missionData[`rover${questionNumber}`] = { 
        location: [Number(locat[0]), Number(locat[1])],
        direction: locat[2],
        instructions: rollOverAnswer[`instructionsRover${questionNumber}`]

    };
    let rover = missionData[`rover${questionNumber}`]
    return rover
    
}

// prompts(questions).then(function(response) {
//     let plateauData = {};
//     let missionData = {};

//     plateauData.gridSize = [Number(response.gridSize.split(' ')[0]), Number(response.gridSize.split(' ')[0])];
//     plateauData.obstacles = [];


//     let locatOne = response.locationRoverOne.split(' ');
//     // let locatTwo = response.locationRoverTwo.split(' ');


//     missionData.roverOne = { 
//         location: [Number(locatOne[0]), Number(locatOne[1])],
//         direction: locatOne[2],
//         instructions: response.instructionsRoverOne

//     };
//     // missionData.roverTwo = { 
//     //         location: [Number(locatTwo[0]), Number(locatTwo[1])],
//     //         direction: locatTwo[2],
//     //         instructions: response.instructionsRoverTwo

//     //     };

//     // let rovers = [missionData.roverOne,missionData.roverTwo]
//     let rovers = [missionData.roverOne]
//     let plateau = new Plateau(plateauData.gridSize, plateauData.obstacles);
//     console.log(deployRovers(rovers, plateau));

    
// }).catch(err => console.log('Error: ', err))

function processPlateau(gridResponse){
    let plateauData = {};
    plateauData.gridSize = [Number(gridResponse.gridSize.split(' ')[0]), Number(gridResponse.gridSize.split(' ')[0])];
    plateauData.obstacles = [];
    return new Plateau(plateauData.gridSize, plateauData.obstacles)
}


askQuestions()