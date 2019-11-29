/**
* Wrapper around chalk to display colors on the browser or the console.
*/
export default colors

// not in node-like envirnoment
if (typeof require == 'undefined') {
	var chalk = new Proxy({}, {
		get() { return i => i }  // identity function
	})
}
else var chalk = require('chalk')


const span = (color, str) => `<span class="cute-dump-${color}">${str}</span>`

let mode = 'console'

const colors = {
	set mode(val) { mode = val },

	function (str) { return colors[mode].function(str) },
	date     (str) { return colors[mode].date(str) },
	keyword  (str) { return colors[mode].keyword(str) },
	string   (str) { return colors[mode].string(str) },
	number   (str) { return colors[mode].number(str) },
	property (str) { return colors[mode].property(str) },

	console: {
		function: chalk.red,
		date: chalk.green,
		keyword: chalk.blue,
		string: chalk.yellow,
		number: chalk.magenta,
		property: chalk.white,
	},

	html: {
		function: span.bind(null, 'function'),
		date: span.bind(null, 'date'),
		keyword: span.bind(null, 'keyword'),
		string: span.bind(null, 'string'),
		number: span.bind(null, 'number'),
		property: span.bind(null, 'property'),
	},
}

