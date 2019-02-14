/* eslint-disable */
'use strict';

const	VueLoaderPlugin				= require('vue-loader/lib/plugin')


module.exports = {

	resolve: {
		extensions: ['.vue'],
				
		alias: {
			// 'src': path.resolve(__dirname, '/src/'),
			// 'components': path.resolve(__dirname, '/src/components'),
			'vue$': 'vue/dist/vue.common.js' 		//vue is forked into two builds with and without the runtime template compiler; for dev we need the template compiler so this repoints an alias of `vue` to that build. 
		}
	},

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
			}
		]
	},

	plugins: [
		new VueLoaderPlugin()
	]
}
