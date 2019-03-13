/* eslint-disable */
'use strict';

const 	ENV = process.env.NODE_ENV;

const 	path 						= require('path');


module.exports = {
	entry: {
		'scripts/app.bundle': path.resolve(__dirname, './assets/_js/index')
	},

	output: {
		path: path.resolve(__dirname, './assets'),
		filename: '[name].js'
	},

	resolve: {
		extensions: ['*', '.js']
	},

	module: {
		rules: [
			// Javascript
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: (file) => (
					/node_modules/.test(file)
				)
			}
		]
	}
}
