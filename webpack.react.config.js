/* eslint-disable */
'use strict';


module.exports = {

	resolve: {
		extensions: ['.jsx']
	},

	module: {
		rules: [
			// Javascript + React
			// AND `<script>` blocks in `.vue` files
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: (file) => (
					/node_modules/.test(file)
				)
			},

			// Styled components
			// {
			// 	test: /\.style.js$/,
			// 	use: [
			// 		{
			// 			loader: 'style-loader'
			// 		},
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				importLoaders: 2
			// 			}
			// 		},
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				parser: 'postcss-js'
			// 			}
			// 		},
			// 		{
			// 			loader: 'babel-loader'
			// 		}
			// 	]
			// }
		]
	}
}
