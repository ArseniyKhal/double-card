import './css/style.scss';
import { renderApp } from './js/renderApp.js';
import { renderModules, modulesEl } from './js/components/module-component.js';

export let gameState = {
	difficultyLevel: 0,
	state: 'start',
	timeGame: '00.00',
	openCard: 0,
};
export let cardDeck = [];

if (gameState.difficultyLevel === 0) {
	renderModules({ state: gameState.state });
} else {
	renderApp();
}

export const setModuleToStart = () => (gameState.state = 'start');

// установка сложности игры
export const setDifficultyLevel = (difLv) =>
	(gameState.difficultyLevel = difLv);

//начинаем новую игру
export const newGame = () => {
	cardDeck.length = 0;
	gameState.openCard = 0;

	//создаем колоду дублей и перемешиваем
	for (let i = 0; i < gameState.difficultyLevel; i = i + 2) {
		cardDeck[i] = Math.floor(Math.random() * 35);
		cardDeck[i + 1] = cardDeck[i];
	}
	cardDeck.sort(() => Math.random() - 0.5);

	renderApp();
	initNewGame();
};

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
		initTurnCard();
		TaimerGo();
	}, 2000);

	// таймер игры
	function TaimerGo() {
		let seconds = 1;
		let minutes = 0;

		const intervalId = setInterval(() => {
			if (gameState.state === 'win' || gameState.state === 'loss') {
				clearInterval(intervalId);
				return;
			}
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
			gameState.timeGame = `${minutes}.${seconds}`;
			document.querySelector('.volume').innerHTML = gameState.timeGame;
			seconds++;
		}, 1000);
	}

	//поворот карты по клику
	function initTurnCard() {
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
							gameState.openCard = gameState.openCard + 2;
							if (gameState.openCard === cardDeck.length) {
								// победа
								gameState.state = 'win';
								renderModules({
									state: gameState.state,
									time: gameState.timeGame,
								});
								modulesEl.classList.remove('display-none');
							}
						} else {
							// проигрыш
							gameState.state = 'loss';
							renderModules({
								state: gameState.state,
								time: gameState.timeGame,
							});
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
}
