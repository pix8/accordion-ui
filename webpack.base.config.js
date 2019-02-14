/* eslint-disable */
'use strict';

const 	ENV = process.env.NODE_ENV;

const 	path 						= require('path'),
		config 						= require('./build/config');

const	merge 						= require('webpack-merge'),
		reactWebpackConfig 			= require('./webpack.react.config'),
		vueWebpackConfig 			= require('./webpack.vue.config');


module.exports = merge(reactWebpackConfig, vueWebpackConfig, {
	entry: {
		'scripts/app.bundle': path.resolve(__dirname, './src/js/index')
	},

	output: {
		filename: '[name].js'
	},

	resolve: {
		extensions: ['*', '.js', '.json']
	},

	// resolveLoader: {
	// 	modules: [path.join(__dirname, '/node_modules')],
	// 	extensions: ['.js', '.jsx','.json']
	// },

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
	}
})
