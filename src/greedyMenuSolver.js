'use strict';

class GreedyMenuSolver {
  solve(problem) {
    var usedPlates;
    if (problem && problem.plates && problem.plates.length) {
      usedPlates = this._solve(problem);
    } else {
      usedPlates = [];
    }

    return usedPlates;
  }

  _solve({ days, platesNumber, budget, plates }) {
    var usedPlates = [];
    var usedIndexes = [];
    var usedCost = 0;

    this._addFitnessAndCurrentValueToPlates(plates);

    while (days > 0 && usedCost < budget) {
      var bestPlate = null;
      var bestPlateIndex = null;
      for (var i = 0; i < plates.length; i++) {
        var currentPlate = plates[i];
        var isBetterPlateThanPreviousBest = !bestPlate || bestPlate.fitness < currentPlate.fitness;
        var plateFitsInBudget = (currentPlate.cost + usedCost) < budget;
        if (isBetterPlateThanPreviousBest && plateFitsInBudget) {
          bestPlate = currentPlate;
          bestPlateIndex = i;
        }
      }

      if (bestPlateIndex !== null) {
        bestPlate.currentValue /= 2;
        bestPlate.fitness = this._getPlateFitness(bestPlate);
        usedIndexes.push(bestPlateIndex);
        usedCost += bestPlate.cost;
        usedPlates.push({
          cost: bestPlate.cost,
          value: bestPlate.value
        });

        for (var usedIndex of usedIndexes) {
          if (usedIndex !== bestPlateIndex) {
            plates[usedIndex].currentValue = plates[usedIndex].value;
          }
        }
      }

      days--;
    }

    return usedPlates;
  }

  _addFitnessAndCurrentValueToPlates(plates) {
    for (var i in plates) {
      plates[i].currentValue = plates[i].value;      
      plates[i].fitness = this._getPlateFitness(plates[i]);
    }
  }
  
  _getPlateFitness(plate) {
    return plate.currentValue / plate.cost;
  }
}

module.exports = GreedyMenuSolver;