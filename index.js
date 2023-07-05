import { renderApp } from './renderApp.js';
import { renderModules, modulesEl } from './components/module-component.js';

export let gameState = {
	difficultyLevel: 0,
	timeGame: 0,
	fieldSize: 36,
};
export let cardDeck = [];

let maxFieldSize = gameState.fieldSize;
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

for (let i = 0; i < gameState.fieldSize; i++) {
	cardDeck[i] = getRandomInt(maxFieldSize);
}

if (gameState.difficultyLevel === 0) {
	renderModules();
} else {
	renderApp();
}

// установка сложности игры
export const setDifficultyLevel = (difLv) => {
	gameState.difficultyLevel = difLv;
};

// начало новой игры
export const initNewGame = () => {
	const buttonNewGame = document.getElementById('newGame');
	buttonNewGame.addEventListener('click', () => {
		modulesEl.classList.remove('display-none');
		console.log('новая игра!');
	});
};
