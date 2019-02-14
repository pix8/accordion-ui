# Dependency mapping

Keeping tabs on the dependency tree so I know what's using what and can hopefully keep things from getting out of control or unintentionally make breaking changes.

## Webpack
	webpack
		path
		webpack-merge
		babel-loader
			@babel/core
				@babel/preset-env
				@babel/preset-react
				@babel/plugin-external-helpers
				@babel/plugin-transform-runtime
		vue-loader
			vue-template-compiler
		pug-plain-loader
			pug
		sass-loader
		postcss-loader
			autoprefixer
			cssnano
		css-loader
		style-loader
		json-loader
		file-loader
		url-loader
		raw-loader *NOTE: look into getting rid of either url-loader/raw-loader/file-loader
		duplicate-package-checker-webpack-plugin
		friendly-errors-webpack-plugin
		plugin-error

## Gulp
	gulp
		path
		del
		gulp-rename
		gulp-pug
			pug
			gulp-sourcemaps
		gulp-sass
			gulp-postcss
				autoprefixer
				cssnano
			gulp-sourcemaps

## Environment
	cross-env
	browser-sync
		webpack-dev-middleware
		webpack-hot-middleware
	webpack-dev-server
		webpack-hot-middleware
	express
		webpack-dev-middleware
		webpack-hot-middleware
	json-server
	jest
	eslint

## Vendors
	bootstrap-sass
	breakpoint-sass