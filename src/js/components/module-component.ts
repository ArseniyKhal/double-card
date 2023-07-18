import { gameState, newGame, setModuleToStart } from '../../index';

// здесь рендер всплывающего окна (выбор сложности/результат игры)
export const modulesEl = <HTMLElement>document.getElementById('modules');
let difLv: number = 0;

export function renderModules({
	state,
	time,
}: {
	state: string;
	time: string;
}) {
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
			${time}
			</div>
		</div>`;
	} else {
		modulContent = `
		<div class="difficulty-level">
			<h2 class="difficulty-level__title">Выбери <br> сложность</h2>
			<div class="difficulty-level__row">
				<div class="difficulty-level__element" data-level="6">1</div>
				<div class="difficulty-level__element" data-level="12">2</div>
				<div class="difficulty-level__element" data-level="18">3</div>
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
							state === 'start' ? 'Старт' : 'Играть снова'
						}</button>
					</div>
				</div>
			</div>
		</section>`;

	modulesEl.innerHTML = sectionModulHtml;

	// выбор сложности игры
	const btnStartEl = <HTMLElement>document.getElementById('btnStart');
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
			if (buttonDifLevel instanceof HTMLElement) {
				difLv = Number(buttonDifLevel.dataset.level);
			}
			initBtnStart();
		});
	}
	if (difLv > 0 && difLv <= 18) {
		initBtnStart();
	}

	//кнопка Старт/Начать заново
	function initBtnStart() {
		btnStartEl.addEventListener('click', () => {
			for (const btnDifLv of buttonsDifficultyLevel) {
				btnDifLv.classList.remove('select-border');
			}
			if (gameState.state === 'start') {
				modulesEl.classList.add('display-none');
				newGame({ difLv });
			} else {
				setModuleToStart();
				renderModules({ state: gameState.state, time });
			}
		});
	}
}
