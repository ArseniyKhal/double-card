"use stric";
const { it, expect, describe } = require("@jest/globals");
const { newGame } = require("./src/js/newGame");

describe("newGame()", () => {
	it("should be twice as long", () => {
		// подготовка
		const difLv = 20;
		const expected = 20;
		// действие
		const arr = newGame({ difLv });
		// сверка
		expect(arr).toHaveLength(expected);
	});

	it("should check the two generated arrays", () => {
		// подготовка
		const difLv = 20;
		// действие
		const arr1 = newGame({ difLv });
		const arr2 = newGame({ difLv });
		// сверка
		expect(arr1).not.toBe(arr2);
	});

	it("should be the same length of two different arrays", () => {
		// подготовка
		const difLv = 20;
		// действие
		const arr1 = newGame({ difLv });
		const arr2 = newGame({ difLv });
		// сверка
		expect(arr1.length).toBe(arr2.length);
	});

	it("must not contain the number 36", () => {
		// подготовка
		const difLv = 2000;
		const expected = 36;
		// действие
		const arr = newGame({ difLv });

		// сверка
		expect(arr).not.toBe(expected);
	});
});
