

export const $ = (_selector, _el = document) => _el.querySelector(_selector);

// DOM selection helper methods; Nodelist is an array-like object - this will return a shallow copy as an array type.
export const $$ = (_selector, _el = document) => {

	const regex = /:scope(?![\w-])/gi;

	if(_selector && regex.test(_selector)) { //using :scope so test for support and polyfill if necessary

		try { // test for :scope support
			document.querySelector(':scope body');
		}catch(error) { // unsupported => polyfill
			return POLYFILL.scope.call(_el, _selector, "querySelectorAll");
		}
	}
	return [].slice.call(_el.querySelectorAll(_selector)); //[].from(_el.querySelectorAll(_selector))
}

const POLYFILL = {
	scope: function(_query, _method) {

		const regex = /:scope(?![\w-])/gi;
		const attr = getUID();
		
		this.setAttribute(attr, '');

		_query = _query.replace(regex, `[${attr}]`);
		var nodeList = this[_method].call(this, _query);

		this.removeAttribute(attr);

		return [].slice.call(nodeList);
	}
}

function temp() {

	// Assumes queryselector support
	//1. stackoverflow
	['querySelector', 'querySelectorAll'].forEach(function(method) {

		var native = Element.prototype[method];

		Element.prototype[method] = function(query) {

			var regex = /((^|,)\s*):scope/g;

			if(query && regex.test(query)) {
				
				var id = this.id; // remember current element id
				
				this.id = 'ID_' + Date.now(); // assign new unique id

				query = query.replace(regex, '$1#' + this.id); // replace :scope with #ID
				
				var nodeList = document[method](query);
				
				this.id = id; // restore previous id

				return nodeList;
			}else {
				return native.call(this, query); // use native code for other selectors
			}
		}
	});

	//2.element-qsa-scope
	['querySelector', 'querySelectorAll'].forEach(function(method) {

		var native = HTMLElement.prototype[method];

		Element.prototype[method] = function(query) {

			var regex = /:scope(?![\w-])/gi;

			if(query && regex.test(query)) {

				var attr = 'q' + Math.floor(Math.random() * 9000000) + 1000000;

				// replace :scope with the fallback attribute
				arguments[0] = query.replace(regex, '[' + attr + ']');

				this.setAttribute(attr, '');

				var nodeList = native.apply(this, arguments);

				this.removeAttribute(attr);

				return nodeList;
			
			}else {
				return native.apply(this, query);
			}
		};
	})

	//3.
	['querySelector', 'querySelectorAll'].forEach(function(method) {

		var native = HTMLElement.prototype[method];

		// Override the method
		HTMLElement.prototype[method] = function(query) {

			var regex = /^\s*:scope/gi;

			var nodeList,
				gaveId = false,
				gaveContainer = false;

			if(query && query.match(regex)) {

				var container = document.createElement('div');

				if(!this.parentNode) {
					// Add to temporary container
					container.appendChild(this);
					gaveContainer = true;
				}

				var parentNode = this.parentNode;

				// Remove :scope
				query = query.replace(regex, '');

				if(!this.id) {
					// Give temporary ID
					this.id = 'rootedQuerySelector_id_'+(new Date()).getTime();
					gaveId = true;
				}

				// Find elements against parent node
				nodeList = native.call(parentNode, '#' + this.id + ' ' + query);

				// Reset the ID
				if(gaveId) {
					this.id = '';
				}

				// Remove from temporary container
				if(gaveContainer) {
					container.removeChild(this);
				}

				return nodeList;
			
			}else {
				return native.call(this, query);
			}
		};
	})

}

/**
* @prefix "string"
* @salt "string"/number
* return unique-like(high entropy) identifier; random number and timedatestamp converted to base36(represents full alphanumeric spectrum for encoding for minimal bit footprint) and concatenated;
* an optional 'salt' can also be thrown into the mixing pot to help enforce entropy.
*/
export const getUID = (_prefix = "_", _salt = "") => {

	do {
		_prefix += Math.random().toString(36).substring(2) + _salt + Date.now().toString(36);

	}while(document.getElementById(_prefix));

	return _prefix;
}


/**
* @length number; character length of the ID string to generate
* @ASCIIorigin number; ASCII character code start boundary
*/
export const getUString = (_length = 36, _ASCIIorigin = 97 /*64 for uppercase*/) =>  [...new Array(_length)]
		.map(
			() => String.fromCharCode(_ASCIIorigin + Math.random() * 26) //English alphabet length
		)
		.join('')


/**
* @node DOM node; to be queried
*/
export function isElement(_node) {
	// W3 DOM2
	/*console.log("isNotUndefined ", (_node !== undefined) );
	console.log("isNotNull ", (_node !== null) );
	console.log("isPrototypeOf HTMLElement ", HTMLElement.prototype.isPrototypeOf(_node) );
	
	// Not supporting W3 DOM2
	console.log("type of object ", (typeof _node === "object") );
	console.log("duck test nodeName prop", (_node.nodeName) ); //not dependable
	console.log("2: nodeType ",  (_node.nodeType === 1) );*/

	return (
		_node && typeof HTMLElement === "object" ?
			HTMLElement.prototype.isPrototypeOf(_node) : //W3C DOM2

			_node !== null && typeof _node === "object" && _node.nodeType === 1
	);
}


/**
* @node DOM node; to be queried
*/
export function isElement2(_node) { //including SVG
	/*console.log("instanceof HTMLElement ", (_node instanceof HTMLElement) );
	console.log("instanceof Element", (_node instanceof Element) );
	console.log("instanceof HTMLDocument", (_node instanceof HTMLDocument) );
	//console.log("prototype matches HTMLElement prototype ", (Object.getPrototypeOf(_node) == HTMLElement.prototype) );*/

	// Node being evaluated could be a superset of HTMLElement
	// Walk down the prototype hierarchy tree to evaluate the inherited prototype chain and ascertain if it is an Object of interest
	let proto = _node;
	while(proto && Object.getPrototypeOf(proto) !== null) {
		proto = Object.getPrototypeOf(proto)
		/*console.log("BOOM >> ", proto, 
			" :isHtmlElement: ", (proto === HTMLElement.prototype), 
			" :isElement: ", (proto === Element.prototype),
			" :isHTMLDocument: ", (proto === HTMLDocument.prototype) );*/

		if( (proto === HTMLElement.prototype) || (proto === Element.prototype) || (proto === HTMLDocument.prototype)) break;
	};

	return (
		proto instanceof HTMLElement || proto instanceof Element || proto instanceof HTMLDocument
	);
}

//console.log("accordion :: ", _node, " :: ", _node.__proto__, " :: ", Object.getPrototypeOf(_node)); //DEVNOTE: use of __proto__ superseded by getPrototypeOf

//TEST isElement routine (potential non-element nodes and entities)
/*var nonElementArray = [1, true, "text", {}, [], 0, undefined, false, null];
nonElementArray.forEach(function(item) {
	console.log(item, "1 >> ", isElement(item));
})

nonElementArray.forEach(function(item) {
	console.log(item, "2 >> ", isElement2(item));
})*/
