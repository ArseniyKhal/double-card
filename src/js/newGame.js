//создаем массив дублей и перемешиваем

const newGame = ({ difLv }) => {
	let cardDeck = [];
	for (let i = 0; i < difLv; i = i + 2) {
		cardDeck[i] = Math.floor(Math.random() * 35);
		cardDeck[i + 1] = cardDeck[i];
	}
	cardDeck.sort(() => Math.random() - 0.5);
	return cardDeck;
};

module.exports = { newGame };
