module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,json,xml,webmanifest,svg,ico,webp,png,js,css}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};