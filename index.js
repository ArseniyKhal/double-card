import { renderApp } from './renderApp.js';
import { renderModules, modulesEl } from './components/module-component.js';

export let gameState = {
	difficultyLevel: 0,
	timeGame: 0,
	fieldSize: 18,
};
export let cardDeck = [];

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
