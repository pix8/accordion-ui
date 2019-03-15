

export function PubSub() {
	
	// Subscription lookup
	var manifest = {};

	return {
		/*
		* example: 
		*	subscribe("myIdentifier", () => { //do some things });
		*
		************************/
		subscribe( /* String */ _id, /* Function */ _callback) {

			if(!manifest[_id]) manifest[_id] = [];

			manifest[_id].push(_callback);
			
			return [_id, _callback]; // 'signature'
		},

		/*
		* example: 
		*	var signature = subscribe("myIdentifier", { //do some things });
		*	...
		*	unsubscribe(signature);
		*
		*	OR
		*
		*	unsubscribe("myIdentifier", //named function reference);
		*
		************************/
		unsubscribe( /* Array/String */ _signatureOrEventType, /* Function? */ _callback) {

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
	}
}
