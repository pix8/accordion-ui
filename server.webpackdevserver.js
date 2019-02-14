'use strict';


const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const	webpack 				= require('webpack'),
		webpackConfig			= require('./webpack.config'),
		webpackHotMiddleware 	= require('webpack-hot-middleware');

const	webpackDevServer 		= require('webpack-dev-server');


var compiler = webpack(webpackConfig);

//DEVNOTE: webpack dev server is baked with webpack dev middleware out the box
const server = new webpackDevServer(compiler, {
	contentBase: 'dist',
	// hot: true,
	// filename: 'app.bundle.js',
	publicPath: webpackConfig.output.publicPath,
	stats: {
	 	colors: true
	},
	before: (server) => {
		server.use(
			webpackHotMiddleware(compiler, {
				log: console.log,
				//path: '/__webpack_hmr',
				//heartbeat: 10 * 1000
			})
		);
	}
});

server.listen(3001, 'localhost', () => {
	console.log("Express server started and listening on port 3001.");
});
