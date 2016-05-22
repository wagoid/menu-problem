'use strict';

const fs = require('fs');
const path = require('path');
const readLine = require('readline');

class ProblemBuilder {

  /**
   * Builds menu problem structured information from a file
   * 
   * @param {string} fileName - The file name relative to this file directory
   * @returns {Promise} (Take a look at tests to see the structure of the problem information)
   */
  getMenuProblems(fileName) {
    fileName = fileName || 'problems.txt';
    return this._getProblemFromFile(path.join(__dirname, fileName));
  }

  _getProblemFromFile(fileName) {
    return new Promise((resolve, reject) => {
      var problemInfo = [];
      var platesNumber = 0;
      var readPlates = 0;

      var lineReader = this._createLineReader(reject, fileName);

      lineReader.on('line', line => {
        var splitted = line.split(' ');

        if (this._isProblemInformationLine(splitted)) {
          readPlates = 0;
          var days = +splitted[0];
          platesNumber = +splitted[1];
          var budget = +splitted[2];

          this._validateLineValues(reject, line, days, platesNumber, budget);

          if (this._shouldStopReading(days, platesNumber, budget)) {
            lineReader.close();
          } else {
            this._addProblem(problemInfo, days, platesNumber, budget);
          }

        } else if (this._isPlateLine(splitted)) {
          readPlates++;
          var lastProblem = problemInfo[problemInfo.length - 1];
          var plateCost = +splitted[0];
          var plateValue = +splitted[1];

          this._validatePlateLine(reject, lastProblem, readPlates, platesNumber, plateCost, plateValue, line);

          this._addPlatesToProblem(lastProblem, plateCost, plateValue);
        } else {
          reject(new Error(`Unrecognized line format (${line}).`));
        }
      });

      lineReader.on('close', () => {
        resolve(problemInfo);
      });
    });
  }

  _addProblem(problemInfo, days, platesNumber, budget) {
    problemInfo.push({
      days,
      platesNumber,
      budget,
      plates: []
    });
  }

  _addPlatesToProblem(lastProblem, cost, value) {
    lastProblem.plates.push({ cost, value });
  }

  _validatePlateLine(reject, lastProblem, readPlates, platesNumber, plateCost, plateValue, line) {
    this._validateLineValues(reject, line, plateCost, plateValue);
    if (readPlates > platesNumber) {
      reject(new Error(`There were more plates than the specified in the previous line (${lastProblem.days} ${lastProblem.platesNumber} ${lastProblem.budget}).`));
    }
  }

  _validateLineValues(reject, line, ...valuestToCheck) {
    for (var value of valuestToCheck) {
      if (isNaN(value)) {
        reject(new Error(`Unrecognized line format (${line}).`));
      }
    }
  }

  _shouldStopReading(days, platesNumber, budget) {
    return days === 0 && platesNumber === 0 && budget === 0;
  }

  _createLineReader(reject, fileName) {
    if (!fs.existsSync(fileName)) {
      reject(new Error(`The file '${fileName}' was not found.`));
    }
    var lineReader = readLine.createInterface({
      input: fs.createReadStream(fileName)
    });

    return lineReader;
  }

  _isProblemInformationLine(splittedLine) {
    return splittedLine.length === 3;
  }

  _isPlateLine(splittedLine) {
    return splittedLine.length === 2;
  }
}

module.exports = ProblemBuilder;