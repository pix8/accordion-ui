/* eslint-disable */
'use strict';

const 	path 							= require('path'),
		config 							= require('./build/config');

const 	webpack 						= require('webpack'),
		merge 							= require('webpack-merge'),
		baseWebpackConfig				= require('./webpack.base.config');

const	DuplicatePackageCheckerPlugin 	= require("duplicate-package-checker-webpack-plugin");


module.exports = merge(baseWebpackConfig, {
	mode: 'production',

	devtool: config.prod.sourceMap ? '#source-map' : false,
	
	output: {
		path: path.resolve(__dirname, '../dist')
	},
	
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': config.prod.env
		}),

		new DuplicatePackageCheckerPlugin(),

		/******************************************************
		* Obsfucate
		*/
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: config.prod.sourceMap,
			compress: {
				warnings: false
			}
		}),

		new webpack.optimize.OccurrenceOrderPlugin()
	]
})
