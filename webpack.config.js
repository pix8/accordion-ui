/* eslint-disable */
'use strict';

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const 	path 						= require('path'),
		config 						= require('./build/config');

const 	webpack 					= require('webpack');

const	friendlyErrorsPlugin 		= require('friendly-errors-webpack-plugin'),
		VueLoaderPlugin				= require('vue-loader/lib/plugin')


module.exports = {
	mode: 'development',

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

	output: {
		filename: '[name].js'
	},

	resolve: {
		extensions: ['*', '.js', '.jsx', '.vue', '.json'],
				
		alias: {
			// 'src': path.resolve(__dirname, '/src/'),
			// 'components': path.resolve(__dirname, '/src/components'),
			'vue$': 'vue/dist/vue.common.js' 		//vue is forked into two builds with and without the runtime template compiler; for dev we need the template compiler so this repoints an alias of `vue` to that build. 
		}
	},

	// resolveLoader: {
	// 	modules: [path.join(__dirname, '/node_modules')],
	// 	extensions: ['.js', '.jsx','.json'],
	//	alias: {
	//		'vue-loader': require.resolve('vue-loader/lib')
	//	}
	// },

	module: {
		rules: [
			// Pug (HTML preprocessor)
			// AND `<template lang="pug">` blocks in `.vue` files
			{
				test: /\.pug?$/,
				oneOf: [
					// this applies to <template lang="pug"> in Vue components
					{
						resourceQuery: /^\?vue/,
						use: ['pug-plain-loader']
					},
					// this applies to pug imports inside JavaScript
					{
						use: ['raw-loader', 'pug-plain-loader']
					}
				]
			},

			// Javascript + React
			// AND `<script>` blocks in `.vue` files
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: (file) => (
					/node_modules/.test(file) &&
					!/\.vue\.js/.test(file)
				)
			},

			// Vue
			{
				test: /\.vue?$/,
				use: {
					loader: 'vue-loader',
					options: {
						loaders: {
							// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
							// the "scss" and "sass" values for the lang attribute to the right configs here.
							// other preprocessors should work out of the box, no loader config like this nessessary.
							// DEVNOTE: I don't use the indentedSyntax so no big whoop.
							'scss': 'vue-style-loader!css-loader?importLoaders=2!postcss-loader!sass-loader?sourceMap',
							'sass': 'vue-style-loader!css-loader?importLoaders=2!postcss-loader!sass-loader?sourceMap'
						}
					}
				},
				exclude: /(node_modules|bower_components)/
			},

			// CSS & SASS
			// AND `<style>` blocks in `.vue` files(should be overridden by the vue-loader options)
			{
				test: /\.s?css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: () => [
								require('autoprefixer')('last 2 version'),
								//require('stylelint'),
								require('cssnano')()
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							//indentedSyntax: true,
							sourceMap: true
						}
					},
				],
				exclude:  /(node_modules|bower_components)/
			},

			// JSON
			{
				test: /\.json$/,
				use: {
					loader: 'json-loader'
				}
			},

			// GFX
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: '../src/img/[name].[hash:7].[ext]'
					}
				}
			},

			// Webfonts
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: {
					loader: 'url-loader',
					query: {
						limit: 10000,
						name: '../src/font/[name].[hash:7].[ext]'
					}
				}
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': config.dev.env
		}),

		// https://github.com/glenjamin/webpack-hot-middleware#installation--usage
		new webpack.optimize.OccurrenceOrderPlugin(),	
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

		new friendlyErrorsPlugin(),

		new VueLoaderPlugin()
	]
}
