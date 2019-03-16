import { $, $$, isElement } from './util'
import { PubSub } from './pattern'
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
	const eventsAPI = "pix8.click,pix8.transitionstart,pix8.transitionend,pix8.toggle,pix8.INACTIVE,pix8.active,pix8.initialised,pix8.create,pix8.refresh,pix8.destroy".split(","),
		pubSub = new PubSub(),
		manifest = [];

	// Different css class utilised as selector add `selector.ACCORDION` to the nominated root node so that dependent styles can be extrapolated
	if( !$accordion.classList.contains(selector.ACCORDION.slice(1)) ) $accordion.classList.add(selector.ACCORDION.slice(1));

	// WAI ARIA accessibility support initilisation
	//let a11y = new A11y($accordion);

	// Subscribe events
	//let $$toggles = $$(`${selector.TAB} > ${selector.TOGGLE}`, $accordion).filter( (node) => node.parentNode.parentNode === $accordion);
	let $$toggles = $$(`:scope > ${selector.TAB} > ${selector.TOGGLE}`, $accordion);
	$$toggles.forEach( ($toggle, i) => {

		$toggle.addEventListener("click", function(event) { //touchEnabled ? "touchend" : "click";
			event.stopPropagation();

			if(this.parentElement.classList.contains(className.ACTIVE)) return false;

			pubSub.publish("pix8.click", this);

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

			pubSub.publish("pix8.transitionend", this);

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
			/*
			* INACTIVE
			*****************************************************/
			// If tab/pane IS active set height explicitly; add the state__transition class; set the height explicitly to 0;
			if($tab.classList.contains(className.ACTIVE)) {

				activate($tab, $pane);
				/*$pane.style.height = `${$pane.scrollHeight}px`;
				$pane.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow
				$tab.classList.add(className.TRANSITION);
				$tab.classList.remove(className.ACTIVE);
				$pane.style.height = `${0}px`;

				pubSub.publish("pix8.inactive", this);

				// Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed
				let hasTransition = window.getComputedStyle($pane, null).getPropertyValue("transition");
				if(hasTransition === "all 0s ease 0s") {
					$pane.style.height = null;
					$tab.classList.remove(className.TRANSITION);
				}*/

			/*
			* ACTIVE
			*****************************************************/
			// If tab/pane IS NOT active && our target; set height explicitly to 0; add the state__transition class; set the height explicitly to scrollheight; remove inline heights upon transitionends.
			}else {
				if($tab === $target) {

					deactivate($tab, $pane);
					/*$pane.style.height = `${0}px`;
					$tab.classList.add(className.ACTIVE, className.TRANSITION);
					$pane.style.height = `${$pane.scrollHeight}px`;

					pubSub.publish("pix8.enable", this);

					// Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed
					let hasTransition = window.getComputedStyle($pane, null).getPropertyValue("transition");
					if(hasTransition === "all 0s ease 0s") {
						$pane.style.height = null;
						$tab.classList.remove(className.TRANSITION);
					}*/
				}
			}
		});

		return false;
	}

	//DEVNOTE: Owing to the declared stylings; in addition; the ARIA managed states -> accordion.a11y - reinforce the activation and deactivation of tab/pane sets
	const activate = (_$tab, _$pane) => {

		_$pane.style.height = `${_$pane.scrollHeight}px`;
		_$pane.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow
		_$tab.classList.add(className.TRANSITION);
		_$tab.classList.remove(className.ACTIVE);
		_$pane.style.height = `${0}px`;

		pubSub.publish("pix8.inactive", this);

		//TRANSITION MANAGEMENT
		// Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed
		let hasTransition = window.getComputedStyle(_$pane, null).getPropertyValue("transition");
		if(hasTransition === "all 0s ease 0s") {
			_$pane.style.height = null;
			_$tab.classList.remove(className.TRANSITION);
		}
	}

	const deactivate = (_$tab, _$pane) => {

		_$pane.style.height = `${0}px`;
		_$tab.classList.add(className.ACTIVE, className.TRANSITION);
		_$pane.style.height = `${_$pane.scrollHeight}px`;

		pubSub.publish("pix8.enable", this);

		//TRANSITION MANAGEMENT
		// Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed
		let hasTransition = window.getComputedStyle(_$pane, null).getPropertyValue("transition");
		if(hasTransition === "all 0s ease 0s") {
			_$pane.style.height = null;
			_$tab.classList.remove(className.TRANSITION);
		}
	}

	// PUBLIC METHODS
	return {

		// EVENT API
		on(_eventType, _callback) {
			//console.log("on()");

			var index = eventsAPI.indexOf(_eventType.toLowerCase());
			return !(index < 0) && pubSub.subscribe(eventsAPI[index], _callback);

			//return this; // Permit function chaining
		},

		off(_signatureOrEventType, _callback = null) {
			//console.log("off()");

			pubSub.unsubscribe(...arguments);

			return this; // Permit function chaining
		},

		// ACTIONS API
		toggle() {
			console.log("TBC pane toggle");

			return this; // Permit function chaining
		},

		active() { //active //enable //open //show
			console.log("TBC pane active");

			return this; // Permit function chaining
		},

		inactive() { //inactive //disable //close //hide
			console.log("TBC pane inactive");

			return this; // Permit function chaining
		},
		
		// LIFECYCLE API
		create() { //mount
			console.log("TBC create instance");
			//ACTION: programmatically create a new instance of the component
			pubSub.publish("pix8.create", this);

			return this; // Permit function chaining
		},

		render() {
			console.log("TBC render instance");
			//ACTION: issue instructions to re-draw/render the interface(component) - soft reset
			pubSub.publish("pix8.render", this);

			return this; // Permit function chaining
		},

		refresh() {
			console.log("TBC refresh instance");
			//ACTION: issue instructions to reinitialise and reinstantiate the component - hard reset
			pubSub.publish("pix8.refresh", this);

			return this; // Permit function chaining
		},

		destroy() {
			console.log("TBC destroy instance");
			//ACTION: destroy the component instance; undo/remove all DOM side-effects and event listeners
			pubSub.publish("pix8.destroy", this);

			return this; // Permit function chaining
		}
	}
}
