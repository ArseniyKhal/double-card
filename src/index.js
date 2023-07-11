import './css/style.scss';
import { renderApp } from './js/renderApp.js';
import { renderModules, modulesEl } from './js/components/module-component.js';
import { format } from 'date-fns';

export let gameState = {
	difficultyLevel: 1,
	fieldSize: 6,
	timeGame: {
		sec: 0,
		min: 0,
	},
};
export let cardDeck = [2, 5, 13, 18, 22, 1];
let startGameTime = new Date();

if (gameState.difficultyLevel === 0) {
	renderModules();
} else {
	renderApp();
}

initNewGame();
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
	initNewGame();
};

//новая игра
function initNewGame() {
	// кнопка новая игра
	const buttonNewGame = document.getElementById('newGame');
	buttonNewGame.addEventListener('click', () => {
		modulesEl.classList.remove('display-none');
	});

	const cardItems = document.querySelectorAll('.card');
	const cardBacks = document.querySelectorAll('.back');
	const cardFronts = document.querySelectorAll('.front');

	//разворот карт через 5 сек
	setTimeout(seс5Rotate, 3000);
	function seс5Rotate() {
		for (const cardBack of cardBacks) {
			cardBack.classList.toggle('rotate-back');
		}
		for (const cardFront of cardFronts) {
			cardFront.classList.toggle('rotate');
		}
		setTaimer();
	}

	// таймер игры
	let seconds = gameState.timeGame.sec;
	let minutes = gameState.timeGame.min;

	function setTaimer() {
		seconds++;

		setInterval(() => {
			minutes = Number(minutes);
			if (seconds === 60) {
				seconds = 0;
				minutes++;
			}
			if (seconds < 10) {
				seconds = '0' + seconds;
			}
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			document.getElementById('volume-minut').innerHTML = minutes;
			document.getElementById('volume-sec').innerHTML = seconds;
			seconds++;
		}, 1000);

		startGameTime = new Date();
	}

	//поворот карты по клику
	let firstOpenCard = {};
	let oneOpenCard = false;
	for (const cardItem of cardItems) {
		cardItem.addEventListener('click', () => {
			oneOpenCard = !oneOpenCard;
			if (oneOpenCard) {
				firstOpenCard.card = Number(cardItem.dataset.card);
				firstOpenCard.index = Number(cardItem.dataset.index);
			} else {
				if (firstOpenCard.index === Number(cardItem.dataset.index)) {
					alert('Только не по этой же карте!');
					return;
				} else {
					if (firstOpenCard.card === Number(cardItem.dataset.card)) {
						alert('Вы победили');

						// вывод результата, остановка таймера
					} else {
						alert('Вы проиграли');
						let resultTime = format(
							new Date(Math.floor(new Date() - startGameTime)),
							'mm.ss'
						);
						console.log(resultTime);
						// вывод результата, остановка таймера
					}
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
