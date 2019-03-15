import Accordion from "@pix8/ui-accordion";


document.documentElement.classList.remove("client__no-js");

var $$accordion = document.querySelectorAll(".ui__accordion");

[].forEach.call($$accordion, ($accordion, i) => {
	var instance = new Accordion($accordion);
	
	//TEST
	//instance.create().toggle();

	//TEST
	instance
		.on("pix8.click", function(event) {
			//alert("Method 1 :: callback :: pix8.click");
			console.log("Method 1 :1: callback", this, " :pix8.click: ", event);

			instance.off("pix8.click");
		})
		.on("pix8.click", function(event) {
			//alert("Method 1 :: callback :: pix8.click");
			console.log("Method 1 :2: callback", this, " :pix8.click: ", event);

			instance.off("pix8.click");
		})
		// .on("pix8.transitionend", function(event) {
		// 	//alert("Method 1 :: callback :: pix8.transitionend");
		// 	console.log("Method 1 :: callback", this, " :pix8.transitionend: ", event);
		// })
});
