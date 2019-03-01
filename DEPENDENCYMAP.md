# Dependency mapping

Keeping tabs on the dependency tree so I know what's using what and can hopefully keep things from getting out of control or unintentionally make breaking changes.

## Rollup.js
	rollup
		rollup-plugin-alias
		rollup-plugin-includepaths
		rollup-plugin-node-resolve
		rollup-plugin-commonjs
		rollup-plugin-babel
			@babel/core
				@babel/preset-env
				@babel/plugin-transform-runtime
				@babel/plugin-external-helpers
				@babel/preset-react
		rollup-plugin-vue
			vue-template-compiler
		rollup-plugin-pug
			pug
			pug-plain-loader
		rollup-plugin-scss
			node-sass
		rollup-plugin-postcss
		rollup-plugin-url
		rollup-plugin-json
		chokidar

## Storybook (based on webpack)
	@storybook/react
		babel-loader
			@babel/core
				@babel/preset-env
				@babel/preset-react
		vue-loader
			vue-template-compiler
	@storybook/vue
		babel-loader
			@babel/core
				@babel/preset-env
				babel-preset-vue *strictly speaking this pack is not needed as other standard presets will cover the bases but declared in their babel config nevertheless
		vue-loader