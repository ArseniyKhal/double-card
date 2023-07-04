import { cardDeck, gameState, initNewGame } from './index.js';

// здесь рендер игрового поля
const appEl = document.getElementById('app');

export const renderApp = () => {
	const cardHtml = cardDeck
		.map((card, index) => {
			return `
		<div class="card-field__card">
			<img src="./img/card.svg" alt="card" />
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
};
