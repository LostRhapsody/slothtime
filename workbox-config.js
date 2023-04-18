module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,json,js,svg,ico,png,css}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};