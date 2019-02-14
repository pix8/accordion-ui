'use strict';

const stripAnsi				= require('strip-ansi');


class WebpackBrowserSyncPlugin {

	constructor(browserSync = false) {
		this.instance = browserSync;
	}

	apply(compiler) {
		compiler.plugin('done', (stats) => {

			if(!this.instance) throw new Error("No browser-sync instance passed as arg");

			if(stats.hasErrors() || stats.hasWarnings()) {
				//return this.instance.sockets.emit('error', console.log( "[webpack]:", stripAnsi(stats.toString({colors: true})) ));
				//return this.instance.sockets.emit('error', console.error.bind(console));
				return stripAnsi(stats.toString({colors: true}));
			}

			this.instance.reload();
		});
	}
}

module.exports = WebpackBrowserSyncPlugin;
