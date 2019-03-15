export default function PubSub() {
	
	// Subscription lookup
	var manifest = {};

	return {
		/*
		* example: 
		*	subscribe("myIdentifier", () => { //do some things });
		*
		************************/
		subscribe( /* String */ _id, /* Function */ _callback) {
			console.log("--1. subscribe-- ", _id);

			if(!manifest[_id]) manifest[_id] = [];

			manifest[_id].push(_callback);

			console.log(manifest);
			
			return [_id, _callback]; // 'signature'
		},

		// const subscribe = (/* String */ _identifier, /* Function */ _callback) => { //register
		// 	console.log("--2. subscribe--");

		// 	if(!manifest[_identifier]) manifest[_identifier] = [];
			
		// 	manifest[_identifier].push(_callback);

		// 	return [_identifier, _callback];
		// }

		/*
		* example: 
		*	var foobar = subscribe("myIdentifier", () => { //do some things });
		*	unsubscribe(foobar);
		*
		************************/
		// unsubscribe( /* Array */ _signature, /* Function? */ _callback) {
		// 	console.log("--1. unsubscribe--> ", _signature, " :: ", _callback);

		// 	//if(!Array.isArray(_signature)) return;

		// 	var subs = manifest[_callback ? _signature : _signature[0]],
		// 		_callback = _callback || _signature[1],
		// 		l = subs ? subs.length : 0;

		// 	while(l--) {
		// 		if(subs[l] === _callback) {
		// 			subs.splice(l, 1);
		// 		}
		// 	}
		// },

		// unsubscribe( /* Array */ _signature) {

		// 	var subs = manifest[_signature[0]],
		// 		_callback = _signature[1],
		// 		l = subs ? subs.length : 0;

		// 	while(l--) {
		// 		if(subs[l] === _callback) {
		// 			subs.splice(l, 1);
		// 		}
		// 	}
		// },

		unsubscribe( /* Array/String */ _eventTypeOrsignature, /* Function? */ _callback) {

			var signature = [].concat(...arguments);
			console.log("CHECK >> ", signature);

			var subs = manifest[signature[0]],
				callback = signature[1],
				l = subs ? subs.length : 0;

			while(l--) {
				if(subs[l] === callback) {
					subs.splice(l, 1);
				}
			}
		},

		unsubscribe2(/* String */ _identifier, /* Function? */ _callback) {
			console.log("--2. unsubscribe-- ", _identifier);

			if(!manifest[_identifier]) return;

			var callbackIndex = manifest[_identifier].indexOf(_callback[1]);

			console.log("index :: ", manifest[_identifier], " :: ", callbackIndex);
			
			if(callbackIndex < 0) {
				console.log("not found")
				//what to do?
					//remove last registered entry?
					//remove all entries?
					//remove first entry?
				return;
			}
			
			manifest[_identifier].splice(callbackIndex, 1);
		},

		/*
		* example: 
		*	publish("myIdentifier", [//params]);
		*
		************************/
		publish( /* String */ _id, /* Array? */ _args = []) {
			
			var subs = manifest[_id] && manifest[_id].slice().reverse(),
				l = subs ? subs.length : 0;

			while(l--) {
				subs[l].apply(this, _args);
			}
		}

		// const dispatch = (/* String */ _identifier, /* Array? */ _args = []) => { //publish
			
		// 	if(!manifest[_identifier]) return;
			
		// 	manifest[_identifier].forEach( callback => {
		// 		callback.apply(this, _args);
		// 	});
		// }
	}
}
