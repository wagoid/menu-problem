"use strict";

class BacktrackingMenuSolver {
  
  solve(problem) {
    var usedPlates = null;
    if (problem && problem.plates && problem.plates.length) {
      usedPlates = this._solve(problem);
    }
    return usedPlates;
  }
  
  _solve({days, platesNumber, budget, plates}) {
    var subSets = {};
    this._buildSubSets(days, budget, subSets, plates);
    
    var bestSubSet = this._searchForBestItem(subSets);
    
    // If it could not get the desired number of plates, there is no solution to the menu
    if (bestSubSet.platesNumber < days) {
      bestSubSet = null;
    } else {
      bestSubSet = this._formatBestSubSet(bestSubSet);
    }
    
    return bestSubSet;
  }
  
  _callAddSubSet(subSets, currentSubSet, newItem, newSubSetIndex, budget, days) {
    var newItemValue = this._getNewItemValue(currentSubSet, newItem, newSubSetIndex);
    var newItemCost = currentSubSet? currentSubSet.cost + newItem.cost : newItem.cost;
    var newPlatesNumber = currentSubSet? currentSubSet.platesNumber + 1 : 1;
    //If the recently inserted item is better then tha previous one, the best item will be replaced
    return this._addSubSet(subSets, newSubSetIndex, newItemCost, newItemValue, newPlatesNumber, budget, days);
  }
  
  _addSubSet(subSets, subSetIndex, costSum, valueSum, platesNumber, budget, days) {
    var subSetToAdd;
    if (costSum <= budget && platesNumber <= days) {
       subSetToAdd = {
        subSetIndex,
        platesNumber,
        cost: costSum,
        value: valueSum
      };
      
      subSets[subSetIndex] = subSetToAdd;
    }
    
    return subSetToAdd;
  }
  
  _getNewItemValue(currentSubSet, newItem, newSubSetIndex) {
    var newValue = currentSubSet? currentSubSet.value : 0;
    // Does not consider the last value because the index always ends with a blank space
    var indexes = newSubSetIndex.split(' ').slice(0, -1);
    var lastIndex = +indexes.slice(-1).shift();
    var previousIndex = +indexes.slice(-2, -1).shift();
    var indexBeforePrevious = +indexes.slice(-3, -2).shift();
    var valueAddition;
    var usedThreeConsecutiveTimes = indexBeforePrevious === lastIndex && previousIndex === lastIndex;
    var usedTwoConsecutiveTimes = previousIndex === lastIndex;
    
    if (usedThreeConsecutiveTimes) {
      valueAddition = 0;
    } else if (usedTwoConsecutiveTimes) {
      valueAddition = newItem.value / 2;
    } else {
      valueAddition = newItem.value;
    }
    newValue += valueAddition;
    
    return newValue;
  }
  
  _formatBestSubSet(bestSubSet) {
    // Remove the last space from the best subSet
    bestSubSet.subSetIndex = bestSubSet.subSetIndex.trim();
    var platesSequence = '';
    // Raise by 1 all the numbers of the subSetIndex
    for (var i in bestSubSet.subSetIndex) {
      platesSequence += bestSubSet.subSetIndex[i] === ' '? ' ' : (+bestSubSet.subSetIndex[i] + 1);
    }
    
    return {
      platesSequence,
      value: bestSubSet.value
    };
  }
  
  _buildSubSets(days, budget, subSets, plates, subSetIndex) {
    for (var i in plates) {
      var newSubSetIndex = subSetIndex? subSetIndex + i.toString() + ' ' : i.toString() + ' ';
      
      var addedSubSet = this._callAddSubSet(subSets, subSets[subSetIndex], plates[i], newSubSetIndex, budget, days);
      if (addedSubSet) {
        this._buildSubSets(days, budget, subSets, plates, newSubSetIndex);
      }
    }
  }
  
  _checkBestItem(bestItem, newItem) {
    var hasGreaterValue = newItem.value > bestItem.value;
    var hasSameValueAndLowerCost = newItem.value === bestItem.value && (!bestItem.cost || newItem.cost <= bestItem.cost);
    if (hasGreaterValue || hasSameValueAndLowerCost) {
      bestItem.subSetIndex = newItem.subSetIndex;
      bestItem.platesNumber = newItem.platesNumber;
      bestItem.cost = newItem.cost;
      bestItem.value = newItem.value;
    }
  }
  
  _searchForBestItem(subSets) {
    //Initialize the best item
    var bestSubSet = {
      subSetIndex: '-1',
      platesNumber: -1,
      value: -1
    };
    for (var subSetIndex of Object.keys(subSets)) {
      this._checkBestItem(bestSubSet, subSets[subSetIndex]);
    }
    
    return bestSubSet; 
  }
}

module.exports = BacktrackingMenuSolver;