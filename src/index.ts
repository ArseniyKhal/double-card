import './css/style.scss';
import { renderApp } from './js/renderApp';
import { renderModules, modulesEl } from './js/components/module-component';

export let gameState: Employee = {
	difficultyLevel: 0,
	state: 'start',
	timeGame: '00.00',
	openCard: 0,
};
type Employee = {
	difficultyLevel: number;
	state: string;
	timeGame: string;
	openCard: number;
};

export let cardDeck: number[] = [];

if (gameState.difficultyLevel === 0) {
	renderModules({ state: gameState.state, time: gameState.timeGame });
} else {
	renderApp();
}

export const setModuleToStart = () => (gameState.state = 'start');

// установка сложности игры
export const setDifficultyLevel = (difLv: number) =>
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
	const buttonNewGame = <HTMLElement>document.getElementById('newGame');
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
	}, 5000);

	// таймер игры
	function TaimerGo() {
		let seconds: number | string = 1;
		let minutes: number | string = 0;

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
			if (+seconds < 10) {
				seconds = '0' + seconds;
			}
			if (minutes < 10) {
				minutes = '0' + minutes;
			}
			gameState.timeGame = `${minutes}.${seconds}`;
			const volTime = <HTMLElement>document.querySelector('.volume');
			volTime.innerHTML = gameState.timeGame;
			seconds = Number(seconds);
			seconds++;
		}, 1000);
	}

	//поворот карты по клику
	function initTurnCard() {
		let firstOpenCard = {
			open: false,
			card: 0,
			index: 0,
		};
		for (const cardItem of cardItems) {
			cardItem.addEventListener('click', () => {
				firstOpenCard.open = !firstOpenCard.open;
				if (cardItem instanceof HTMLElement) {
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
						if (cardBack instanceof HTMLElement) {
							if (cardBack.dataset.index === index) {
								cardBack.classList.toggle('rotate-back');
							}
						}
					}
					for (const cardFront of cardFronts) {
						if (cardFront instanceof HTMLElement) {
							if (cardFront.dataset.index === index) {
								cardFront.classList.toggle('rotate');
							}
						}
					}
				}
			});
		}
	}
}
