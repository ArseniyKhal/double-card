import { renderApp } from './renderApp.js';
import { renderModules, modulesEl } from './components/module-component.js';

export let gameState = {
	difficultyLevel: 0,
	timeGame: 0,
	fieldSize: 18,
};
export let cardDeck = [];

renderModules();

// установка сложности игры
export const setDifficultyLevel = (difLv) => {
	gameState.difficultyLevel = Number(difLv);
	if (gameState.difficultyLevel == 1) {
		gameState.fieldSize = 6;
	} else if (gameState.difficultyLevel == 2) {
		gameState.fieldSize = 12;
	} else {
		gameState.fieldSize = 18;
	}
};

//начинаем новую игру
export const newGame = () => {
	cardDeck.length = 0;
	console.log(`размер поля: ${gameState.fieldSize}`);

	//создаем колоду дублей
	for (let i = 0; i < gameState.fieldSize; i = i + 2) {
		cardDeck[i] = Math.floor(Math.random() * 36);
		cardDeck[i + 1] = cardDeck[i];
	}
	// перемешиваем колоду
	function shuffle(array) {
		array.sort(() => Math.random() - 0.5);
	}
	shuffle(cardDeck);
	renderApp();
};

// кнопка новая игра
export const initNewGame = () => {
	const buttonNewGame = document.getElementById('newGame');
	buttonNewGame.addEventListener('click', () => {
		modulesEl.classList.remove('display-none');
	});
};
