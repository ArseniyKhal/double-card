// import shirtСard from '../img/card.svg';
import { cardDeck } from '../index.js';

// здесь рендер игрового поля
const appEl = document.getElementById('app');

export const renderApp = () => {
	const cardHtml = cardDeck
		.map((card, index) => {
			//вычисляем масть
			let suit = '';
			if (card >= 0 && card < 9) {
				suit = 'spades';
			} else if (card >= 9 && card < 18) {
				suit = 'clubs';
			} else if (card >= 18 && card < 27) {
				suit = 'hearts';
			} else {
				suit = 'diamonds';
			}
			//вычисляем цвет
			let redCard = false;
			if (suit === 'hearts' || suit === 'diamonds') {
				redCard = true;
			}

			//вычисляем ранг карты
			let rankCart = '';
			if (card === 0 || card === 9 || card === 18 || card === 27) {
				rankCart = 'A';
			} else if (card === 1 || card === 10 || card === 19 || card === 28) {
				rankCart = 'K';
			} else if (card === 2 || card === 11 || card === 20 || card === 29) {
				rankCart = 'Q';
			} else if (card === 3 || card === 12 || card === 21 || card === 30) {
				rankCart = 'J';
			} else if (card === 4 || card === 13 || card === 22 || card === 31) {
				rankCart = '10';
			} else if (card === 5 || card === 14 || card === 23 || card === 32) {
				rankCart = '9';
			} else if (card === 6 || card === 15 || card === 24 || card === 33) {
				rankCart = '8';
			} else if (card === 7 || card === 16 || card === 25 || card === 34) {
				rankCart = '7';
			} else {
				rankCart = '6';
			}

			return `
			<div class="card-field__card card" data-index="${index}" data-card="${card}">
				<div class="card__back back rotate-back" data-index="${index}">
					<div class="back__body card__body">
						<img src="../img/card.svg" alt="card">
					</div>
				</div>

				<div class="card__front front"data-index="${index}">
					<div class="front__body card__body">
						<div class="front__face">
							<h2 class="front__title" ${
								redCard ? 'style="color: #ff4545"' : ''
							}>${rankCart}</h2>
							<img src="../img/${suit}.svg" alt="card">
						</div>
						<img class="front__picture" src="../img/${suit}.svg" alt="card">
						<div class="front__face flipped-over">
							<h2 class="front__title" ${
								redCard ? 'style="color: #ff4545"' : ''
							}>${rankCart}</h2>
							<img src="../img/${suit}.svg" alt="card">
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
};
