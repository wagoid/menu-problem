'use strict';

const chai = require('chai');
const menuSolver = require('../src/menuSolver.js');
const path = require('path');
const fs = require('fs');
require('mocha-sinon');

const expect = chai.expect;
const PROBLEMS_TESTS_FILE_NAME = 'problems-tests.txt';
const PROBLEMS_TESTS_FILE_PATH = path.join(__dirname, '../src/', PROBLEMS_TESTS_FILE_NAME);

describe('Menu solver tests', () => {
  //Used to catch console.log made when calling the menusolver
  beforeEach(function() {
    var log = console.log;
    this.sinon.stub(console, 'log', function() {
      return log.apply(log, arguments);
    });
  });
  
  after(() => {
    fs.unlinkSync(PROBLEMS_TESTS_FILE_PATH);
  });
  
  it('Should show error if the file does not exist', () => {
    return menuSolver('something wrong.txt')
      .then(() => {
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(`The file '${path.join(__dirname, '../src/', 'something wrong.txt')}' was not found.`)).to.be.true;
      });
  });
  
  it('Should show error if one line has something different of 2 and 3 items', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 1 3\n1\n3 5', 'utf-8');
    
    return menuSolver(PROBLEMS_TESTS_FILE_NAME)
      .then(() => {
        expect(console.log.calledOnce).to.be.true;
        var expectedMessage = `Unrecognized line format (1).`;
        expect(console.log.calledWith(expectedMessage)).to.be.true;
      });
  });
  
  it('Should show error if any 3 items line have non number values', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 2 3wrong', 'utf-8');
    
    return menuSolver(PROBLEMS_TESTS_FILE_NAME)
      .then(() => {
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(`Unrecognized line format (1 2 3wrong).`)).to.be.true;
      });
  });
  
  it('Should show error if any 2 items line have non number values', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 2 3\n1 2wrong', 'utf-8');
    
    return menuSolver(PROBLEMS_TESTS_FILE_NAME)
      .then(() => {
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(`Unrecognized line format (1 2wrong).`)).to.be.true;
      });
  });
  
  it('Should show error if there are more plates than specified', () => {
    fs.writeFileSync(PROBLEMS_TESTS_FILE_PATH, '1 1 3\n1 2\n3 5', 'utf-8');
    
    return menuSolver(PROBLEMS_TESTS_FILE_NAME)
      .then(() => {
        expect(console.log.calledOnce).to.be.true;
        var expectedMessage = `There were more plates than the specified in the previous line (1 1 3).`;
        expect(console.log.calledWith(expectedMessage)).to.be.true;
      });
  });
  
  
  /* ======== Resolution tests. Uncomment when the menu solver is fully implemented ======== */
  
  
  // it('Should show the proper result for a test case', () => {
  //   return menuSolver(PROBLEMS_TESTS_FILE_NAME)
  //     .then(() => {
  //       expect(console.log.called).to.be.true;
  //       expect(console.log.calledWith('0.0\n13.0\n1 5 1')).to.be.true;
  //     });
  // });
});