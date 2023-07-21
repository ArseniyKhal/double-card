module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
	plugins: ['stylelint-prettier'],
	rules: {
		'prettier/prettier': true,
		'font-family-no-missing-generic-family-keyword': [
			true,
			{ ignoreFontFamilies: ['Stratos'] },
		],
		'selector-class-pattern': null,
	},
};
