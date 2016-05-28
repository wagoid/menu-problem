/**
 * This file will use all the subset of solutions we have to solve a menu problem and print the solution to the console
 */
'use strict';

const ProblemBuilder = require('./problemBuilder.js');
const GreedyMenuSolver = require('./greedyMenuSolver.js');
const BacktrackingMenuSolver = require('./backtrackingMenuSolver.js');
const DynamicMenuSolver = require('./dynamicMenuSolver.js');

const problemBuilder = new ProblemBuilder();
const greedyMenuSolver = new GreedyMenuSolver();
const backtrackingMenuSolver = new BacktrackingMenuSolver();
const dynamicMenuSolver = new DynamicMenuSolver();
const fileName = process.argv[3] || './problems.txt';

function prettyPrintSolution(solution) {
  if (solution.length) {
    console.log(solution.reduce((valueSum, currentPlate) => valueSum + currentPlate.value, 0));
    var indexes = solution.map(plate => plate.plateNumber);
    console.log(indexes.join(' '));
  } else { // If there is no solution, just prints 0
    console.log(0);
  }
}

function useGreedyMenuSolver(problemInfo) {
  problemInfo.forEach(problem => {
    prettyPrintSolution(greedyMenuSolver.solve(problem));
  });
}

function useDynamicMenuSolver(problemInfo) {
  problemInfo.forEach(problem => {
    prettyPrintSolution(dynamicMenuSolver.solve(problem));
  });
}

function useBacktrackingForceMenuSolver(problemInfo) {
  problemInfo.forEach(problem => {
    
    var solution = backtrackingMenuSolver.solve(problem);
    if (solution) {
      console.log(solution.value);
      console.log(solution.platesSequence);
    } else {
      console.log(0);
    }
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
  case 'backtracking':
    problemBuilder.getMenuProblems(fileName)
      .then(useBacktrackingForceMenuSolver)
      .catch(logProblemBuilderError);
    break;
  case 'dynamic':
    problemBuilder.getMenuProblems(fileName)
      .then(useDynamicMenuSolver)
      .catch(logProblemBuilderError);
    break;
  default:
    console.log('Please provide which of the available solution you want to use as the first argument to the script.\nAvailable solutions are "greedy", "dynamic" and "backtracking"');
    break;
}
