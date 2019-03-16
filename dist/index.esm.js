function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var $$ = function $$(_selector) {
  var _el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  var regex = /:scope(?![\w-])/gi;

  if (_selector && regex.test(_selector)) {
    //using :scope so test for support and polyfill if necessary
    try {
      // check browser for :scope support
      document.querySelector(':scope body');
    } catch (error) {
      // unsupported => polyfill
      return [].slice.call(POLYFILL.scope.call(_el, _selector, "querySelectorAll"));
    }
  }

  return [].slice.call(_el.querySelectorAll(_selector)); //[].from(_el.querySelectorAll(_selector))
};
var POLYFILL = {
  scope: function scope(_query, _method) {
    var regex = /:scope(?![\w-])/gi;
    var attr = getUID();
    this.setAttribute(attr, '');
    _query = _query.replace(regex, "[".concat(attr, "]"));

    var nodeList = this[_method].call(this, _query);

    this.removeAttribute(attr);
    return nodeList;
  }
  /**
  * @prefix "string"
  * @salt "string"/number
  * return unique-like(high entropy) identifier; random number and timedatestamp converted to base36(represents full alphanumeric spectrum for encoding for minimal bit footprint) and concatenated;
  * an optional 'salt' can also be thrown into the mixing pot to help enforce entropy.
  */

};
var getUID = function getUID() {
  var _prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "_";

  var _salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  do {
    _prefix += Math.random().toString(36).substring(2) + _salt + Date.now().toString(36);
  } while (document.getElementById(_prefix));

  return _prefix;
};
/**
* @node DOM node; to be queried
*/

function isElement(_node) {
  // W3 DOM2

  /*console.log("isNotUndefined ", (_node !== undefined) );
  console.log("isNotNull ", (_node !== null) );
  console.log("isPrototypeOf HTMLElement ", HTMLElement.prototype.isPrototypeOf(_node) );
  
  // Not supporting W3 DOM2
  console.log("type of object ", (typeof _node === "object") );
  console.log("duck test nodeName prop", (_node.nodeName) ); //not dependable
  console.log("2: nodeType ",  (_node.nodeType === 1) );*/
  return _node && (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? HTMLElement.prototype.isPrototypeOf(_node) : //W3C DOM2
  _node !== null && _typeof(_node) === "object" && _node.nodeType === 1;
}
//TEST isElement routine (potential non-element nodes and entities)

/*var nonElementArray = [1, true, "text", {}, [], 0, undefined, false, null];
nonElementArray.forEach(function(item) {
	console.log(item, "1 >> ", isElement(item));
})

nonElementArray.forEach(function(item) {
	console.log(item, "2 >> ", isElement2(item));
})*/

function PubSub() {
  // Subscription lookup
  var manifest = {};
  return {
    /*
    * example: 
    *	subscribe("myIdentifier", () => { //do some things });
    *
    ************************/
    subscribe: function subscribe(
    /* String */
    _id,
    /* Function */
    _callback) {
      if (!manifest[_id]) manifest[_id] = [];

      manifest[_id].push(_callback);

      return [_id, _callback]; // 'signature'
    },

    /*
    * example: 
    *	var signature = subscribe("myIdentifier", { //do some things });
    *	...
    *	unsubscribe(signature);
    *
    *	OR
    *
    *	unsubscribe("myIdentifier", //named function reference);
    *
    ************************/
    unsubscribe: function unsubscribe(
    /* Array/String */
    _signatureOrEventType,
    /* Function? */
    _callback) {
      var _ref;

      var signature = (_ref = []).concat.apply(_ref, arguments);

      var subs = manifest[signature[0]],
          callback = signature[1],
          l = subs ? subs.length : 0;

      while (l--) {
        if (subs[l] === callback) {
          subs.splice(l, 1);
        }
      }
    },

    /*
    * example: 
    *	publish("myIdentifier", [//params]);
    *
    ************************/
    publish: function publish(
    /* String */
    _id) {
      var _args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var subs = manifest[_id] && manifest[_id].slice().reverse(),
          l = subs ? subs.length : 0;

      while (l--) {
        subs[l].apply(this, _args);
      }
    }
  };
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".ui__accordion .ui__tab {\n  position: relative; }\n  .ui__accordion .ui__tab .ui__toggle {\n    display: block;\n    cursor: pointer; }\n\n.ui__accordion .ui__pane {\n  position: relative;\n  overflow: hidden; }\n\n.ui__accordion .ui__tab:not([aria-expanded=true]):not([aria-selected=true]):not(.state__active):not(.state__transition) + .ui__pane,\n.ui__accordion .ui__tab:not([aria-expanded=true]):not([aria-selected=true]):not(.state__active):not(.state__transition) + [aria-hidden=true] {\n  height: 0;\n  display: none; }\n";
styleInject(css);

var className = {
  ACTIVE: "state__active",
  TRANSITION: "state__transition"
};
var selector = {
  ACCORDION: ".ui__accordion",
  TAB: ".ui__tab",
  TOGGLE: ".ui__toggle",
  PANE: ".ui__pane"
  /**
  * @node {HTMLElement} DOM Element node 
  */

};
function uiAccordion(_node) {
  var _this = this;

  // DOM SUPPORT
  if (!"querySelector" in document && !"addEventListener" in window && !"classList" in document.documentElement) return; // VALIDATE DOM node and HTML element

  if (!isElement(_node)) return;
  var $accordion = _node;
  //check events register and fire any relevent callbacks


  var eventsAPI = "pix8.click,pix8.transitionstart,pix8.transitionend,pix8.toggle,pix8.INACTIVE,pix8.active,pix8.initialised,pix8.create,pix8.refresh,pix8.destroy".split(","),
      pubSub = new PubSub();
 // Different css class utilised as selector add `selector.ACCORDION` to the nominated root node so that dependent styles can be extrapolated

  if (!$accordion.classList.contains(selector.ACCORDION.slice(1))) $accordion.classList.add(selector.ACCORDION.slice(1)); // WAI ARIA accessibility support initilisation
  //let a11y = new A11y($accordion);
  // Subscribe events
  //let $$toggles = $$(`${selector.TAB} > ${selector.TOGGLE}`, $accordion).filter( (node) => node.parentNode.parentNode === $accordion);

  var $$toggles = $$(":scope > ".concat(selector.TAB, " > ").concat(selector.TOGGLE), $accordion);
  $$toggles.forEach(function ($toggle, i) {
    $toggle.addEventListener("click", function (event) {
      //touchEnabled ? "touchend" : "click";
      event.stopPropagation();
      if (this.parentElement.classList.contains(className.ACTIVE)) return false;
      pubSub.publish("pix8.click", this);
      render.call(this.parentElement, event, $accordion); //DEVNOTE: scope reasserted
    }, false);
  }); //let $$panes = $$(selector.PANE, $accordion).filter( (node) => node.parentNode === $accordion);

  var $$panes = $$(":scope > ".concat(selector.PANE), $accordion);
  $$panes.forEach(function ($pane) {
    $pane.addEventListener("transitionend", function (event) {
      var $tab = this.previousElementSibling,
          $pane = this;

      if ($pane.style.height && event.propertyName === "height") {
        $pane.style.height = null;
        $tab.classList.remove(className.TRANSITION);
      }

      pubSub.publish("pix8.transitionend", this);
    }, false);
  }); // transitionstart still in Draft - would have to invoke in render() method; check for presence of transition style prop; check for presence of transition delay prop-if so compensate with setTimeout; fire event.
  // transitionstart would need to apply to both panes. the activated. and the one deactivate.
  // PRIVATE METHODS

  function render(event, _$accordion) {
    //let $$tabs = $$(selector.TAB, _$accordion).filter( (node, i) => node.parentNode === _$accordion),
    var $$tabs = $$(":scope > ".concat(selector.TAB), _$accordion),
        $target = this;
    $$tabs.forEach(function ($tab, i) {
      var $pane = $tab.nextElementSibling;
      /*
      * INACTIVE
      *****************************************************/
      // If tab/pane IS active set height explicitly; add the state__transition class; set the height explicitly to 0;

      if ($tab.classList.contains(className.ACTIVE)) {
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
      } else {
        if ($tab === $target) {
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
  } //DEVNOTE: Owing to the declared stylings; in addition; the ARIA managed states -> accordion.a11y - reinforce the activation and deactivation of tab/pane sets


  var activate = function activate(_$tab, _$pane) {
    _$pane.style.height = "".concat(_$pane.scrollHeight, "px");

    _$pane.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow


    _$tab.classList.add(className.TRANSITION);

    _$tab.classList.remove(className.ACTIVE);

    _$pane.style.height = "".concat(0, "px");
    pubSub.publish("pix8.inactive", _this); //TRANSITION MANAGEMENT
    // Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed

    var hasTransition = window.getComputedStyle(_$pane, null).getPropertyValue("transition");

    if (hasTransition === "all 0s ease 0s") {
      _$pane.style.height = null;

      _$tab.classList.remove(className.TRANSITION);
    }
  };

  var deactivate = function deactivate(_$tab, _$pane) {
    _$pane.style.height = "".concat(0, "px");

    _$tab.classList.add(className.ACTIVE, className.TRANSITION);

    _$pane.style.height = "".concat(_$pane.scrollHeight, "px");
    pubSub.publish("pix8.enable", _this); //TRANSITION MANAGEMENT
    // Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed

    var hasTransition = window.getComputedStyle(_$pane, null).getPropertyValue("transition");

    if (hasTransition === "all 0s ease 0s") {
      _$pane.style.height = null;

      _$tab.classList.remove(className.TRANSITION);
    }
  }; // PUBLIC METHODS


  return {
    // EVENT API
    on: function on(_eventType, _callback) {
      //console.log("on()");
      var index = eventsAPI.indexOf(_eventType.toLowerCase());
      return !(index < 0) && pubSub.subscribe(eventsAPI[index], _callback); //return this; // Permit function chaining
    },
    off: function off(_signatureOrEventType) {

      //console.log("off()");
      pubSub.unsubscribe.apply(pubSub, arguments);
      return this; // Permit function chaining
    },
    // ACTIONS API
    toggle: function toggle() {
      console.log("TBC pane toggle");
      return this; // Permit function chaining
    },
    active: function active() {
      //active //enable //open //show
      console.log("TBC pane active");
      return this; // Permit function chaining
    },
    inactive: function inactive() {
      //inactive //disable //close //hide
      console.log("TBC pane inactive");
      return this; // Permit function chaining
    },
    // LIFECYCLE API
    create: function create() {
      //mount
      console.log("TBC create instance"); //ACTION: programmatically create a new instance of the component

      pubSub.publish("pix8.create", this);
      return this; // Permit function chaining
    },
    render: function render() {
      console.log("TBC render instance"); //ACTION: issue instructions to re-draw/render the interface(component) - soft reset

      pubSub.publish("pix8.render", this);
      return this; // Permit function chaining
    },
    refresh: function refresh() {
      console.log("TBC refresh instance"); //ACTION: issue instructions to reinitialise and reinstantiate the component - hard reset

      pubSub.publish("pix8.refresh", this);
      return this; // Permit function chaining
    },
    destroy: function destroy() {
      console.log("TBC destroy instance"); //ACTION: destroy the component instance; undo/remove all DOM side-effects and event listeners

      pubSub.publish("pix8.destroy", this);
      return this; // Permit function chaining
    }
  };
}

export default uiAccordion;
