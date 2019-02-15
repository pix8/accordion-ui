

export const $ = (selector, el = document) => el.querySelector(selector);

// DOM selection helper methods; Nodelist is an array-like object - this will return a shallow copy as an array type.
export const $$ = (selector, el = document) => [].slice.call(el.querySelectorAll(selector)); //[].from(el.querySelectorAll(selector))
