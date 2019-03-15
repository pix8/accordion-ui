(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.uiAccordion = factory());
}(this, function () { 'use strict';

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

  var $ = function $(_selector) {
    var _el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    var regex = /:scope(?![\w-])/gi;

    if (_selector && regex.test(_selector)) {
      //using :scope so test for support and polyfill if necessary
      try {
        // check browser for :scope support
        document.querySelector(':scope body');
      } catch (error) {
        // unsupported => polyfill
        return POLYFILL.scope.call(_el, _selector, "querySelector");
      }
    }

    return _el.querySelector(_selector);
  }; // DOM selection helper methods; Nodelist is an array-like object - this will return a shallow copy as an array type.

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
        console.log("--1. subscribe-- ", _id);
        if (!manifest[_id]) manifest[_id] = [];

        manifest[_id].push(_callback);

        return [_id, _callback]; // 'signature'
      },

      /*
      * example: 
      *	var foobar = subscribe("myIdentifier", () => { //do some things });
      *	unsubscribe(foobar);
      *
      ************************/
      unsubscribe: function unsubscribe(
      /* Array */
      _signature,
      /* Function? */
      _callback) {
        console.log("--1. unsubscribe-- ", Array.isArray(_signature));
        if (!Array.isArray(_signature)) return;
        var subs = manifest[_callback ? _signature : _signature[0]];
        console.log("jb :: ", subs, " :: ", _callback ? _signature : _signature[0]);

        var _callback = _callback || _signature[1],
            l = subs ? subs.length : 0;

        while (l--) {
          if (subs[l] === _callback) subs.splice(l, 1);
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
    * @param node(element) accordion instance
    */

  };
  function A11y(_$ui) {
    //var 	$$tabs = $$(selector.TAB, _$ui).filter( (node) => node.parentNode === _$ui),
    //		$$panes = $$(selector.PANE, _$ui).filter( (node) => node.parentNode === _$ui);
    var $$tabs = $$(":scope > ".concat(selector.TAB), _$ui),
        $$panes = $$(":scope > ".concat(selector.PANE), _$ui); // declare ARIA attributes/metadata

    _$ui.setAttribute("role", "tablist");

    _$ui.setAttribute("aria-multiselectable", false);

    $$tabs.forEach(function ($tab, i, collection) {
      var $pane = $tab.nextElementSibling; //if ID attribute exists and assigned a value

      var tabUID;

      if ($tab.id.length) {
        tabUID = $tab.id;
      } else {
        tabUID = getUID("tab-", i);
        $tab.setAttribute("id", tabUID);
      } //if ID attribute exists and assigned a value


      var paneUID;

      if ($pane.id.length) {
        paneUID = $pane.id;
      } else {
        paneUID = getUID("pane-", i);
        $pane.setAttribute("id", paneUID);
      }

      $tab.setAttribute("role", "tab");
      $tab.setAttribute("aria-controls", paneUID);
      $pane.setAttribute("role", "tabpanel");
      $pane.setAttribute("aria-labelledby", tabUID);
      var $toggle = $(selector.TOGGLE, $tab);
      $toggle.addEventListener("click", function (event) {
        event.stopPropagation(); //if(!!this.parentElement.getAttribute('aria-selected')) {

        if (this.parentElement.classList.contains(className.ACTIVE)) {
          return false;
        } //clickHandler.call(this, event, _$ui, collection);


        clickHandler.call(this.parentElement, event, _$ui, collection); //DEVNOTE: scope reasserted
      });
    }); //accomodate explicitly declared behaviours/states

    var $$activatedCollection = $$(["".concat(selector.TAB, ".").concat(className.ACTIVE), "".concat(selector.TAB, "[aria-selected=true]"), "".concat(selector.TAB, "[aria-expanded=true]"), "".concat(selector.PANE, "[aria-hidden=false]")].join(), _$ui).filter(function (node) {
      return node.parentNode === _$ui;
    }); //console.log("1. $activated >> ", $$activatedCollection);
    //Flush out any panes and normalise to tabs only.

    var $activatedTabs = $$activatedCollection.map(function ($el, i) {
      if ($el.classList.contains("ui__pane")) return $el.previousElementSibling;
      return $el;
    }); //console.log("2. $activatedTabs >> ", $activatedTabs);

    var $targetTab = $activatedTabs.filter(function ($el, i, nodes) {
      return i === nodes.indexOf($el);
    }); //console.log("3. $targetTab >> ", $targetTab);

    if ($targetTab.length > 1) window.console && console.warn("Malformed structure: You can not have more than one active pane declared on a singular accordion interface. Check the markup and any explicit classNames and ARIA properties in play. Only the first occurance will be enforced."); //Enforce any state classes to match the ARIA

    $$tabs.forEach(function ($tab, i) {
      $tab.classList[$tab === $targetTab[0] ? 'add' : 'remove']("state__active");
    }); //Apply ARIA

    clickHandler.call($targetTab[0], null, _$ui, $$tabs); //ARIA state management

    function clickHandler(event, _$accordion, _$tabs) {
      //let $$tabs = $$(selector.TAB, _$accordion).filter( (node, i) => node.parentNode === _$accordion),
      var $$tabs = $$(":scope > ".concat(selector.TAB), _$accordion),
          $target = this;

      _$tabs.forEach(function ($tab, i) {
        $tab.setAttribute("aria-selected", $tab === $target);
        $tab.setAttribute("aria-expanded", $tab === $target);
        $tab.setAttribute("aria-disabled", $tab === $target);
        $tab.nextElementSibling.setAttribute("aria-hidden", $tab !== $target);
      });

      return false;
    }


    return {
      create: function create() {
        console.log("create instance");
      },
      refresh: function refresh() {
        console.log("refresh instance");
      },
      destroy: function destroy() {
        console.log("destroy instance");
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

  var className$1 = {
    ACTIVE: "state__active",
    TRANSITION: "state__transition"
  };
  var selector$1 = {
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

    var _self = this; //fire INIT event handler if present
    //check events register and fire any relevent callbacks
    //1.


    var pubsub = new PubSub();
    var manifest = [];
    var eventsAPI = "pix8.click,pix8.transitionstart,pix8.transitionend,pix8.toggle,pix8.hide,pix8.show,pix8.initialised,pix8.create,pix8.refresh,pix8.destroy".split(","); //2.

    /*//const clickEvent = new Event("pix8.click"); //not supported in IE
    const clickEvent = document.createEvent('Event');
    clickEvent.initEvent('pix8.click', true, true);
    	$accordion.addEventListener("pix8.click", function(event) {
    	//TODO: needs to be API derived callback
    	//alert("Method 2 :: createEvent :: pix8.click");
    	console.log("Method 2 :: createEvent", this, " :pix8.click: ", event);
    });
    	const transitionendEvent = document.createEvent('Event');
    transitionendEvent.initEvent('pix8.transitionend', true, true);
    	$accordion.addEventListener("pix8.transitionend", function(event) {
    	//TODO: needs to be API derived callback
    	//alert("Method 2 :: createEvent :: pix8.transitionend");
    	console.log("Method 2 :: createEvent", this, " :pix8.transitionend: ", event);
    });*/
    // Different css class utilised as selector add `selector.ACCORDION` to the nominated root node so that dependent styles can be extrapolated

    if (!$accordion.classList.contains(selector$1.ACCORDION.slice(1))) $accordion.classList.add(selector$1.ACCORDION.slice(1)); // WAI ARIA accessibility support initilisation

    var a11y = new A11y($accordion); // Subscribe events
    //let $$toggles = $$(`${selector.TAB} > ${selector.TOGGLE}`, $accordion).filter( (node) => node.parentNode.parentNode === $accordion);

    var $$toggles = $$(":scope > ".concat(selector$1.TAB, " > ").concat(selector$1.TOGGLE), $accordion);
    $$toggles.forEach(function ($toggle, i) {
      $toggle.addEventListener("click", function (event) {
        //touchEnabled ? "touchend" : "click";
        event.stopPropagation();
        if (this.parentElement.classList.contains(className$1.ACTIVE)) return false; //fire pix8.CLICK event handler if present

        console.log("fire pix8.click >> ", _self, " :: ", this); //1.

        dispatch("pix8.click", [this]);
        pubsub.publish("pix8.click", [this]); //2.
        //$accordion.dispatchEvent(clickEvent);
        //$accordion.dispatchEvent.call(this, clickEvent);
        // unsubscribe("pix8.click");
        // pubsub.unsubscribe("pix8.click");

        render.call(this.parentElement, event, $accordion); //DEVNOTE: scope reasserted
      }, false);
    }); //let $$panes = $$(selector.PANE, $accordion).filter( (node) => node.parentNode === $accordion);

    var $$panes = $$(":scope > ".concat(selector$1.PANE), $accordion);
    $$panes.forEach(function ($pane) {
      $pane.addEventListener("transitionend", function (event) {
        var $tab = this.previousElementSibling,
            $pane = this;

        if ($pane.style.height && event.propertyName === "height") {
          $pane.style.height = null;
          $tab.classList.remove(className$1.TRANSITION);
        } //fire pix8.TRANSITIONEND event handler if present
        //console.log("fire pix8.transitionend >> ", _self, " :: ", this);			
        //1.


        dispatch("pix8.transitionend", [this]);
        pubsub.publish("pix8.transitionend", [this]); //2.
        //$accordion.dispatchEvent(transitionendEvent);
        //$accordion.dispatchEvent.call(this, transitionendEvent);
      }, false);
    }); // transitionstart still in Draft - would have to invoke in render() method; check for presence of transition style prop; check for presence of transition delay prop-if so compensate with setTimeout; fire event.
    // transitionstart would need to apply to both panes. the activated. and the one deactivate.
    // PRIVATE METHODS

    function render(event, _$accordion) {
      //let $$tabs = $$(selector.TAB, _$accordion).filter( (node, i) => node.parentNode === _$accordion),
      var $$tabs = $$(":scope > ".concat(selector$1.TAB), _$accordion),
          $target = this;
      $$tabs.forEach(function ($tab, i) {
        var $pane = $tab.nextElementSibling; // If tab/pane IS active set height explicitly; add the state__transition class; set the height explicitly to 0;

        if ($tab.classList.contains(className$1.ACTIVE)) {
          $pane.style.height = "".concat($pane.scrollHeight, "px");
          $pane.getBoundingClientRect(); //DEVNOTE: forced recomputation/reflow

          $tab.classList.add(className$1.TRANSITION);
          $tab.classList.remove(className$1.ACTIVE);
          $pane.style.height = "".concat(0, "px"); // Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed

          var hasTransition = window.getComputedStyle($pane, null).getPropertyValue("transition");

          if (hasTransition === "all 0s ease 0s") {
            $pane.style.height = null;
            $tab.classList.remove(className$1.TRANSITION);
          } // If tab/pane IS NOT active && our target; set height explicitly to 0; add the state__transition class; set the height explicitly to scrollheight; remove inline heights upon transitionends.

        } else {
          if ($tab === $target) {
            $pane.style.height = "".concat(0, "px");
            $tab.classList.add(className$1.ACTIVE, className$1.TRANSITION);
            $pane.style.height = "".concat($pane.scrollHeight, "px"); // Test for presence of css transition else transitionend event will not be fired and inline heights will not get removed

            var _hasTransition = window.getComputedStyle($pane, null).getPropertyValue("transition");

            if (_hasTransition === "all 0s ease 0s") {
              $pane.style.height = null;
              $tab.classList.remove(className$1.TRANSITION);
            }
          }
        }
      });
      return false;
    }

    var subscribe = function subscribe(
    /* String */
    _identifier,
    /* Function */
    _callback) {
      //register
      console.log("--2. subscribe--");
      if (!manifest[_identifier]) manifest[_identifier] = [];

      manifest[_identifier].push(_callback);

      return [_identifier, _callback];
    };

    var dispatch = function dispatch(
    /* String */
    _identifier) {
      var _args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      //publish
      if (!manifest[_identifier]) return;

      manifest[_identifier].forEach(function (callback) {
        callback.apply(_this, _args);
      });
    };

    function getPosition(_identifier) {
      return eventsAPI.indexOf(_identifier.toLowerCase());
    } // PUBLIC METHODS


    return {
      // EVENT API
      on: function on(_eventType, _callback) {
        //console.log("on() = ", _eventType);
        var index = getPosition(_eventType);
        !(index < 0) && subscribe(eventsAPI[index], _callback);
        !(index < 0) && pubsub.subscribe(eventsAPI[index], _callback);
        return this; // Permit function chaining
      },
      off: function off(_eventType) {
        var _callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        console.log("off() = ", _eventType);
        var index = getPosition(_eventType); //!(index < 0) && unsubscribe(eventsAPI[index], _callback);

        !(index < 0) && pubsub.unsubscribe(eventsAPI[index], _callback);
        return this; // Permit function chaining
      },
      // ACTIONS API
      toggle: function toggle() {
        console.log("TBC pane toggle");
        return this; // Permit function chaining
      },
      show: function show() {
        //activate //enable //open
        console.log("TBC pane activated");
        return this; // Permit function chaining
      },
      hide: function hide() {
        //deactivate //disable //close
        console.log("TBC pane deactivated");
        return this; // Permit function chaining
      },
      // LIFECYCLE API
      create: function create() {
        //mount
        console.log("TBC create instance"); //ACTION: programmatically create a new instance of the component

        return this; // Permit function chaining
      },
      render: function render() {
        console.log("TBC render instance"); //ACTION: issue instructions to re-draw/render the interface(component) - soft reset

        return this; // Permit function chaining
      },
      refresh: function refresh() {
        console.log("TBC refresh instance"); //ACTION: issue instructions to reinitialise and reinstantiate the component - hard reset

        return this; // Permit function chaining
      },
      destroy: function destroy() {
        console.log("TBC destroy instance"); //ACTION: destroy the component instance; undo/remove all DOM side-effects and event listeners

        return this; // Permit function chaining
      }
    };
  }

  return uiAccordion;

}));
