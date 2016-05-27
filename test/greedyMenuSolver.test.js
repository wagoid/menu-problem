'use strict';

const chai = require('chai');
const GreedyMenuSolver = require('../src/greedyMenuSolver.js');

const expect = chai.expect;
const greedyMenuSolver = new GreedyMenuSolver();

var baseProblem = function() {
  return {
    days: 2,
    platesNumber: 1,
    budget: 5,
    plates: [
      {
        cost: 3,
        value: 5
      }
    ]
  };
};

describe('greedyMenuSolver', () => {
  it('Should return an empty array if there is no plate in the menu', () => {
    var problem = baseProblem();
    problem.plates = [];
    
    expect(greedyMenuSolver.solve(problem)).to.eql([]);
  });
  
  it('Should return an ampty array if every menu option exceeds the budget', () => {
    var problem = baseProblem();
    problem.plates[0].cost = 6;
    
    expect(greedyMenuSolver.solve(problem)).to.eql([]);
  });
  
  it('Should get the correct answer for a problem', () => {
    var problem = baseProblem();
    
    expect(greedyMenuSolver.solve(problem)).to.eql([{plateNumber: 1, cost: 3, value: 5}]);
    
    problem = { days: 3, platesNumber: 5, budget: 20, 
      plates: [ 
        { cost: 2, value: 5 }, { cost: 18, value: 6 },
        { cost: 1, value: 1 }, { cost: 3, value: 3 }, { cost: 2, value: 3  }
      ]
    };
    
    expect(greedyMenuSolver.solve(problem)).to.eql([{plateNumber: 1, cost: 2, value: 5}, {plateNumber: 5, cost: 2, value: 3}, {plateNumber: 1, cost: 2, value: 5}]);
  });
  
  it('Should preserve the plates used in the menu for different number of days', () => {
    var problem = { days: 3, platesNumber: 5, budget: 20, 
      plates: [ 
        { cost: 2, value: 5 }, { cost: 18, value: 6 },
        { cost: 1, value: 1 }, { cost: 3, value: 3 }, { cost: 2, value: 3  }
      ]
    };
    
    var solution = greedyMenuSolver.solve(problem);
    var allCost2andValue3or5 = solution.every(plate => (plate.value === 5 || plate.value === 3) && plate.cost === 2);
    
    problem = { days: 1000, platesNumber: 12, budget: 50000, 
      plates: [ 
        { cost: 2, value: 5 }, { cost: 18, value: 6 },
        { cost: 1, value: 1 }, { cost: 3, value: 3 }, { cost: 2, value: 3  }
      ]
    };
    
    solution = greedyMenuSolver.solve(problem);
    allCost2andValue3or5 = solution.every(plate => (plate.value === 5 || plate.value === 3) && plate.cost === 2);
    expect(allCost2andValue3or5).to.be.true;
  });
});