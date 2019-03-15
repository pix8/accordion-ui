import Accordion from "@pix8/ui-accordion";


document.documentElement.classList.remove("client__no-js");

var $$accordion = [].slice.call(document.querySelectorAll(".ui__accordion"));

var instance;
var test1;
[].forEach.call($$accordion.slice(0,1), ($accordion, i) => {
	instance = new Accordion($accordion);
	
	//TEST
	//instance.create().toggle();

	//TEST
	test1 = instance
		.on("pix8.click", clickhandler)
	
	var test2 = instance
		.on("pix8.click", function(event) {
			//alert("Method 1 :: callback :: pix8.click");
			console.log("METHOD :2: callback", this, " :pix8.click: ", event);

			instance.off(test2);
		})
		// .on("pix8.transitionend", function(event) {
		// 	//alert("Method 1 :: callback :: pix8.transitionend");
		// 	console.log("Method 1 :: callback", this, " :pix8.transitionend: ", event);
		// })
});


function clickhandler(event) {
	//alert("Method 1 :: callback :: pix8.click");
	console.log("METHOD :1: callback", this, " :pix8.click: ", event);

	//instance.off(test1); //with entity signature
	//instance.off("pix8.click", clickhandler); //with identifier + named function reference
}