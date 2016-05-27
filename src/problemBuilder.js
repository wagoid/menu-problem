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
    this.error = null;
    fileName = fileName || 'problems.txt';
    return this._getProblemFromFile(path.join(__dirname, fileName));
  }

  _getProblemFromFile(fileName) {
    return new Promise((resolve, reject) => {
      var lineReader = this._createLineReader(reject, fileName);
      
      if (this.error) {
        reject(this.error);
      } else {
        this._buildProblemFromLineReader(lineReader, resolve, reject);
      }
    });
  }
  
  _buildProblemFromLineReader(lineReader, resolve, reject) {
    var problemInfo = [];
    var platesNumber = 0;
    var readPlates = 0;
    
    lineReader.on('line', line => {
      var lineValues = line.split(' ');

      if (this._isProblemInformationLine(lineValues)) {
        readPlates = 0;
        var days = +lineValues[0];
        platesNumber = +lineValues[1];
        var budget = +lineValues[2];

        this._validateLineValues(lineReader, line, days, platesNumber, budget);

        if (this._shouldStopReading(days, platesNumber, budget)) {
          lineReader.close();
        } else {
          this._addProblem(problemInfo, days, platesNumber, budget);
        }

      } else if (this._isPlateLine(lineValues)) {
        readPlates++;
        var lastProblem = problemInfo[problemInfo.length - 1];
        var plateCost = +lineValues[0];
        var plateValue = +lineValues[1];

        this._validatePlateLine(lineReader, lastProblem, readPlates, platesNumber, plateCost, plateValue, line);

        this._addPlatesToProblem(lastProblem, plateCost, plateValue);
      } else {
        this.error = new Error(`Unrecognized line format (${line}).`);
        lineReader.close();
      }
    });

    lineReader.on('close', () => {
      if (this.error) {
        reject(this.error);
      } else {
        resolve(problemInfo);
      }
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

  _validatePlateLine(lineReader, lastProblem, readPlates, platesNumber, plateCost, plateValue, line) {
    this._validateLineValues(lineReader, line, plateCost, plateValue);
    if (readPlates > platesNumber) {
      this.error = new Error(`There were more plates than the specified in the previous line (${lastProblem.days} ${lastProblem.platesNumber} ${lastProblem.budget}).`);
      lineReader.close();
    }
  }

  _validateLineValues(lineReader, line, ...valuestToCheck) {
    for (var value of valuestToCheck) {
      if (isNaN(value)) {
        this.error = new Error(`Unrecognized line format (${line}).`);
        lineReader.close();
      }
    }
  }

  _shouldStopReading(days, platesNumber, budget) {
    return days === 0 && platesNumber === 0 && budget === 0;
  }

  _createLineReader(reject, fileName) {
    var lineReader;
    if (!fs.existsSync(fileName)) {
      this.error = new Error(`The file '${fileName}' was not found.`);
    } else {
      lineReader = readLine.createInterface({
        input: fs.createReadStream(fileName)
      });
    }

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