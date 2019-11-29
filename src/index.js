'use strict';

import colors from './colors'
export default cute

const indent = 3  // number of spaces

const sizeof = val =>
	typeof val == 'object' ? Array.isArray(val) ?
		val.length : Object.keys(val).length : 0

function sortKeys(a, b) {  // needs to be binded to an object
	return sizeof(this[a]) - sizeof(this[b])
}

function forEachOf(container, callback) {
	if (!container) return
	if (Array.isArray(container)) {
		let firstElement = true
		for (const element of container)
			callback(colors.property('-' + ' '.repeat(indent-1)), element, true)
	}
	else {
		const keys = Object.keys(container).sort(sortKeys.bind(container))
		for (const key of keys)
			callback(colors.property(key) + ': ', container[key], false)
	}
}

function print(mode, data, depth=0) {
	colors.mode = mode
	let result = ''
	let line = (msg, isObject) => ' '.repeat(indent * depth) + msg + (isObject ? '' : '\n')

	forEachOf(data, (intro, value, inArray) => {
		let isObject = false

		switch (typeof value) {
			case 'string':
				intro += colors.string('"'+value+'"')
			break

			case 'number':
				intro += colors.number(value)
			break

			case 'boolean':
			case 'undefined':
				intro += colors.keyword(value)
			break

			case 'function':
				let content = value.toString()
				if (content.includes('\n'))
					content = '[Function]'
				else if (content.length > 32)
					content = content.slice(0, 32) + '...'
				intro += colors.function(content)
			break

			case 'object':
				if (value instanceof Date)
					intro += colors.date(value.toLocaleString())
				else if (!value)
					intro += colors.keyword('null')
				else {
					isObject = true;
					let subContent = print(mode, value, depth+1);
					if (inArray)
						intro += subContent.trimLeft();
					else
						intro += '\n' + subContent;
				}
			break

			default: intro += value
		}
		result += line(intro, isObject)
	})

	return result
}

const cute = {
	log:   msg => console.log   (print('console', msg)),
	warn:  msg => console.warn  (print('console', msg)),
	error: msg => console.error (print('console', msg)),
	html:  msg => print('html', msg),
}
