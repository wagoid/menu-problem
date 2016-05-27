'use strict';

class GreedyMenuSolver {
  
  /**
   * Gets the best option of plates to serve in a given number of days
   * 
   * @param {array} problem - the structured information of the problem to solve
   * @returns {array} - a collection of the best option of plates to serve
   * @example example result: 
   * [
   *   {
   *     plateNumber: 1,
   *     cost: 3,
   *     value: 5
   *   }
   * ]
   */
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
    var daysCounter = days;
    var usedPlates = [];
    var usedIndexes = [];
    var usedCost = 0;

    this._addFitnessAndCurrentValueToPlates(plates);

    while (daysCounter > 0 && usedCost < budget && usedPlates.length < days) {
      var bestPlate = null;
      var bestPlateIndex = null;
      
      for (var i = 0; i < plates.length; i++) {
        var currentPlate = plates[i];
        var isBetterPlateThanPreviousBest = !bestPlate || bestPlate.fitness < currentPlate.fitness;
        var plateFitsInBudget = (currentPlate.cost + usedCost) <= budget;
        if (isBetterPlateThanPreviousBest && plateFitsInBudget) {
          bestPlate = currentPlate;
          bestPlateIndex = i;
        }
      }

      if (bestPlateIndex !== null) {
        bestPlate.currentValue = bestPlate.currentValue == bestPlate.value? bestPlate.currentValue / 2 : 0;
        bestPlate.fitness = this._getPlateFitness(bestPlate);
        usedIndexes.push(bestPlateIndex);
        usedCost += bestPlate.cost;
        usedPlates.push({
          plateNumber: bestPlateIndex + 1,
          cost: bestPlate.cost,
          value: bestPlate.value
        });

        for (var usedIndex of usedIndexes) {
          if (usedIndex !== bestPlateIndex) {
            plates[usedIndex].currentValue = plates[usedIndex].value;
            plates[usedIndex].fitness = this._getPlateFitness(plates[usedIndex]);
          }
        }
      }

      daysCounter--;
    }
    
    if (usedCost > budget || usedPlates.length < days) {
      usedPlates = [];
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