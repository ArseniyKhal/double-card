import { newGame, setDifficultyLevel } from '../../index.js';

// здесь рендер всплывающего окна (выбор сложности/результат игры)
export const modulesEl = document.getElementById('modules');

export function renderModules({ state }) {
	let modulContent = ``;
	if (state === 'win' || state === 'loss') {
		modulContent = `
		<div class="result">
			<img class="result__picture" src="./static/${
				state === 'win' ? 'celebration' : 'daed'
			}.svg" alt="pic">
			<h2 class="result__title">${
				state === 'win' ? 'Вы выиграли!' : 'Вы проиграли!'
			}</h2>
			<p class="result__text">Затраченное время:</p>
			<div class="result__timer timer__volume volume">
				<span class="volume__min" id="volume-minut">00</span>
				<span class="volume__sec" id="volume-sec">00</span>
			</div>
		</div>`;
	} else {
		modulContent = `
		<div class="difficulty-level">
			<h2 class="difficulty-level__title">Выбери <br> сложность</h2>
			<div class="difficulty-level__row">
				<div class="difficulty-level__element" data-level="1">1</div>
				<div class="difficulty-level__element" data-level="2">2</div>
				<div class="difficulty-level__element" data-level="3">3</div>
			</div>
		</div>`;
	}
	const sectionModulHtml = `
		<section class="modul">
			<div class="modul__container">
				<div class="modul__body">
					<div class="modul__content">
						${modulContent}
					</div>
					<div class="modul__button">
						<button class="difficulty-level__button button" id="btnStart">${
							state === 'start' ? 'старт' : 'Играть снова'
						}</button>
					</div>
				</div>
			</div>
		</section>`;

	modulesEl.innerHTML = sectionModulHtml;

	// выбор сложности игры
	const btnStartEl = document.getElementById('btnStart');
	const buttonsDifficultyLevel = document.querySelectorAll(
		'.difficulty-level__element'
	);
	for (const buttonDifLevel of buttonsDifficultyLevel) {
		//кнопка выбора сложности игры
		buttonDifLevel.addEventListener('click', () => {
			for (const btnDifLv of buttonsDifficultyLevel) {
				btnDifLv.classList.remove('select-border');
			}
			buttonDifLevel.classList.add('select-border');
			setDifficultyLevel(Number(buttonDifLevel.dataset.level));

			//кнопка СТАРТ
			btnStartEl.addEventListener('click', () => {
				modulesEl.classList.add('display-none');
				buttonDifLevel.classList.remove('select-border');
				newGame();
			});
		});
	}
}
