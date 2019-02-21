import { $, $$ } from './util'


const 	LOOKUP 		= [
	{
		"role": 					"tablist",
		"aria-multiselectable": 	false
	}
]

const 	Util		= {

	getUID(prefix = "_", counter = "") {
		do {
			//var date = Date.now(); //+new Date()
			//var random = ~~(Math.random() * 1000000);
			//console.log(date, " :: ", random);

			prefix += Math.random().toString(36).substring(2) + counter + Date.now().toString(36);

		}while(document.getElementById(prefix))

		return prefix;
	}
}

/*
const ID_LENGTH = 36
const START_LETTERS_ASCII = 97 // Use 64 for uppercase
const ALPHABET_LENGTH = 26

const uniqueID = () => [...new Array(ID_LENGTH)]
  .map(() => String.fromCharCode(START_LETTERS_ASCII + Math.random() * ALPHABET_LENGTH))
 .join('')
 */

/*
const randomHash = function () {
	var array = new Uint32Array(1);
	let hash = window.crypto.getRandomValues(array);
	if (myExistingIds.includes(hash[0])) {
	    randomHash();
	} else {
	    myExistingIds.push(hash[0]);
	}
}
*/

/**
* @param node(element) accordion instance
*/
export default function A11y(_$ui) {
	//console.log("A11y -> ", _$ui);

	var 	$$tabs = $$(".ui__tab", _$ui).filter( (node) => node.parentNode === _$ui),
			$$panes = $$(".ui__pane", _$ui).filter( (node) => node.parentNode === _$ui);
	
	// declare ARIA attributes/metadata
	// --> parent accordion
	_$ui.setAttribute("role", "tablist");
	_$ui.setAttribute("aria-multiselectable", false);

	$$tabs.forEach( ($tab, i, collection) => {
		
		const tabUID = Util.getUID("tab-", i);
		const paneUID = Util.getUID("pane-", i);
		let $pane = $tab.nextElementSibling;

		$tab.setAttribute("role", "tab");
		$tab.setAttribute("id", tabUID);
		$tab.setAttribute("aria-controls", paneUID);

		$pane.setAttribute("role", "tabpanel"); //$pane.setAttribute("role", "region");
		$pane.setAttribute("id", paneUID);
		$pane.setAttribute("aria-labelledby", tabUID);

		let $toggle = $(".ui__toggle", $tab);

		$toggle.addEventListener("click", function(event) {
			event.stopPropagation();
			
			//TODO: change query to check for attribute aria-selected
			if(this.parentElement.classList.contains("state__active")) return false;

			clickHandler.call(this, event, _$ui, collection);
			//clickHandler.call(this.parentElement, event, _$ui, collection);
		});
	});

	//apply enhanced keyboard controls
	//DEVNOTE: optional keyboard interactions as defined by WAI-ARIA Authoring Practices 1.1 accordion pattern link(https://www.w3.org/TR/wai-aria-practices-1.1/#accordion),
	// down/up arrows, home/end key not applied as this conflicts with default browser behaviours already assigned to these keys that are assigned to overflow scroll and document navigation I think this is a mistake/bad form.
	function keyHandler(event) {
	}

	//state__active tab that can't be interacted with - because it is open and won't collapse - should have aria-disabled="true"

	//ARIA state management
	function clickHandler(event, _$accordion, _$tabs) {
		
		let $$tabs = $$(":scope > .ui__tab", _$accordion),
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
