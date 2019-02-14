'use strict';


const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const	webpack 				= require('webpack'),
		webpackConfig			= require('./webpack.config');

const	webpackDevServer 		= require('webpack-dev-server');


var compiler = webpack(webpackConfig);

const server = new webpackDevServer(compiler, {
	contentBase: 'dist',
	hot: true,
	filename: 'app.bundle.js',
	publicPath: webpackConfig.output.publicPath,
	stats: {
		colors: true
	}
});

server.listen(3001, 'localhost', () => {
	console.log("Express server started and listening on port 3003.");
});
