'use strict';

class DynamicMenuSolver {
  
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
		var table = this._buildEmptyMatrix(plates.length, days);
		for (var j = 0; j < days; j++) {
			for (var i = 0; i < plates.length; i++) {
				if(j > 0) {
					table[i][j].plates = table[i][j - 1].plates;
					table[i][j].cost = table[i][j - 1].cost;
				}
				table[i][j].plates.push(this._findBesCost(plates, i, table[i][j].plates));
				table[i][j].cost += table[i][j].plates[table[i][j].plates.length - 1].cost;
			}
		}
		if(table[i-1][j-1].cost > budget)
			return [];
		return table[i-1][j-1].plates;
	}

	_findBesCost(plates, i, alreaadyFill){
		var actualFitness = 0;
		var actualPlate = {};
		this._addFitnessAndCurrentValueToPlates(plates, alreaadyFill);
		for(i in plates) {
			if(plates[i].fitness > actualFitness) {
				actualFitness = plates[i].fitness;
				actualPlate = plates[i];
				actualPlate.plateNumber = parseInt(i) + 1;
			}
		}
		return {cost: actualPlate.cost, value: actualPlate.value, plateNumber: actualPlate.plateNumber};
	}

	_addFitnessAndCurrentValueToPlates(plates, alreaadyFill) {
		for (var i in plates) {
			var twoDays;
			var lastday;
			plates[i].currentValue = plates[i].value;
			if(alreaadyFill[alreaadyFill.length - 1])
				lastday = alreaadyFill[alreaadyFill.length - 1].plateNumber == plates[i].plateNumber;
			if(alreaadyFill[alreaadyFill.length - 2])
				twoDays = alreaadyFill[alreaadyFill.length - 2].plateNumber && lastday
			if(twoDays) {
				plates[i].currentValue = 0;
			} else if(lastday) {
				plates[i].currentValue = plates[i].value / 2;
			} else {
				plates[i].currentValue = plates[i].value;
			}
			plates[i].fitness = this._getPlateFitness(plates[i]);
		}
	}

	_getPlateFitness(plate, value) {
		return plate.currentValue / plate.cost;
	}

	_buildEmptyMatrix(lines, columns) {
		var matrix = [];
		for (var line = 0; line < lines; line++) {
			matrix[line] = [];
			for (var column = 0; column < columns; column++) {
				matrix[line][column] = {
					day: column + 1,
					plate: line + 1,
					plates: [],
					cost: 0
				};
			}
		}
		return matrix;
	}
}

module.exports = DynamicMenuSolver;