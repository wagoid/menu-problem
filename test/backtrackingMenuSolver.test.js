'use strict';

const chai = require('chai');
const BacktrackingMenuSolver = require('../src/backtrackingMenuSolver.js');

const expect = chai.expect;
const backtrackingMenuSolver = new BacktrackingMenuSolver();

var baseProblem = function() {
  return {
    days: 2,
    platesNumber: 1,
    budget: 6,
    plates: [
      {
        cost: 3,
        value: 5
      }
    ]
  };
};

describe('backtrackingMenuSolver', function() {
  this.timeout(5000);
  
  it('Should return an empty array if there is no plate in the menu', () => {
    var problem = baseProblem();
    problem.plates = [];
    
    expect(backtrackingMenuSolver.solve(problem)).to.eql(null);
  });
  
  it('Should return an ampty array if every menu option exceeds the budget', () => {
    var problem = baseProblem();
    problem.plates[0].cost = 6;
    
    expect(backtrackingMenuSolver.solve(problem)).to.eql(null);
  });
  
  it('Should get the correct answer for a problem', () => {
    var problem = baseProblem();
    
    expect(backtrackingMenuSolver.solve(problem)).to.eql({platesSequence: '1 1', value: 7.5});
    
    problem = { days: 3, platesNumber: 5, budget: 20, 
      plates: [
        { cost: 2, value: 5 }, { cost: 18, value: 6 },
        { cost: 1, value: 1 }, { cost: 3, value: 3 }, { cost: 2, value: 3 }
      ]
    };
    
    expect(backtrackingMenuSolver.solve(problem)).to.eql({platesSequence: '1 5 1', value: 13});
  });
  
  it('Should get the sequence with greater profit when having a big budget', () => {
    var problem = { days: 6, platesNumber: 12, budget: 50000, 
      plates: [ 
        { cost: 2, value: 5 }, { cost: 18, value: 6 },
        { cost: 1, value: 1 }, { cost: 3, value: 3 }, { cost: 2, value: 3  }
      ]
    };
    
    var solution = backtrackingMenuSolver.solve(problem);
    expect(solution).to.eql({platesSequence: '2 1 2 1 2 1', value: 33});
  });
  
  // it('Should get the best solution for a big problem', () => {
  //   var problem = { days: 30, platesNumber: 22, budget: 120,
  //     plates: [
  //       { cost: 1, value: 2 }, { cost: 2, value: 3 },
  //       { cost: 3, value: 4 }, { cost: 4, value: 5 },
  //       { cost: 5, value: 6 }, { cost: 6, value: 7 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 9, value: 10 }, { cost: 10, value: 11 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //       { cost: 7, value: 8 }, { cost: 8, value: 9 },
  //     ]
  //   };
    
  //   expect(backtrackingMenuSolver.solve(problem)).to.eql({});
  // });
});