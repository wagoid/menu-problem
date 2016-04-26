'use strict';

const fs = require('fs');
const path = require('path');
const readLine = require('readline');

const fileName = process.argv[2] || 'problems.txt';

solveMenuProblem(fileName);

function solveMenuProblem(fileName) {
  return getProblemFromFileAsync(path.join(__dirname, fileName))
    .then(problemInfo => {
      console.log(JSON.stringify(problemInfo, null, 4));
    })
    .catch(e => {
      console.log(e.message);
    });
}

function getProblemFromFileAsync(fileName) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(fileName)) {
      return reject(new Error(`The file '${fileName}' was not found.`));
    }
    var problemInfo = [];
    var lineReader = readLine.createInterface({
      input: fs.createReadStream(fileName)
    });
    
    var platesNumber = 0;
    var readPlates = 0;
      
    lineReader.on('line', (line) => {
      var splitted = line.split(' ');
      
      if (splitted.length === 3) {
        readPlates = 0;
        var days = +splitted[0];
        platesNumber = +splitted[1];
        var budget = +splitted[2];
        
        if (isNaN(days) || isNaN(platesNumber) || isNaN(budget)) {
          return reject(new Error(`Unrecognized line format (${line}).`));
        }
        
        if (days === 0 && platesNumber === 0 && budget === 0) {
          lineReader.close();
        } else {
          problemInfo.push({
            days,
            platesNumber,
            budget,
            plates: []
          });
        }
          
      } else if (splitted.length === 2) {
        readPlates++;
        var lastProblem = problemInfo[problemInfo.length -1];
        var plateCost = +splitted[0];
        var plateValue = +splitted[1];
        
        if (isNaN(plateCost) || isNaN(plateValue)) {
          return reject(new Error(`Unrecognized line format (${line}).`));
        }
        if (readPlates > platesNumber) { 
          return reject(new Error(`There were more plates than the specified in the previous line (${lastProblem.days} ${lastProblem.platesNumber} ${lastProblem.budget}).`));
        }
        
        var plate = { cost: +splitted[0], value: +splitted[1] };
        lastProblem.plates.push(plate);
      } else {
        return reject(new Error(`Unrecognized line format (${line}).`));
      }
    });

    lineReader.on('close', () => {
      resolve(problemInfo);
    });
  });
}

module.exports = solveMenuProblem;