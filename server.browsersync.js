'use strict';


const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const	webpack 				= require('webpack'),
		webpackConfig			= require('./webpack.config'),
		webpackDevMiddleware 	= require('webpack-dev-middleware'),
		webpackHotMiddleware 	= require('webpack-hot-middleware');

const	browserSync 			= require('browser-sync').create();


var compiler = webpack(webpackConfig);

browserSync.init({
	server: {
		//we can have multiple base directories(so we don't have to needlessly copy and pass static assets around)
		baseDir: [
			'src',
			'dist'
		],

		routes: {},
		watch: false
	},

	middleware: [
		webpackDevMiddleware(compiler, {
			//hot: true,
			//filename: 'app.bundle.js',
			publicPath: webpackConfig.output.publicPath,
			stats: {
				colors: true
			},
			//historyApiFallback: true,
			quiet: true
		}),

		//webpackHotMiddleware(compiler)
		//webpackHotMiddleware(compiler, {log: false})
		webpackHotMiddleware(compiler, {
			log: console.log,
			//path: '/__webpack_hmr',
			//heartbeat: 10 * 1000
		})
	]
});
