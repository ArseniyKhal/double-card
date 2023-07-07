import { renderApp } from './renderApp.js';
import { renderModules, modulesEl } from './components/module-component.js';

export let gameState = {
	difficultyLevel: 0,
	timeGame: 0,
	fieldSize: 6,
};
export let cardDeck = [2, 11, 22, 31, 0, 36];

if (gameState.difficultyLevel === 0) {
	renderModules();
} else {
	renderApp();
}

// renderApp();
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

//новая игра
export function initNewGame() {
	// кнопка новая игра
	const buttonNewGame = document.getElementById('newGame');
	buttonNewGame.addEventListener('click', () => {
		modulesEl.classList.remove('display-none');
	});

	const cardItems = document.querySelectorAll('.card');
	const cardBacks = document.querySelectorAll('.back');
	const cardFronts = document.querySelectorAll('.front');

	//разворот карт через 5 сек
	setTimeout(sek5Rotate, 5000);
	function sek5Rotate() {
		for (const cardBack of cardBacks) {
			cardBack.classList.toggle('rotate-back');
		}
		for (const cardFront of cardFronts) {
			cardFront.classList.toggle('rotate');
		}
	}

	//поворот карты по клику
	let firstOpenCard = null;
	let oneOpenCard = false;
	for (const cardItem of cardItems) {
		cardItem.addEventListener('click', () => {
			oneOpenCard = !oneOpenCard;
			if (oneOpenCard) {
				firstOpenCard = Number(cardItem.dataset.card);
			}

			if (!oneOpenCard) {
				if (firstOpenCard === Number(cardItem.dataset.card)) {
					alert('Вы победили');
				} else {
					alert('Вы проиграли');
				}
			}

			const index = cardItem.dataset.index;
			for (const cardBack of cardBacks) {
				if (cardBack.dataset.index === index) {
					cardBack.classList.toggle('rotate-back');
				}
			}
			for (const cardFront of cardFronts) {
				if (cardFront.dataset.index === index) {
					cardFront.classList.toggle('rotate');
				}
			}
		});
	}
}
