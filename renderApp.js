import { cardDeck, gameState, initNewGame } from './index.js';

// здесь рендер игрового поля
const appEl = document.getElementById('app');

export const renderApp = () => {
	const cardHtml = cardDeck
		.map((card, index) => {
			return `
			<div class="card-field__card card" data-index="${index}">
				<div class="card__back back rotate" data-index="${index}">
					<div class="back__body card__body">
						<img src="./img/card.svg" alt="card">
					</div>
				</div>

				<div class="card__front front"data-index="${index}">
					<div class="front__body card__body">
						<div class="front__face">
							<h2 class="front__title">А</h2>
							<img src="./img/spades.svg" alt="card">
						</div>
						<img class="front__picture" src="./img/spades.svg" alt="card">
						<div class="front__face flipped-over">
							<h2 class="front__title">А</h2>
							<img src="./img/spades.svg" alt="card">
						</div>
					</div>
				</div>
				
		</div>`;
		})
		.join('');

	const appHtml = `<header class="header">
				<div class="container">
					<div class="header__body">
						<div class="header__timer timer">
							<div class="timer__text">
								<div class="timer__min">min</div>
								<div class="timer__sek">sek</div>
							</div>
							<div class="timer__volume">00.00</div>
						</div>
						<button class="header__button button" id="newGame">Начать заново</button>
					</div>
				</div>
			</header>

			<section class="card-field">
				<div class="container">
					<div class="card-field__body">
						${cardHtml}
					</div>
				</div>
			</section>
		`;

	appEl.innerHTML = appHtml;
	// раскомментировать после отладки
	// initNewGame();

	//поворот карты
	const cardItems = document.querySelectorAll('.card');
	for (const cardItem of cardItems) {
		cardItem.addEventListener('click', () => {
			const index = cardItem.dataset.index;
			const cardBacks = document.querySelectorAll('.back');
			for (const cardBack of cardBacks) {
				if (cardBack.dataset.index == index) {
					cardBack.classList.toggle('rotate');
				}
			}
			const cardFronts = document.querySelectorAll('.front');
			for (const cardFront of cardFronts) {
				if (cardFront.dataset.index == index) {
					cardFront.classList.toggle('rotate');
				}
			}
		});
	}
};
