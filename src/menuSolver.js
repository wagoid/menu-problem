var fs = require('fs');
var path = require('path');

solveMenuProblem();

function solveMenuProblem() {
  var problemInfo = getProblemFromFile(path.join(__dirname, 'problems.txt'));
  
  
}

function getNextProblemItems(problemArray, initialIndex, jumps) {
  var result = [];
  
  for (var i = initialIndex; i < (initialIndex + jumps) && i < problemArray.length; i++) {
    var splitted = problemArray[i].split(' ');
    result.push({ cost: +splitted[0], value: +splitted[1] });
  }
  
  return result;
}

function getProblemFromFile(fileName) {
  if (fs.existsSync(fileName)) {
    var data = fs.readFileSync(fileName, 'utf8');
    data = data.replace(/\r/g, '');
    var problemArray = data.split('\n');
    var problemInfo = [];
    
    for (var i = 0; i < problemArray.length; i++) {
      var splitted = problemArray[i].split(' ');
      
      if (splitted.length === 3) {
        var days = +splitted[0];
        var platesNumber = +splitted[1];
        var budget = +splitted[2];
        
        if (days !== 0 && platesNumber !== 0 && budget !== 0) {
          var plates = getNextProblemItems(problemArray, i + 1, platesNumber);
          problemInfo.push({
            days,
            platesNumber,
            budget,
            plates
          });
          
          i = i + platesNumber;
          if (i === problemArray.length - 1) {
            break;
          }
        }
      } else if (splitted.length === 2) {
        
      } else {
        
      }
    }
    
    return problemInfo;
  } else {
    console.log("The problems.txt file does not exist.");
  }
}

module.exports = solveMenuProblem;