/* eslint-disable */
'use strict';

import paths from 'rollup-plugin-includepaths'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'							//https://github.com/rollup/rollup-plugin-babel
import postcss from 'rollup-plugin-postcss'						//https://github.com/egoist/rollup-plugin-postcss //DEVNOTE: postcss can use preprocessors i.e. node-sass
import url from 'rollup-plugin-url' 							//https://github.com/rollup/rollup-plugin-url
// import { uglify } from "rollup-plugin-uglify"

import pkg from './package.json'


const 	ENV = process.env.NODE_ENV;

export default {
	input: 'src/index.js',
	
	output: [
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es'
		}
	],

	watch:{
		chokidar: {
			paths: 'src/**'
		},
		exclude: 'node_modules/**'
	},

	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**',
			runtimeHelpers: false
		}),
		postcss(),
		url({
			limit: 10 * 1024//, 	//convert(base64/data-uri) and inline files that are  < 10k, copy files > 10k; else copied to destination folder and hashed filename generated + inserted
		}),
		// uglify(),

		paths({
			paths: ['src'],
			external: [],
			extensions: ['.js', '.jsx']
		})
	]
}
