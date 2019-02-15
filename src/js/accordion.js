import { $, $$ } from './util'
import Transition from './accordion.transition'
import A11y from './accordion.a11y'

import './accordion.style.scss'

//TASK remove the css height 0 and any js assignments to height auto can be set to null instead
//leverage the state__transition to set display: none on inactive panes
//investigate the height claculation inconsistencies(that are visible if you click the tabs to activate panes when height is not set to 0)


/**
* @param "string" class selector
*/
export default function uiAccordion(_selector) {

	// SUPPORT
	if(!"querySelector" in document && !"addEventListener" in window && !"classList" in document.documentElement) return;

	var $$ui = $$(_selector);

	// Appraise and initialise each individual accordion nominated element found within the document
	$$ui.length && $$ui.forEach( ($accordion, i) => {

		// Accessibility initilisation
		//let a11y = new A11y($accordion);
		//let transition = new Transition($accordion);
		
		let $$toggles = $$(".ui__tab > .ui__toggle", $accordion).filter( (node) => node.parentNode.parentNode === $accordion);

		// Subscribe events
		$$toggles.forEach( ($toggle, i) => {

			$toggle.addEventListener("click", function(event) {
				event.stopPropagation();

				if(this.parentElement.classList.contains("state__active")) return false;

				render.call(this.parentElement, event, $accordion);
			}, false);
		});
			
		var $$panes = $$(".ui__pane", $accordion).filter( (node) => node.parentNode === $accordion);
		
		$$panes.forEach(($pane) => {
			$pane.addEventListener("transitionend", function(event) {
				if(this.style.height && event.propertyName === "height") {
					this.style.height = "auto"; //DEVNOTE: could be set to null if the css stylesheet derived height: 0; is binned
				}

				if(event.propertyName === "height") {
					this.previousElementSibling.classList.remove("state__transition");
				}
			}, false);
		});

		// Evaluate presence of active tabs
		//checks to perform to assert an open pane
			//class of .state__active is present
			//aria-selected="true" is present on the tab
			//aria-expanded="true" is present on the tab
			//aria-hidden="false" is present on the pane
				//if either is true the counterpart is enforced too
				//if multiples exist; the first occurance is honoured(the remainder are realigned)

		let $active = $(":scope > .state__active", $accordion); //.filter( (node) => node.parentNode === $accordion);
		if($active && $active.parentNode === $accordion) {
			render.call($active, null, $accordion);
		}
	});

	function render(event, _$accordion) {
		let $$tabs = $$(":scope > .ui__tab", _$accordion),
			$target = this;//,
			//$pane = $target.nextElementSibling;
		
		if(event === null) {

			[].forEach.call($$tabs, ($tab, i) => {
				$tab.classList[$tab === $target ? 'add' : 'remove']("state__active");
				
				if($tab.classList.contains("state__active")) {
					$tab.nextElementSibling.style.height = "auto";
				};
			});

			return;
		};

			
		[].forEach.call($$tabs, ($tab, i) => {
			
			if($tab.classList.contains("state__active")) {
				console.log($tab.nextElementSibling, " :: ", $tab.nextElementSibling.offsetHeight, " :: ", $tab.nextElementSibling.clientHeight, " :: ", $tab.nextElementSibling.scrollHeight, " :: ", $tab.nextElementSibling.getBoundingClientRect().height);
				
				$tab.nextElementSibling.style.height = `${$tab.nextElementSibling.scrollHeight}px`;
				$tab.nextElementSibling.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow

				$tab.classList.add("state__transition");

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

			if($tab === $target) $tab.classList.add("state__transition");
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
