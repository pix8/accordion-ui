import transition from './transition'
import A11y from './a11y'
import { $, $$ } from './util'

import './accordion.style.scss'

//checks to perform to assert an open pane
	//class of .state__active is present
	//aria-selected="true" is present on the tab
	//aria-expanded="true" is present on the tab
	//aria-hidden="false" is present on the pane
		//if either is true the counterpart is enforced too
		//if multiples exist; the first occurance is honoured(the remainder are realigned)


/**
* @param "string" class selector
*/
export default function uiAccordion(_selector) {

	// SUPPORT
	if(!"querySelector" in document && !"addEventListener" in window && !"classList" in document.documentElement) return;

	var $$ui = $$(_selector);

	// Appraise and initialise each individual accordion nominated element found within the document
	$$ui.length && $$ui.forEach( ($accordion, i) => {

		//accessibility initilisation
		//let a11y = new A11y($accordion);
		
		//let $$toggles = $$(":scope > .ui__tab > button", $accordion); //DEVNOTE: :scope is still in w3c draft //for robust solution 1)would need a rooted query to impose the relationship as direct child from accordion 2)or ditch queryselector and use children and evaluate elementName
		let $$toggles = $$(".ui__tab > button", $accordion).filter( (node) => node.parentNode.parentNode === $accordion);

		$$toggles.forEach( ($toggle, i) => {

			$toggle.addEventListener("click", function(event) {
				event.stopPropagation();

				if(this.parentElement.classList.contains("state__active")) return false;

				clickHandler.call(this, event, $accordion);
			}, false);
		});
			
		var $$panes = $$(".ui__pane", $accordion).filter( (node) => node.parentNode === $accordion);
		
		$$panes.forEach(($pane) => {
			$pane.addEventListener("transitionend", function(event) {
				if(this.style.height && event.propertyName === "height") this.style.height = "auto"; //DEVNOTE: could be set to null if the css stylesheet derived height: 0; is binned
			}, false);
		});
	});

	function clickHandler(event, _$accordion) {

		let $$tabs = $$(".ui__tab", _$accordion),
			$target = this.parentElement;//,
			//$pane = $target.nextElementSibling;
			
		[].forEach.call($$tabs, ($tab, i) => {
			
			if($tab.classList.contains("state__active")) {
				//console.log($tab.nextElementSibling, " :: ", $tab.nextElementSibling.offsetHeight, " :: ", $tab.nextElementSibling.clientHeight, " :: ", $tab.nextElementSibling.scrollHeight, " :: ", $tab.nextElementSibling.getBoundingClientRect().height);
				
				$tab.nextElementSibling.style.height = `${$tab.nextElementSibling.scrollHeight}px`;
				$tab.nextElementSibling.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow

				//DEVNOTE: alternative method with requestAnimationFrame()
				//ref: https://codepen.io/brundolf/pen/dvoGyw
				// https://css-tricks.com/using-css-transitions-auto-dimensions/

				/*let elementTransition = $tab.nextElementSibling.transition;
				$tab.nextElementSibling.transition = '';

				window.requestAnimationFrame(function() {
					console.log("animation frame")
				 	$tab.nextElementSibling.style.height = `${$tab.nextElementSibling.scrollHeight}px`;
				 	$tab.nextElementSibling.transition = elementTransition;

				 	window.requestAnimationFrame(function() {
				 		$tab.nextElementSibling.style.height = 0 + "px";
				 	});
				});*/
			};

			$tab.classList[$tab === $target ? 'add' : 'remove']("state__active");
			$tab.nextElementSibling.style.height = ($tab === $target) ? `${$tab.nextElementSibling.scrollHeight}px` : null;
		});

		return false;
	}

	// Public methods
	return {
		create() {
			console.log("create instance");
		},

		refresh() {
			console.log("refresh instance");
		},

		destroy() {
			console.log("destroy instance");
		}
	}
}
