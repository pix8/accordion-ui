import { $, $$, isElement } from './util'
import A11y from './accordion.a11y'

import './accordion.style.scss'

//TODO: Rejig the $tab, $pane, $toggle dom parsing in both accordion.js and a11y so they are consistent
//TODO: mock DOM with virtual-DOMesqe representation? use DOM node reference arrays?

const 	NAME 			= "accordion",
		VERSION			= "0.0.10";

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
* @node {HTMLElement} DOM Element node 
*/
export default function uiAccordion(_node) {

	// DOM SUPPORT
	if(!"querySelector" in document && !"addEventListener" in window && !"classList" in document.documentElement) return;

	// VALIDATE DOM node and HTML element
	if(!isElement(_node)) return;

	var $accordion = _node;

	// Different css class utilised as selector add `selector.ACCORDION` to the nominated root node so that dependent styles can be extrapolated
	if( !$accordion.classList.contains(selector.ACCORDION.slice(1)) ) $accordion.classList.add(selector.ACCORDION.slice(1));

	// WAI ARIA accessibility support initilisation
	let a11y = new A11y($accordion);

	// Subscribe events
	let $$toggles = $$(`${selector.TAB} > ${selector.TOGGLE}`, $accordion).filter( (node) => node.parentNode.parentNode === $accordion);
	$$toggles.forEach( ($toggle, i) => {

		$toggle.addEventListener("click", function(event) { //touchEnabled ? "touchend" : "click";
			event.stopPropagation();

			if(this.parentElement.classList.contains(className.ACTIVE)) return false;

			render.call(this.parentElement, event, $accordion); //DEVNOTE: scope reasserted
		}, false);
	});
		
	//let $$panes = $$(selector.PANE, $accordion).filter( (node) => node.parentNode === $accordion);
	let $$panes = $$(`:scope > ${selector.PANE}`, $accordion).filter( (node) => node.parentNode === $accordion);
	console.log("$$panes >> ", $$panes);

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

	// PRIVATE METHODS
	function render(event, _$accordion) {
		
		let $$tabs = $$(selector.TAB, _$accordion).filter( (node, i) => node.parentNode === _$accordion), //$$(`:scope > ${selector.TAB}`, _$accordion),
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

	// PUBLIC METHODS
	return {
		// EVENT API
		addEventListener(_eventType) {
			console.log("TBC");
		},
		
		// LIFECYCLE API
		create() {
			console.log("TBC create instance");
		},

		refresh() {
			console.log("TBC refresh instance");
		},

		destroy() {
			console.log("TBC destroy instance");
		}
	}
}
