export function transpose(array) {
	return array[0].map((col, i) => array.map(row => row[i]));
}

export function multiply(arrOne, arrTwo) {
	const newArr = [];

	for (let i = 0; i < arrOne.length; i++) {
		newArr[i] = [];

		for (let j = 0; j < arrTwo[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < arrOne[0].length; k++) {
				sum += arrOne[i][k] * arrTwo[k][j];
			}
			newArr[i][j] = sum;
		}
	}

	return newArr;
}

export function addition(arrOne, arrTwo) {
	const newArr = [];

	for (let i = 0; i < arrOne.length; i++) {
		newArr[i] = [];

		for (let j = 0; j < arrOne[0].length; j++) {
			newArr[i][j] = arrOne[i][j] + arrTwo[i][j];
		}
	}

	return newArr;
}

export function zerosDiagonal(arr) {
	const newArr = [...arr];

	for (let i = 0; i < newArr.length; i++) {
		newArr[i][i] = 0;
	}

	return newArr;
}
