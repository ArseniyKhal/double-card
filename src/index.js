import './css/style.scss';
import { renderApp } from './js/renderApp.js';
import {
	renderModules,
	modulesEl,
	giveResultTime,
} from './js/components/module-component.js';

// СРИСОК ПРОБЛЕМ:
// таймер не останавливается после окончания игры
// в результат не выводится время игры

export let gameState = {
	difficultyLevel: 0,
	state: 'start',
	timeGame: {
		sec: 0,
		min: 0,
	},
};
export let cardDeck = [];
// let seconds = gameState.timeGame.sec;
// let minutes = gameState.timeGame.min;

if (gameState.difficultyLevel === 0) {
	renderModules({ state: gameState.state });
} else {
	renderApp();
}

// renderModules();
// initNewGame();
// renderApp();

export const setModuleToStart = () => (gameState.state = 'start');

// установка сложности игры
export const setDifficultyLevel = (difLv) =>
	(gameState.difficultyLevel = difLv);

//начинаем новую игру
export const newGame = () => {
	cardDeck.length = 0;
	gameState.timeGame.sec = 0;
	gameState.timeGame.min = 0;

	//создаем колоду дублей
	for (let i = 0; i < gameState.difficultyLevel; i = i + 2) {
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
let loss = false;

//новая игра
function initNewGame() {
	// кнопка Начать заново
	const buttonNewGame = document.getElementById('newGame');
	buttonNewGame.addEventListener('click', () => {
		modulesEl.classList.remove('display-none');
	});

	const cardItems = document.querySelectorAll('.card');
	const cardBacks = document.querySelectorAll('.back');
	const cardFronts = document.querySelectorAll('.front');

	//разворот карт через 5 сек
	setTimeout(() => {
		for (const cardBack of cardBacks) {
			cardBack.classList.toggle('rotate-back');
		}
		for (const cardFront of cardFronts) {
			cardFront.classList.toggle('rotate');
		}
		TaimerGo();
	}, 1000);

	// таймер игры
	function TaimerGo() {
		gameState.timeGame.sec++;
		let intervalId = setInterval(() => {
			gameState.timeGame.min = Number(gameState.timeGame.min);
			if (gameState.timeGame.sec === 60) {
				gameState.timeGame.sec = 0;
				gameState.timeGame.min++;
			}
			if (gameState.timeGame.sec < 10) {
				gameState.timeGame.sec = '0' + gameState.timeGame.sec;
			}
			if (gameState.timeGame.min < 10) {
				gameState.timeGame.min = '0' + gameState.timeGame.min;
			}
			document.querySelector('.volume__min').innerHTML = gameState.timeGame.min;
			document.querySelector('.volume__sec').innerHTML = gameState.timeGame.sec;
			gameState.timeGame.sec++;
		}, 1000);
		// не получается остановить таймер
		if (gameState.state === 'win' || gameState.state === 'loss') {
			console.log('стоп');
			clearInterval(intervalId);
		}
	}

	//поворот карты по клику
	let firstOpenCard = { open: false };
	for (const cardItem of cardItems) {
		cardItem.addEventListener('click', () => {
			firstOpenCard.open = !firstOpenCard.open;
			if (firstOpenCard.open) {
				firstOpenCard.card = Number(cardItem.dataset.card);
				firstOpenCard.index = Number(cardItem.dataset.index);
			} else {
				if (firstOpenCard.index === Number(cardItem.dataset.index)) {
					alert('Только не по этой же карте!');
					return;
				} else {
					if (firstOpenCard.card === Number(cardItem.dataset.card)) {
						// победа
						gameState.state = 'win';
						giveResultTime({
							time: `${gameState.timeGame.min}.${gameState.timeGame.sec}`,
						});
						renderModules({ state: gameState.state });
						modulesEl.classList.remove('display-none');
					} else {
						// проигрыш
						gameState.state = 'loss';
						giveResultTime({
							time: `${gameState.timeGame.min}.${gameState.timeGame.sec}`,
						});
						renderModules({ state: gameState.state });
						modulesEl.classList.remove('display-none');
					}
				}
			}

			//механизм переворота карты
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
