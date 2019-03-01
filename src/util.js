

export const $ = (_selector, _el = document) => _el.querySelector(_selector);

// DOM selection helper methods; Nodelist is an array-like object - this will return a shallow copy as an array type.
export const $$ = (_selector, _el = document) => [].slice.call(_el.querySelectorAll(_selector)); //[].from(_el.querySelectorAll(_selector))

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
*
*/
export const getUString = (_length = 36, _ASCIIorigin = 97 /*64 for uppercase*/) =>  [...new Array(_length)]
		.map(
			() => String.fromCharCode(_ASCIIorigin + Math.random() * 26) //English alphabet length
		)
		.join('')
