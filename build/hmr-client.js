/* eslint-disable */
'use strict';

require('eventsource-polyfill')

const hmrClient 	= 					require('webpack-hot-middleware/client?reload=true')


hmrClient.subscribe( (event) => {
	if(event.action === 'reload') {
		window.location.reload()
	}
})
