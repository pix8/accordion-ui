'use strict';


document.documentElement.classList.remove("client__no-js");

//DEVNOTE: if no id use UID generator to assign aria hooks

function uiAccordion(_selector) {

	const $ = (selector, el = document) => [].slice.call(el.querySelector(selector));
	const $$ = (selector, el = document) => [].slice.call(el.querySelectorAll(selector));

	//DEVNOTE: Nodelist is an array-like object; this will shallow copy to an actual array.
	var $$ui = $$(_selector);

	//DEVNOTE: Nodelist is an array-like object as such can not be expected to have the forEach iterator available as a method call which can be implemented at the browsers discretion.
	$$ui.length && [].forEach.call($$ui, ($accordion, i) => {
		
		var $$button = $$("dt > button", $accordion);

		[].forEach.call($$button, ($toggle, i) => {

			//DEVNOTE: TODO: clicks from nested accordions would bubble up to the parent and conflict
			$toggle.addEventListener("click", function(event) {
				if(this.parentElement.classList.contains("state__active")) return false;

				clickHandler.call(this, event, $accordion);
			}, false);
		});
			
		var $$pane = $$("dd", $accordion);
		
		$$pane.forEach(($pane) => {

			//DEVNOTE: TODO: css transitions declared on nested elements could bubble through and clash conflicting with this routine
			$pane.addEventListener("transitionend", function(event) {
				if(this.style.height) this.style.height = "auto";
			}, false);
		});
	});

	function clickHandler(event, $accordion) {

		var $$headers = $$("dt", $accordion),
			$target = this.parentElement,
			$pane = $target.nextElementSibling;
			
		[].forEach.call($$headers, ($header, i) => {
			
			if($header.classList.contains("state__active")) {
				//console.log($header.nextElementSibling, " :: ", $header.nextElementSibling.offsetHeight, " :: ", $header.nextElementSibling.clientHeight, " :: ", $header.nextElementSibling.scrollHeight, " :: ", $header.nextElementSibling.getBoundingClientRect().height);
				$header.nextElementSibling.style.height = `${$header.nextElementSibling.scrollHeight}px`;
				$header.nextElementSibling.getBoundingClientRect(); //force a re-paint //force computation
			}

			$header.classList[$header === $target ? 'add' : 'remove']("state__active");
			$header.nextElementSibling.style.height = ($header === $target) ? `${$header.nextElementSibling.scrollHeight}px` : null;
		});

		return false;
	}
}

new uiAccordion(".ui__accordion");


if(module.hot) {
	module.hot.accept();
}
