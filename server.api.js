'use strict';


const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const	jsonServer 				= require('json-server'),
		api 					= jsonServer.create();


api.use(jsonServer.defaults());
api.use(jsonServer.router('api/database.json'));
api.listen(5000, () => {
	console.log('JSON Server/Mock API is running on port 5000')
});
