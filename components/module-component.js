import { gameState, setDifficultyLevel } from "../index.js";
import { renderApp } from "../renderApp.js";

// здесь рендер всплывающего окна (выбор сложности/результат игры)
export const modulesEl = document.getElementById("modules");

export function renderModules() {
	const sectionModulHtml =
		`<section class="modul">
			<div class="modul__container">
				<div class="modul__body difficulty-level">
					<div class="modul__content">
						<h2 class="difficulty-level__title">Выбери <br> сложность</h2>
						<div class="difficulty-level__row">
							<div class="difficulty-level__element" data-level="1">1</div>
							<div class="difficulty-level__element" data-level="2">2</div>
							<div class="difficulty-level__element" data-level="3">3</div>
						</div>
					</div>
					<div class="modul__button">
						<button class="difficulty-level__button button" id="btnStart">Старт</button>
					</div>
				</div>
			</div>
		</section>
	`;

	modulesEl.innerHTML = sectionModulHtml;

	// выбор сложности игры
	const btnStartEl = document.getElementById("btnStart");
	const buttonsDifficultyLevel = document.querySelectorAll(".difficulty-level__element");
	for (const buttonDifLevel of buttonsDifficultyLevel) {

		buttonDifLevel.classList.remove("select-border");

		//кнопка выбора сложности игры
		buttonDifLevel.addEventListener('click', () => {
			buttonDifLevel.classList.add("select-border");
			setDifficultyLevel(buttonDifLevel.dataset.level);

			//кнопка СТАРТ
			btnStartEl.addEventListener('click', () => {
				modulesEl.classList.add("display-none");
				buttonDifLevel.classList.remove("select-border");
				renderApp();
				//тут будет запуск таймера игры.
			})
		});
	}
}


