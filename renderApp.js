import { gameState } from "./index.js";

const headerHtml =
	`<header class="header">
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
	`;

const sectionModulHtml =
	`<section class="modal">
	<div class="modal__container">
		<div class="modal__body difficulty-level">
			<div class="modal__content">
				<h2 class="difficulty-level__title">Выбери <br> сложность</h2>
				<div class="difficulty-level__row">
					<div class="difficulty-level__element" data-level="1">1</div>
					<div class="difficulty-level__element" data-level="2">2</div>
					<div class="difficulty-level__element" data-level="3">3</div>
				</div>
			</div>
			<div class="modal__button">
				<button class="difficulty-level__button button">Старт</button>
			</div>
		</div>
	</div>
</section>
	`;

const sectionCardFieldHtml =
	`<section class="card-field">
	<div class="container">
		<div class="card-field__body">
			поле с картами
		</div>
	</div>
</section>
	`;





export const renderApp = () => {
	const appEl = document.getElementById("app");
	if (gameState.difficultyLevel === 0) {
		const appHtml =
			`
			${sectionModulHtml}
			`
		appEl.innerHTML = appHtml;

	} else {

		const appHtml =
			`
		${headerHtml}
		${sectionModulHtml}
		${sectionCardFieldHtml}
		`

		appEl.innerHTML = appHtml;
	}

}





