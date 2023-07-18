const { it, expect, describe } = require('@jest/globals');
const { newGame } = require('./src/index');

describe('newGame()', () => {
	it('should be twice as long', () => {
		// подготовка
		const line = 5;
		const expected = 10;
		// действие
		const result = newGame({ line });
		// сверка
		expect(result).toHaveLength(expected);
	});
});
