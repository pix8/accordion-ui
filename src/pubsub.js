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
			
			return [_id, _callback]; // 'signature'
		},

		/*
		* example: 
		*	var foobar = subscribe("myIdentifier", () => { //do some things });
		*	unsubscribe(foobar);
		*
		************************/
		unsubscribe( /* Array */ _signature, /* Function? */ _callback) {
			console.log("--1. unsubscribe-- ", Array.isArray(_signature));

			if(!Array.isArray(_signature)) return;

			var subs = manifest[_callback ? _signature : _signature[0]];
			
			console.log("jb :: ", subs, " :: ", _callback ? _signature : _signature[0])
			
			var _callback = _callback || _signature[1],
				l = subs ? subs.length : 0;

			while(l--) {
				if(subs[l] === _callback) subs.splice(l, 1);
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
