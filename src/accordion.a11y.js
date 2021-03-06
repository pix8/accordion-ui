import { $, $$, getUID } from './util'


const 	lookup 		= {
	ACCORDION: {
		"role": 					"tablist",
		"aria": 					["aria-multiselectable"]
	},
	TAB: {
		"role": 					"tab",
		"aria": 					["aria-controls", "aria-selected", "aria-expanded", "aria-disabled"]
	},
	PANE: {
		"role": 					"tabpanel",
		"aria": 					["aria-labelledby", "aria-hidden"]
	}
}

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
* @param node(element) accordion instance
*/
export default function A11y(_$ui) {

	//var 	$$tabs = $$(selector.TAB, _$ui).filter( (node) => node.parentNode === _$ui),
	//		$$panes = $$(selector.PANE, _$ui).filter( (node) => node.parentNode === _$ui);
	var 	$$tabs = $$(`:scope > ${selector.TAB}`, _$ui),
			$$panes = $$(`:scope > ${selector.PANE}`, _$ui);
	
	// declare ARIA attributes/metadata
	_$ui.setAttribute("role", "tablist");
	_$ui.setAttribute("aria-multiselectable", false);

	$$tabs.forEach( ($tab, i, collection) => {
		
		let $pane = $tab.nextElementSibling;

		//if ID attribute exists and assigned a value
		let tabUID;
		if($tab.id.length) {
			tabUID = $tab.id;
		}else {
			tabUID = getUID("tab-", i);
			$tab.setAttribute("id", tabUID);
		}

		//if ID attribute exists and assigned a value
		let paneUID;
		if($pane.id.length) {
			paneUID = $pane.id;
		}else {
			paneUID = getUID("pane-", i);
			$pane.setAttribute("id", paneUID);
		}

		$tab.setAttribute("role", "tab");
		$tab.setAttribute("aria-controls", paneUID);

		$pane.setAttribute("role", "tabpanel");		
		$pane.setAttribute("aria-labelledby", tabUID);

		let $toggle = $(selector.TOGGLE, $tab);

		$toggle.addEventListener("click", function(event) {
			event.stopPropagation();
			
			//if(!!this.parentElement.getAttribute('aria-selected')) {
			if(this.parentElement.classList.contains(className.ACTIVE)) {
				return false;
			}

			//clickHandler.call(this, event, _$ui, collection);
			clickHandler.call(this.parentElement, event, _$ui, collection); //DEVNOTE: scope reasserted
		});
	});

	//accomodate explicitly declared behaviours/states
	var $$activatedCollection = $$([
			`${selector.TAB}.${className.ACTIVE}`,
			`${selector.TAB}[aria-selected=true]`,
			`${selector.TAB}[aria-expanded=true]`,
			`${selector.PANE}[aria-hidden=false]`
		].join()
	, _$ui).filter( (node) => node.parentNode === _$ui);
	
	//console.log("1. $activated >> ", $$activatedCollection);

	//Flush out any panes and normalise to tabs only.
	var $activatedTabs = $$activatedCollection.map( ($el, i) => {
		if($el.classList.contains("ui__pane")) return $el.previousElementSibling;
		
		return $el;
	});

	//console.log("2. $activatedTabs >> ", $activatedTabs);

	var $targetTab = $activatedTabs.filter( ($el, i, nodes) => i === nodes.indexOf($el) );

	//console.log("3. $targetTab >> ", $targetTab);

	if($targetTab.length > 1) window.console && console.warn("Malformed structure: You can not have more than one active pane declared on a singular accordion interface. Check the markup and any explicit classNames and ARIA properties in play. Only the first occurance will be enforced.");
	
	//Enforce any state classes to match the ARIA
	$$tabs.forEach( ($tab, i) => {
		$tab.classList[$tab === $targetTab[0] ? 'add' : 'remove']("state__active");
	})

	//Apply ARIA
	clickHandler.call($targetTab[0], null, _$ui, $$tabs);

	//ARIA state management
	function clickHandler(event, _$accordion, _$tabs) {
		
		//let $$tabs = $$(selector.TAB, _$accordion).filter( (node, i) => node.parentNode === _$accordion),
		let $$tabs = $$(`:scope > ${selector.TAB}`, _$accordion),
			$target = this;
			
		_$tabs.forEach( ($tab, i) => {
			$tab.setAttribute("aria-selected", $tab === $target );
			$tab.setAttribute("aria-expanded", $tab === $target );
			$tab.setAttribute("aria-disabled", $tab === $target );
			$tab.nextElementSibling.setAttribute("aria-hidden", $tab !== $target );
		});

		return false;
	};

	//TODO: apply enhanced keyboard controls - only if necessary
	//DEVNOTE: optional keyboard interactions as defined by WAI-ARIA Authoring Practices 1.1 accordion pattern link(https://www.w3.org/TR/wai-aria-practices-1.1/#accordion),
	// down/up arrows, home/end key not applied as this conflicts with default browser behaviours already assigned to these keys that are assigned to overflow scroll and document navigation I think this is a mistake/bad form.
	function keyHandler(event) {
	}

	//TODO: apply focus management - only if necessary
	function focusHandler(event) {
	}

	// Public methods TBC
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
