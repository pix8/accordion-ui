'use strict';


const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const	gulp 					= require('gulp'),
		del 					= require('del'),
		path 					= require('path'),
		rename 					= require('gulp-rename'),
		sourcemaps 				= require('gulp-sourcemaps');

const 	pug 					= require('gulp-pug');

const	sass 					= require('gulp-sass'),
		postcss					= require('gulp-postcss');

const	webpack 				= require('webpack'),
		//webpackConfig			= (ENV === 'development') ? require('./webpack.development.config') : require('./webpack.production.config'),
		//webpackConfig			= require('./webpack.config'),
		webpackConfig			= require('./webpack.development.config'),
		webpackDevMiddleware 	= require('webpack-dev-middleware'),
		webpackHotMiddleware 	= require('webpack-hot-middleware');

const	browserSync 			= require('browser-sync').create();

/*const	jsonServer 				= require('json-server'),
		api 					= jsonServer.create();


api.use(jsonServer.defaults());
api.use(jsonServer.router('api/db.json'));
api.listen(5000, () => {
	console.log('JSON Server/Mock API is running on port 5000')
});*/


/************************************************************************************************************
*	Configuration paths
*************************************************************************************************************/
const CONFIG = {
	src: 'src',
	dist: 'dist',
	port: 4000
}

/************************************************************************************************************
*	Tasks
/************************************************************************************************************
*
*	Local node webserver(browserSync) with Webpack(middleware)
*	https://browsersync.io
*	https://webpack.js.org
* 	https://github.com/webpack/webpack-dev-middleware
**/
gulp.task('webpack:server', () => {

	/**
	* Register browserSync with compiler(webpack) done event;
	* Reload all when bundle is complete or send a broadcast error message instead
 	**/
	//const 	//webpackDashboard 			= require('webpack-dashboard'),
			//webpackDashboardPlugin 		= require('webpack-dashboard/plugin'),
			//webpackBrowserSyncPlugin 	= require('./build/plugin/webpack-browsersync-plugin');

	// webpackConfig.plugins = webpackConfig.plugins.concat(
	// 	new webpackBrowserSyncPlugin(browserSync),
	// );

	var compiler = webpack(webpackConfig);

	//var dashboard = new webpackDashboard();
	//compiler.apply(new webpackDashboardPlugin(dashboard.setData));
	//compiler.apply(new webpackBrowserSyncPlugin(browserSync));

	return browserSync.init({
		server: {
			//we can have multiple base directories(so we don't have to needlessly copy and pass static assets around)
			baseDir: [
				CONFIG.src,
				CONFIG.dist
			],

			routes: {}//,
			//watch: false
		},

		//port: CONFIG.port, //DEVNOTE: if unspecified browsersync will autodetect/assign

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

			webpackHotMiddleware(compiler, {
				log: console.log //false
				//path: '/__webpack_hmr',
				//heartbeat: 10 * 1000
			})
		],

		/*DEVNOTE: source WATCH RULES
		* tooling 																			= NOT WATCHED
		* native resources/file-types(html/css exc. js + all resources delegated to js) 	= browsersync
		* static resources/ile-types 														= gulp
		* javascript +  associated resources/file-types										= webpack(via webpack-dev-middleware)
		**/
		files: [
			CONFIG.dist+'/**/*.+(html|css)'
		]
	});
});

/************************************************************************************************************
*
*	Webpack
*	https://webpack.js.org
*/
gulp.task('webpack:deploy', (_callback) => {

	const PluginError 				= require('plugin-error');

	webpackConfig.plugins = webpackConfig.plugins.concat(
	);

	var compiler = webpack(webpackConfig, (error, stats) => {

		if(error) throw new PluginError("webpack:deploy >> ", error);

		console.log("[webpack]", stats.toString({
			colors: true,
			progress: true
		}) );

		_callback();
	});

	return compiler;
});


/************************************************************************************************************
*
*	run tasks whenever watched files change
*	
*/
gulp.task('watch', () => {
	gulp.watch('pug/**/*.{pug, jade}', {
		cwd: CONFIG.src
	}, ['pug']);

	gulp.watch('sass/**/*.{scss, sass}', {
		cwd: CONFIG.src
	}, ['sass']);
});


/************************************************************************************************************
*
*	deletion task
*	https://www.npmjs.com/package/del
*/
gulp.task('clean', (_callback) => {
	return del([CONFIG.dist]);
});

/************************************************************************************************************
*
*	copy task
*	https://github.com/klaascuvelier/gulp-copy
*/
gulp.task('copy', () => {
	return gulp.src([
		'.htaccess',
		'*.{ico,png,txt}',
		'font/**/*.{ttf,eot,svg,woff,woff2}',
		'favicon/*.{ico,gif,png,xml,json}',
		'img/**/*.{jpg,jpeg,png,webp,gif}',
		'svg/**/*.svg'
		], {
			cwd: CONFIG.src,
			base: CONFIG.src 		//DEVNOTE: base option needed to copy all files recursively
		})
		.pipe(gulp.dest(CONFIG.dist));
});

/************************************************************************************************************
*
*	pug --> html compiler
*	https://github.com/pugjs/gulp-pug
*/
gulp.task('pug', () => {

	const options = {
		pretty: true,
		data: {
			path: (ENV === 'production') ? '/scripts' : ''
		}
	};

	return gulp.src(['pug/**/*.{pug, jade}', '!**/_*.{pug, jade}', '!**/_*/*.{pug, jade}'], {
		cwd: CONFIG.src
	})
		.pipe(pug(options).on('error', (error) => console.log(error.message) ))
		.pipe(rename((path) => {
			path.dirname = path.dirname.replace(/^(pug|jade)/, "")
		}))
		.pipe(gulp.dest(CONFIG.dist));
		//.pipe(browserSync.reload({stream:true}));
		//.pipe(browserSync.stream());
});

/******************************************************v******************************************************
*
*	SASS --> css preprocessor
*	https://github.com/dlmanning/gulp-sass
*/
gulp.task('sass', () => {

	const options = {
		//outputStyle: 'compressed' 				//nested | expanded | compact | compressed
		includePaths: [
			'./node_modules/normalize.css/'
		]
	}

	const packages = [
		require('autoprefixer')('last 2 version'),
		//require('stylelint'), //DEVNOTE: inclusion causing build error
		require('cssnano')
	]

	return gulp.src('sass/**/*.{scss, sass}', {
		cwd: CONFIG.src
	})
		.pipe(sourcemaps.init())
		.pipe(sass(options).on('error', sass.logError))
		.pipe(postcss(packages))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(CONFIG.dist+'/styles'));
		//.pipe(browserSync.stream());
})


/************************************************************************************************************
*
*	GULP TASK RUNNERS
*
*************************************************************************************************************
* 	DEVELOPMENT (default) npm start
*************************************************************************************************************/
//1 --> SERIES --> clean and stage any props
gulp.task('default', ['clean'], () => {
	gulp.start('default:compile');
});
	//2 --> SERIES --> compilation/preprocessing/transpile and launch server environment
	gulp.task('default:compile', ['pug', 'sass', 'webpack:server'], () => {
		gulp.start('watch');
	});
/************************************************************************************************************
* 	PRODUCTION npm run deploy
*************************************************************************************************************/
//1 --> SERIES --> clean dependencies
gulp.task('deploy', ['clean'], () => {
	gulp.start('deploy:compile');
});
	gulp.task('deploy:compile', ['copy', 'pug', 'sass', 'webpack:deploy']);
