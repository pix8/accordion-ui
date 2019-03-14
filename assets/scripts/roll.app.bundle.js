(function (Accordion) {
	'use strict';

	Accordion = Accordion && Accordion.hasOwnProperty('default') ? Accordion['default'] : Accordion;

	document.documentElement.classList.remove("client__no-js");
	var $$accordion = document.querySelectorAll(".ui__accordion");
	[].forEach.call($$accordion, function ($accordion, i) {
	  new Accordion($accordion);
	});

}(Accordion));
