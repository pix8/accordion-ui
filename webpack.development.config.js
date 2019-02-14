/* eslint-disable */
'use strict';

const	path 						= require('path'),
		config 						= require('./build/config');

const	webpack						= require('webpack'),
		merge 						= require('webpack-merge'),
		baseWebpackConfig 			= require('./webpack.base.config');

const	friendlyErrorsPlugin 		= require('friendly-errors-webpack-plugin');


// Add hot-reload related code to entry chunks
// DEVNOTE: this is basically setting up the HMR hooks for multiple entries
// Object.keys(baseWebpackConfig.entry).forEach( (name, i) => {
// 	baseWebpackConfig.entry[name] = ['./build/hmr-client'].concat(baseWebpackConfig.entry[name]);
// })

module.exports = merge(baseWebpackConfig, {
	mode: 'development',

	// DEVNOTE: eval-source-map is faster for development
	devtool: '#eval-source-map',

	entry: {
		//browsersync
		'scripts/app.bundle': ['webpack-hot-middleware/client?path=/__webpack_hmr&reload=true', path.resolve(__dirname, './src/js/index')]

		//webpackdev(standard)
		//'scripts/app.bundle': ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:3003/', path.resolve(__dirname, './src/js/index')]

		//DEVNOTE:
		//'webpack-hot-middleware/client' HMR server for/from webpack-hot-middleware
		//'webpack/hot/dev-server' is HMR server from webpackdevserver & not needed with webpack-hot-middleware
		//'webpack-dev-server/client' is the HMR client(equivalent to 'webpack-hot-middleware/client')
		//would use 'webpack/hot/dev-server', 'webpack-hot-middleware/client, combo turning the 'hot: true' option; if webpackdevserver with HMR via middleware

		//hmr options &noInfo=true&reload=true
	},
	
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': config.dev.env
		}),

		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.optimize.OccurrenceOrderPlugin(),	
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

		new friendlyErrorsPlugin()
	]
})
