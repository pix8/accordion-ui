const path = require('path');


module.exports = {
	module: {
		rules: [
			//SASS
			{
				test: /\.s?css$/,
				loader: "style-loader!css-loader?url=false!sass-loader?sourceMap",
				include: path.resolve(__dirname, '../')
			},

			//GFX
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			},

			//SVG
			{
			  test: /\.svg$/,
			  use: [
			    {
			      loader: "babel-loader"
			    },
			    {
			      loader: "react-svg-loader",
			      options: {
			        jsx: true // true outputs JSX tags
			      }
			    }
			  ]
			}
		]
	}
}
