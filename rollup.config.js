
export default nodeBuild
// export default browserBuild


const nodeBuild = {
	input: 'src/index.js',
	output: {
		file: 'node/index.js',
		format: 'cjs'
	}
}

const browserBuild = {
	input: 'src/index.js',
	output: {
		file: 'browser/cute-dump.js',
		name: 'cute',
		format: 'iife'
	}
}
