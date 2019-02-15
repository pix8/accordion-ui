import { $, $$ } from './util'


const LOOKUP = [
	{
		"role": "tablist",
		"aria-multiselectable": false
	}
]

/**
* @param node(element) accordion instance
*/
export default function A11y(_$ui) {
	//console.log("A11y -> ", _$ui);

	var 	$$tabs = $$(".ui__tab", _$ui).filter( (node) => node.parentNode === _$ui),
			$$panes = $$(".ui__pane", _$ui).filter( (node) => node.parentNode === _$ui);
	
	//console.log($$tabs, $$panes);

	// declare ARIA attributes/metadata
	// --> parent accordion
	_$ui.setAttribute("role", "tablist");
	_$ui.setAttribute("aria-multiselectable", false);

	// --> child tab
	$$tabs.forEach( ($tab, i, collection) => {
		$tab.setAttribute("role", "tab");
		//TODO: UID generated for id + ARIA relationship
		$tab.setAttribute("id", "tab-"+i);
		$tab.setAttribute("aria-controls", "pane-" + i);
		//$tab.setAttribute("tabindex", 0);

		let $toggle = $("button", $tab);

		$toggle.addEventListener("click", function(event) {
			event.stopPropagation();
			
			//TODO: change query to check for attribute aria-selected
			if(this.parentElement.classList.contains("state__active")) return false;

			clickHandler.call(this, event, _$ui, collection);
			//clickHandler.call(this.parentElement, event, _$ui, collection);
		});
	});

	// --> child pane
	$$panes.forEach( ($pane, i) => {
		$pane.setAttribute("role", "tabpanel");
		$pane.setAttribute("id", "pane-"+i);
		$pane.setAttribute("aria-labelledby", "tab-" + i);
		//$pane.setAttribute("tabindex", 0);
	});

	//apply enhanced keyboard controls

	//ARIA state management
	function clickHandler(event, _$accordion, _$tabs) {
		
		let $$tabs = $$(".ui__tab", _$accordion),
			$target = this.parentElement;
			
		_$tabs.forEach( ($tab, i) => {
			$tab.setAttribute("aria-selected", $tab === $target );
			$tab.setAttribute("aria-expanded", $tab === $target );
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
