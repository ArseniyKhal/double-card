import { renderApp } from './renderApp.js';
import { renderModules, modulesEl } from './components/module-component.js';

export let gameState = {
	difficultyLevel: 1,
	timeGame: 0,
	fieldSize: 6,
};
export let cardDeck = [2, 11, 22, 31, 0, 36];

if (gameState.difficultyLevel === 0) {
	renderModules();
} else {
	renderApp();
}

// renderModules();

// установка сложности игры
export const setDifficultyLevel = (difLv) => {
	gameState.difficultyLevel = difLv;
	difLv === 1
		? (gameState.fieldSize = 6)
		: difLv === 2
		? (gameState.fieldSize = 12)
		: (gameState.fieldSize = 18);
};

//начинаем новую игру
export const newGame = () => {
	cardDeck.length = 0;

	//создаем колоду дублей
	for (let i = 0; i < gameState.fieldSize; i = i + 2) {
		cardDeck[i] = Math.floor(Math.random() * 35);
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
export function initNewGame() {
	const buttonNewGame = document.getElementById('newGame');
	buttonNewGame.addEventListener('click', () => {
		modulesEl.classList.remove('display-none');
	});
}
