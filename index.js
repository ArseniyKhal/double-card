import { renderApp } from "./renderApp.js";

export let gameState = {
	difficultyLevel: 0,
	timeGame: 0,
};

renderApp();

// выбор сложности игры
const buttonsDifficultyLevel = document.querySelectorAll(".difficulty-level__element");
for (const buttonDifLevel of buttonsDifficultyLevel) {
	buttonDifLevel.addEventListener('click', () => {
		gameState.difficultyLevel = buttonDifLevel.dataset.level;
		renderApp();
	});
}

// начало новой игры
// const buttonNewGame = document.getElementById("newGame");
// console.log(buttonNewGame);
// buttonNewGame.addEventListener('click', () => {
// 	console.log("2");
	// gameState.difficultyLevel = 0;
	// renderApp();
// })

