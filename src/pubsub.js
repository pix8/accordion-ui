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
			//console.log("--1. subscribe-- ", _id);

			if(!manifest[_id]) manifest[_id] = [];

			manifest[_id].push(_callback);
			
			return [_id, _callback]; // 'signature'
		},

		// const subscribe = (/* String */ _identifier, /* Function */ _callback) => { //register
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
		unsubscribe( /* Array/String */ _eventTypeOrsignature, /* Function? */ _callback) {

			var signature = [].concat(...arguments);

			var subs = manifest[signature[0]],
				callback = signature[1],
				l = subs ? subs.length : 0;

			while(l--) {
				if(subs[l] === callback) {
					subs.splice(l, 1);
				}
			}
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
