import './css/style.scss';
import { renderApp } from './js/renderApp.js';
import { renderModules, modulesEl } from './js/components/module-component.js';

export let gameState = {
	difficultyLevel: 0,
	fieldSize: 6,
	state: 'start',
	timeGame: {
		sec: 0,
		min: 0,
	},
};
export let cardDeck = [];
let seconds = gameState.timeGame.sec;
let minutes = gameState.timeGame.min;

if (gameState.difficultyLevel === 0) {
	renderModules({ state: gameState.state });
} else {
	renderApp();
}

// renderModules();
// initNewGame();
// renderApp();

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
	seconds = 0;
	minutes = 0;

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
	let loss = false;

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
		seconds++;
		let intervalId = setInterval(() => {
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
			document.querySelector('.volume__min').innerHTML = minutes;
			document.querySelector('.volume__sec').innerHTML = seconds;
			seconds++;
		}, 1000);
		// не получается остановить таймер
		if (loss === true) {
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
						gameState.state = 'win';
						renderModules({ state: gameState.state });
						modulesEl.classList.remove('display-none');
						console.log(
							`Вы выиграли! Затраченное время: ${minutes}.${seconds}`
						);
					} else {
						loss = true;
						gameState.state = 'loss';
						renderModules({ state: gameState.state });
						modulesEl.classList.remove('display-none');
						// console.log(`Вы проиграли! Затраченное время: ${minutes}.${seconds}`	);
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
