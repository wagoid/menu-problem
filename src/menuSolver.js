/**
 * This file will use all the subset of solutions we have to solve a menu problem and print the solution to the console
 */
'use strict';

const ProblemBuilder = require('./problemBuilder.js');
const problemBuilder = new ProblemBuilder();
const GreedyMenuSolver = require('./greedyMenuSolver.js');
const greedyMenuSolver = new GreedyMenuSolver();

const fileName = process.argv[3] || './problems.txt';

function prettyPrintSolution(solution) {
  if (solution.length) {
    console.log(solution.reduce((valueSum, currentPlate) => valueSum + currentPlate.value, 0));
    var indexes = solution.map(plate => plate.plateNumber);
    console.log(indexes.join(' '));
  }
}

function useGreedyMenuSolver(problemInfo) {
  problemInfo.forEach(problem => {
    prettyPrintSolution(greedyMenuSolver.solve(problem));
  });
}

function logProblemBuilderError(err) {
  console.log(err.message);
}

switch (process.argv[2]) {
  case 'greedy':
    problemBuilder.getMenuProblems(fileName)
      .then(useGreedyMenuSolver)
      .catch(logProblemBuilderError);
    break;
  default:
    console.log('Please provide which of the available solution you want to use as the first argument to the script.\nAvailable solutions are "greedy", "dynamic" and "brute"');
    break;
}
