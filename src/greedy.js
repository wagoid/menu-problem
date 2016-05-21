//TODO: write greedy implementation
function greedy(arrayDish){
	addGain(arrayDish);
	var days = 2;
	var platesNumber = 2;
	var budget = 5;
	var usedPlates = [];
	var usedIndexes = [];
	var usedCost = 0;

	while(usedCost < budget && days > 0){
		var bestPlate;
		var bestPlateIndex;
		for(var i in arrayDish){
			if(!bestPlate || bestPlate.fitness < arrayDish[i].fitness && (arrayDish[i].cost + usedCost) < budget){
				bestPlate = arrayDish[i];
				bestPlateIndex = i;
			}
		}
		arrayDish[bestPlateIndex].currentValue /= 2;

		for(var usedIndex of usedIndexes){
			if(usedIndex !== bestPlateIndex){
				arrayDish[usedIndex].currentValue = arrayDish[usedIndex].value; 
			}
		}

		usedIndexes.push(bestPlateIndex);
		usedCost += arrayDish[bestPlateIndex].cost;
		usedPlates.push(bestPlate);

		days--;
		}

		console.log(usedPlates);
}



function addGain(arrayDish)
{	var value;
	for(var i in arrayDish){
		value = arrayDish[i].value / arrayDish[i].cost;
		arrayDish[i].fitness = value;;
	}

	arrayDish.sort((a, b) => b.fitness - a.fitness);
}

array = [{cost: 2, value: 5, currentValue: 5, lastUsedIndex: -1},
 {cost: 3, value: 6, currentValue: 6, lastUsedIndex: -1}];
var days = 5;

//console.log(array.length)
greedy(array);