import { $, $$, getUID } from './util'


const 	LOOKUP 		= [
	{
		"role": 					"tablist",
		"aria-multiselectable": 	false
	}
]

/**
* @param node(element) accordion instance
*/
export default function A11y(_$ui) {

	var 	$$tabs = $$(".ui__tab", _$ui).filter( (node) => node.parentNode === _$ui),
			$$panes = $$(".ui__pane", _$ui).filter( (node) => node.parentNode === _$ui);
	
	// declare ARIA attributes/metadata
	_$ui.setAttribute("role", "tablist");
	_$ui.setAttribute("aria-multiselectable", false);

	$$tabs.forEach( ($tab, i, collection) => {
		
		//check if id exists on either tab or pane already
			//if they do use these
			//if not generate these

		const tabUID = getUID("tab-", i);
		const paneUID = getUID("pane-", i);
		let $pane = $tab.nextElementSibling;

		$tab.setAttribute("role", "tab");
		$tab.setAttribute("id", tabUID);
		$tab.setAttribute("aria-controls", paneUID);

		$pane.setAttribute("role", "tabpanel");
		$pane.setAttribute("id", paneUID);
		$pane.setAttribute("aria-labelledby", tabUID);

		let $toggle = $(".ui__toggle", $tab);

		$toggle.addEventListener("click", function(event) {
			event.stopPropagation();
			
			//if(!!this.parentElement.getAttribute('aria-selected')) {
			if(this.parentElement.classList.contains("state__active")) {
				return false;
			}

			clickHandler.call(this, event, _$ui, collection);
			//clickHandler.call(this.parentElement, event, _$ui, collection);
		});
	});

	//apply enhanced keyboard controls
	//DEVNOTE: optional keyboard interactions as defined by WAI-ARIA Authoring Practices 1.1 accordion pattern link(https://www.w3.org/TR/wai-aria-practices-1.1/#accordion),
	// down/up arrows, home/end key not applied as this conflicts with default browser behaviours already assigned to these keys that are assigned to overflow scroll and document navigation I think this is a mistake/bad form.
	function keyHandler(event) {
	}

	//ARIA state management
	function clickHandler(event, _$accordion, _$tabs) {
		
		//DEVNOTE: TODO: replace :scope as support is not assured
		let $$tabs = $$(":scope > .ui__tab", _$accordion),
			$target = this.parentElement;
			
		_$tabs.forEach( ($tab, i) => {
			$tab.setAttribute("aria-selected", $tab === $target );
			$tab.setAttribute("aria-expanded", $tab === $target );
			$tab.setAttribute("aria-disabled", $tab === $target );
			$tab.nextElementSibling.setAttribute("aria-hidden", $tab !== $target );
		});

		return false;
	};

	//apply focus management

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
