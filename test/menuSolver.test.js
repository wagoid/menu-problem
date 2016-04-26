'use strict';

const chai = require('chai');
const menuSolver = require('../src/menuSolver.js');
const path = require('path');
const fs = require('fs');
require('mocha-sinon');

const expect = chai.expect;
const PROBLEMS_FILE_PATH = path.join(__dirname, '../src/', 'problems.txt');

// function makeFileMock(filePath, content) {
//   var config = {};
//   config[filePath] = content;
//   mockfs(config);
// }

describe('Menu solver tests', () => {
  //Used to catch console.log made when calling the menusolver
  beforeEach(function() {
    var log = console.log;
    this.sinon.stub(console, 'log', function() {
      return log.apply(log, arguments);
    });
  });
  
  it('Should show error if the file does not exist', () => {
    return menuSolver('something wrong.txt')
      .then(() => {
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(`The file '${path.join(__dirname, '../src/', 'something wrong.txt')}' was not found.`)).to.be.true;
      });
  });
  
  it('Should show error if one line has something different of 2 and 3 items', () => {
    var backupFileContents = fs.readFileSync(PROBLEMS_FILE_PATH, 'utf-8');
    fs.writeFileSync(PROBLEMS_FILE_PATH, '1 1 3\n1\n3 5', 'utf-8');
    
    return menuSolver('problems.txt')
      .then(() => {
        fs.writeFileSync(PROBLEMS_FILE_PATH, backupFileContents, 'utf-8');
        expect(console.log.calledOnce).to.be.true;
        var expectedMessage = `Unrecognized line format (1).`;
        expect(console.log.calledWith(expectedMessage)).to.be.true;
      });
  });
  
  it('Should show error if any 3 items line have non number values', () => {
    var backupFileContents = fs.readFileSync(PROBLEMS_FILE_PATH, 'utf-8');
    fs.writeFileSync(PROBLEMS_FILE_PATH, '1 2 3wrong', 'utf-8');
    
    return menuSolver('problems.txt')
      .then(() => {
        fs.writeFileSync(PROBLEMS_FILE_PATH, backupFileContents, 'utf-8');
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(`Unrecognized line format (1 2 3wrong).`)).to.be.true;
      });
  });
  
  it('Should show error if any 2 items line have non number values', () => {
    var backupFileContents = fs.readFileSync(PROBLEMS_FILE_PATH, 'utf-8');
    fs.writeFileSync(PROBLEMS_FILE_PATH, '1 2 3\n1 2wrong', 'utf-8');
    
    return menuSolver('problems.txt')
      .then(() => {
        fs.writeFileSync(PROBLEMS_FILE_PATH, backupFileContents, 'utf-8');
        expect(console.log.calledOnce).to.be.true;
        expect(console.log.calledWith(`Unrecognized line format (1 2wrong).`)).to.be.true;
      });
  });
  
  it('Should show error if there are more plates than specified', () => {
    var backupFileContents = fs.readFileSync(PROBLEMS_FILE_PATH, 'utf-8');
    fs.writeFileSync(PROBLEMS_FILE_PATH, '1 1 3\n1 2\n3 5', 'utf-8');
    
    return menuSolver('problems.txt')
      .then(() => {
        fs.writeFileSync(PROBLEMS_FILE_PATH, backupFileContents, 'utf-8');
        expect(console.log.calledOnce).to.be.true;
        var expectedMessage = `There were more plates than the specified in the previous line (1 1 3).`;
        expect(console.log.calledWith(expectedMessage)).to.be.true;
      });
  });
});