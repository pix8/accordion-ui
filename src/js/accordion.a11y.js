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

	var 	$$tabs = $$(selector.TAB, _$ui).filter( (node) => node.parentNode === _$ui),
			$$panes = $$(selector.PANE, _$ui).filter( (node) => node.parentNode === _$ui);
	
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

	//ARIA state management
	function clickHandler(event, _$accordion, _$tabs) {
		
		//DEVNOTE: TODO: replace :scope as support is not assured
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
