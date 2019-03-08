import Accordion from "@pix8/ui-accordion";


document.documentElement.classList.remove("client__no-js");

var $$accordion = document.querySelectorAll(".ui__accordion");

[].forEach.call($$accordion, ($accordion, i) => {
	new Accordion($accordion);
});
