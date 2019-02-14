'use strict';


const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const	webpack 				= require('webpack'),
		webpackConfig			= require('./webpack.config'),
		webpackDevMiddleware 	= require('webpack-dev-middleware'),
		webpackHotMiddleware 	= require('webpack-hot-middleware');

const	express 				= require('express');


var compiler = webpack(webpackConfig);

const server = express();

server.use(
	webpackDevMiddleware(compiler, {
		//hot: true,
		//filename: 'app.bundle.js',
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		},
		//historyApiFallback: true,
		quiet: true
	})
);

server.use(
	webpackHotMiddleware(compiler, {
		log: console.log,
		//path: '/__webpack_hmr',
		//heartbeat: 10 * 1000
	})
);

server.use(express.static('dist'));

server.listen(3002, 'localhost', () => {
	console.log("Express server started and listening on port 3002.");
});
