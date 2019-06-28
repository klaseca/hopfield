import { transpose, multiply, addition, zerosDiagonal } from './matrix.js';

function main() {
	const elements = document.querySelectorAll('.element');
	const addWise = document.querySelector('.add-wise');
	const determineWise = document.querySelector('.determine-wise');
	const clearPanelBtn = document.querySelector('.clear-panel');
	const delWises = document.querySelector('.del-wises');

	const wises = [];

	elements.forEach(item => {
		item.addEventListener('click', () => {
			if (item.classList.contains('not-selected')) {
				item.classList.remove('not-selected');
				item.classList.add('selected');
			} else {
				item.classList.remove('selected');
				item.classList.add('not-selected');
			}
		});
	});

	addWise.addEventListener('click', () => {
		const wise = addedWise(elements);

		wises.push(wise);

		clearPanel(elements);
	});

	determineWise.addEventListener('click', () => {
		if (wises.length === 0) {
			alert('Add wise');
		} else {
			const matrixMain = mainMatrix(wises);

			const wise = addedWise(elements);

			const wiseTranspose = transpose(wise);

			const wiseResult = multiply(matrixMain, wiseTranspose);

			const wiseNormalize = signFunction(wiseResult);

			const match = matchSearch(wises, wiseNormalize);

			if (match) {
				clearPanel(elements);
				showMatch(match, elements);
			} else {
				alert('Not matches');
			}
		}
	});

	clearPanelBtn.addEventListener('click', () => {
		clearPanel(elements);
	});

	delWises.addEventListener('click', () => {
		wises.length = 0;
	});
}

function addedWise(elements) {
	const wise = [[]];
	elements.forEach((item, i) => {
		if (item.classList.contains('not-selected')) {
			wise[0].push(-1);
		} else {
			wise[0].push(1);
		}
	});
	return wise;
}

function mainMatrix(wises) {
	const transposeWises = wises.map(wise => {
		return transpose(wise);
	});

	const multiplyWises = wises.map((wise, i) => {
		return multiply(transposeWises[i], wises[i]);
	});

	const additionWises = multiplyWises.reduce((previous, current) => {
		return addition(previous, current);
	});

	const zeroDiagonal = zerosDiagonal(additionWises);

	return zeroDiagonal;
}

function matchSearch(wises, result) {
	const resultJSON = JSON.stringify(result);

	const match = wises.find(item => {
		return JSON.stringify(item) === resultJSON;
	});

	return match;
}

function showMatch(wise, elements) {
	elements.forEach((item, i) => {
		if (wise[0][i] === 1) {
			item.classList.add('selected');
		}
	});
}

function signFunction(array) {
	const newArray = array.map(item => {
		return item >= 0 ? 1 : -1;
	});
	return [newArray];
}

function clearPanel(elements) {
	elements.forEach(item => {
		if (item.classList.contains('selected')) {
			item.classList.remove('selected');
			item.classList.add('not-selected');
		}
	});
}

main();
