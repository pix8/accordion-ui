import { $, $$, isElement } from './util'
import PubSub from './pubsub'
import A11y from './accordion.a11y'

import './accordion.style.scss'

//THE GREAT LIST OF PROCRASTINATION i.e. tech debt
//TODO: Rejig the $tab, $pane, $toggle dom parsing in both accordion.js and a11y so they are consistent
//TODO: mock DOM with virtual-DOMesqe representation? use DOM node reference arrays?
//TODO: ability to programatically open and close a pane - alternatively by reacting suitably if a relevant property is modified - class selector or ARIA

const 	NAME 			= "accordion",
		AUTHOR			= "j.brincat",
		VERSION			= "0.0.13";

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

	var _self = this;

	//fire INIT event handler if present
	//check events register and fire any relevent callbacks
	const eventsAPI = "pix8.click,pix8.transitionstart,pix8.transitionend,pix8.toggle,pix8.hide,pix8.show,pix8.initialised,pix8.create,pix8.refresh,pix8.destroy".split(","),
		pubsub = new PubSub(),
		manifest = [];

	// Different css class utilised as selector add `selector.ACCORDION` to the nominated root node so that dependent styles can be extrapolated
	if( !$accordion.classList.contains(selector.ACCORDION.slice(1)) ) $accordion.classList.add(selector.ACCORDION.slice(1));

	// WAI ARIA accessibility support initilisation
	let a11y = new A11y($accordion);

	// Subscribe events
	//let $$toggles = $$(`${selector.TAB} > ${selector.TOGGLE}`, $accordion).filter( (node) => node.parentNode.parentNode === $accordion);
	let $$toggles = $$(`:scope > ${selector.TAB} > ${selector.TOGGLE}`, $accordion);
	$$toggles.forEach( ($toggle, i) => {

		$toggle.addEventListener("click", function(event) { //touchEnabled ? "touchend" : "click";
			event.stopPropagation();

			if(this.parentElement.classList.contains(className.ACTIVE)) return false;

			//fire pix8.CLICK event handler if present
			//console.log("fire pix8.click >> ", _self, " :: ", this);			
			pubsub.publish("pix8.click", [this]);

			render.call(this.parentElement, event, $accordion); //DEVNOTE: scope reasserted
		}, false);
	});
		
	//let $$panes = $$(selector.PANE, $accordion).filter( (node) => node.parentNode === $accordion);
	let $$panes = $$(`:scope > ${selector.PANE}`, $accordion);

	$$panes.forEach(($pane) => {
		$pane.addEventListener("transitionend", function(event) {
			
			let $tab = this.previousElementSibling,
				$pane = this;

			if($pane.style.height && event.propertyName === "height") {
				$pane.style.height = null;
				$tab.classList.remove(className.TRANSITION);
			}

			//fire pix8.TRANSITIONEND event handler if present
			//console.log("fire pix8.transitionend >> ", _self, " :: ", this);			
			pubsub.publish("pix8.transitionend", [this]);

		}, false);
	});

	// transitionstart still in Draft - would have to invoke in render() method; check for presence of transition style prop; check for presence of transition delay prop-if so compensate with setTimeout; fire event.
	// transitionstart would need to apply to both panes. the activated. and the one deactivate.

	// PRIVATE METHODS
	function render(event, _$accordion) {
		
		//let $$tabs = $$(selector.TAB, _$accordion).filter( (node, i) => node.parentNode === _$accordion),
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

	function getPosition(_identifier) {
		return eventsAPI.indexOf(_identifier.toLowerCase());
	}

	// PUBLIC METHODS
	return {

		// EVENT API
		on(_eventType, _callback) {
			//console.log("on() = ", _eventType);

			var index = getPosition(_eventType);
			return !(index < 0) && pubsub.subscribe(eventsAPI[index], _callback);

			//return this; // Permit function chaining
		},

		off(_eventTypeOrsignature, _callback = null) {
			//console.log("off() = ", _eventTypeOrsignature);

			pubsub.unsubscribe(...arguments)

			/*var index = getPosition(_signature[0]);
			!(index < 0) && pubsub.unsubscribe(_signature);*/

			return this; // Permit function chaining
		},

		// ACTIONS API
		toggle() {
			console.log("TBC pane toggle");

			return this; // Permit function chaining
		},

		show() { //activate //enable //open
			console.log("TBC pane activated");

			return this; // Permit function chaining
		},

		hide() { //deactivate //disable //close
			console.log("TBC pane deactivated");

			return this; // Permit function chaining
		},
		
		// LIFECYCLE API
		create() { //mount
			console.log("TBC create instance");
			//ACTION: programmatically create a new instance of the component

			return this; // Permit function chaining
		},

		render() {
			console.log("TBC render instance");
			//ACTION: issue instructions to re-draw/render the interface(component) - soft reset

			return this; // Permit function chaining
		},

		refresh() {
			console.log("TBC refresh instance");
			//ACTION: issue instructions to reinitialise and reinstantiate the component - hard reset

			return this; // Permit function chaining
		},

		destroy() {
			console.log("TBC destroy instance");
			//ACTION: destroy the component instance; undo/remove all DOM side-effects and event listeners

			return this; // Permit function chaining
		}
	}
}
