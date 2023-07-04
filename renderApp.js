import { initNewGame } from './index.js';

// здесь рендер игрового поля
const appEl = document.getElementById('app');

export const renderApp = () => {
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
						поле с картами
					</div>
				</div>
			</section>
		`;

	appEl.innerHTML = appHtml;
	initNewGame();
};
