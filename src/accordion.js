import { $, $$ } from './util'
import A11y from './accordion.a11y'

import './accordion.style.scss'

//TODO: Rejig the $tab, $pane, $toggle dom parsing in both accordion.js and a11y so they are consistent

const 	NAME 			= "accordion",
		VERSION			= "0.0.4";

const 	className 		= {
		ACTIVE: 		"state__active",
		TRANSITION: 	"state__transition"
}

const 	selector 		= {
		ACCORDION: 		".ui__accordion",
		TAB: 			".ui__tab",
		TOGGLE: 		".ui__toggle",
		PANE: 			".ui__pane"
}


/**
* @selector "string" class selector
*/
export default function uiAccordion(_selector = selector.ACCORDION) {

	// SUPPORT
	if(!"querySelector" in document && !"addEventListener" in window && !"classList" in document.documentElement) return;


	var $$ui = $$(_selector);

	// Appraise and initialise each individual accordion nominated element found within the document
	$$ui.length && $$ui.forEach( ($accordion, i) => {

		// Accessibility initilisation
		let a11y = new A11y($accordion);
		
		let $$toggles = $$(`${selector.TAB} > ${selector.TOGGLE}`, $accordion).filter( (node) => node.parentNode.parentNode === $accordion);

		// Subscribe events
		$$toggles.forEach( ($toggle, i) => {

			$toggle.addEventListener("click", function(event) {
				event.stopPropagation();

				if(this.parentElement.classList.contains(className.ACTIVE)) return false;

				render.call(this.parentElement, event, $accordion); //DEVNOTE: scope reasserted
			}, false);
		});
			
		let $$panes = $$(selector.PANE, $accordion).filter( (node) => node.parentNode === $accordion);
		
		$$panes.forEach(($pane) => {
			$pane.addEventListener("transitionend", function(event) {
				
				let $tab = this.previousElementSibling,
					$pane = this;

				if($pane.style.height && event.propertyName === "height") {
					$pane.style.height = null;
					$tab.classList.remove(className.TRANSITION);
				}
			}, false);
		});
	});

	// PRIVATE METHODS
	function render(event, _$accordion) {
		
		//DEVNOTE: TODO: replace :scope as support is not assured
		let $$tabs = $$(`:scope > ${selector.TAB}`, _$accordion),
			$target = this;

		$$tabs.forEach( ($tab, i) => {

			let $pane = $tab.nextElementSibling;
			
			// If tab/pane IS active set height explicitly; add the state__transition class; set the height explicitly to 0;
			if($tab.classList.contains(className.ACTIVE)) {

				$pane.style.height = `${$pane.scrollHeight}px`;
				$pane.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow
				$tab.classList.add(className.TRANSITION);
				$tab.classList.remove(className.ACTIVE);
				$pane.style.height = `${0}px`;

				// Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed
				let hasTransition = window.getComputedStyle($pane, null).getPropertyValue("transition");
				if(hasTransition === "all 0s ease 0s") {
					$pane.style.height = null;
					$tab.classList.remove(className.TRANSITION);
				}

			// If tab/pane IS NOT active && our target; set height explicitly to 0; add the state__transition class; set the height explicitly to scrollheight; remove inline heights upon transitionends.
			}else {
				if($tab === $target) {

					$pane.style.height = `${0}px`;
					$tab.classList.add(className.ACTIVE, className.TRANSITION);
					$pane.style.height = `${$pane.scrollHeight}px`;

					// Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed
					let hasTransition = window.getComputedStyle($pane, null).getPropertyValue("transition");
					if(hasTransition === "all 0s ease 0s") {
						$pane.style.height = null;
						$tab.classList.remove(className.TRANSITION);
					}
				}
			}
		});

		return false;
	}

	// PUBLIC METHODS TBC
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
