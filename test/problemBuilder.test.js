'use strict';

const chai = require('chai');
const ProblemBuilder = require('../src/problemBuilder.js');
const problemBuilder = new ProblemBuilder();
const path = require('path');
const fs = require('fs');
const chaiAsPromised = require('chai-as-promised');

const expect = chai.expect;
const PROBLEMS_TESTS_FILE_NAME = 'problems-tests.txt';
const PROBLEMS_TESTS_FILE_PATH = path.join(__dirname, '../src/', PROBLEMS_TESTS_FILE_NAME);

chai.use(chaiAsPromised);

describe('ProblemBuilder', () => {
  after(() => {
    if (fs.existsSync(PROBLEMS_TESTS_FILE_PATH)) {
      fs.unlinkSync(PROBLEMS_TESTS_FILE_PATH);
    }
  });
  
  it('Should throw error if the file does not exist', () => {
    var expectedMessage = `The file '${path.join(__dirname, '../src/', 'something wrong.txt')}' was not found.`;
    return expect(problemBuilder.getMenuProblems('something wrong.txt')).to.be.rejectedWith(expectedMessage);
  });
  
  it('Should throw error if one line has something different of 2 and 3 items', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 1 3\n1\n3 5', 'utf-8');
    
    var expectedMessage = 'Unrecognized line format (1).';
    return expect(problemBuilder.getMenuProblems(PROBLEMS_TESTS_FILE_NAME)).to.be.rejectedWith(expectedMessage);
  });
  
  it('Should throw error if any 3 items line have non number values', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 2 3wrong', 'utf-8');
    
    var expectedMessage = 'Unrecognized line format (1 2 3wrong).';
    return expect(problemBuilder.getMenuProblems(PROBLEMS_TESTS_FILE_NAME)).to.be.rejectedWith(expectedMessage);
  });
  
  it('Should throw error if any 2 items line have non number values', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 2 3\n1 2wrong', 'utf-8');
    
    var expectedMessage = 'Unrecognized line format (1 2wrong).';
    return expect(problemBuilder.getMenuProblems(PROBLEMS_TESTS_FILE_NAME)).to.be.rejectedWith(expectedMessage);
  });
  
  it('Should throw error if there are more plates than specified', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 1 3\n1 2\n3 5', 'utf-8');
    
    var expectedMessage = 'There were more plates than the specified in the previous line (1 1 3).';
    return expect(problemBuilder.getMenuProblems(PROBLEMS_TESTS_FILE_NAME)).to.be.rejectedWith(expectedMessage);
  });
  
  it('Should return the structured problems from the problem file', () => {
    return expect(problemBuilder.getMenuProblems()).to.eventually.eql([
      {
        days: 2,
        platesNumber: 1,
        budget: 5,
        plates: [
          {
            cost: 3,
            value: 5
          }
        ]
      },
      {
        days: 3,
        platesNumber: 5,
        budget: 20,
        plates: [
          {
            cost: 2,
            value: 5
          },
          {
            cost: 18,
            value: 6
          },
          {
            cost: 1,
            value: 1
          },
          {
            cost: 3,
            value: 3
          },
          {
            cost: 2,
            value: 3
          }
        ]
      }
    ]);
  });
});