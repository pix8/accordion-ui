# @pix8/ui-accordion


[![npm (scoped)](https://img.shields.io/npm/v/@pix8/ui-accordion.svg)](https://www.npmjs.com/package/@pix8/ui-accordion)
[![CircleCI](https://circleci.com/bb/pix8/npm.ui-accordion.svg?style=svg&circle-token=1087e02408bd932a6ad3430268cc484bd6735ba5)](https://circleci.com/bb/pix8/npm.ui-accordion)

## About

A no-thrills no-spills no-frills accordion UI implemented with plain vanilla JavaScript and fat-free; light with no external dependencies.

No embellishments. No configuration. This is not a plugin. Think more shim for the HTML equivalent of an accordion element - if such a thing existed. Non-intrusive. Unopinionated and standards compliant - specifically strictly abides by standard browser behaviours and complies with the [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion). WAI-ARIA compliance has been implemented as a separate ES6(ES2015) module and can be removed if so desired without breaking core UI functionality. Similarly the transition mechanics are encapsulated, supported by signposting and intended to be orchestrated exclusively from the donor CSS stylesheets.

Expensive, wasteful and lazy operations are avoided as a matter of principle; e.g. heights are NOT explicitly set and browser resize event is NOT constantly polled. DOM manipulation coverage is limited whenever possible and values reset or defaulted elegantly post-operation. Focus/blur management is handled natively by the correct semantic compositional application of HTML elements removing the overhead of extraneous handling with JavaScript.

Please note: keyboard interactivity involving the up/down arrow and home/end keys to augment tabular navigation have been opted out as these conflict with well established default browser behaviours assigned to these keys correlating to overflow scrolling. The inclusion of these keys are denoted as optional in the spec. This exclusion may be reviewed and revisited at a later stage.

## Example

[Demo - JS Fiddle](https://jsfiddle.net/jonathanbrincat/c1h6487k/199/) @v0.0.13

## Install
Install package from NPM into your project dependencies.

#### NPM
```bash
npm install @pix8/ui-accordion --save
```

#### Yarn
```bash
yarn add @pix8/ui-accordion
```

#### CDN
```html
https://unpkg.com/@pix8/ui-accordion@0.0.13/dist/index.umd.js
```
Note: package will be available off the global(window) namespace as `uiAccordion`.

All sources are obfuscated and minified.

## Usage
Accordion component is available as a javascript module. `import`, instantiate and consume.

```javascript
import Accordion from "@pix8/ui-accordion";

var $accordion = document.querySelector(".ui__accordion"); // You can use whatever selector and mechanism you so wish

new Accordion($accordion); // Instantiate each accordion instance by passing the relevant HTML DOM node as a parameter 
```

The markup should be structured and furnished with the following descriptive CSS classes i.e. semantic hooks. Please note the choosen elements in this example are purely arbitrary although it is strongly recommended that `ui__toggle` is allied to a `button` element to conform with the WAI-ARIA spec and to correctly attribute focus/blur natively(otherwise with the exception of an `a href`, it would be rendered unsupported).
```html
<dl class="ui__accordion">
	<dt class="ui__tab">
		<button class="ui__toggle">...</button>
	</dt>
	<dd class="ui__pane">
		...
	</dd>

	<dt class="ui__tab">
		<button class="ui__toggle">...</button>
	</dt>
	<dd class="ui__pane">
		...
	</dd>

	...
</dl>
```

(An example is retained in the package directory for guidance)

Styling bundled with this package are discreetly and quite deliberately limited to what is strictly necessary to make an accordion component work and to compliment driven behaviour. Any stylistic overtures should be implemented by the author at the consumption layer i.e. at application/project level - yes this includes any desired transitions and animated effects.

The footprint is kept intentionally minimal to relieve the cognitive investment in consuming this component. There is no configuration object or customisation available or on offer. And I intend to keep it this way. Consuming the accordion component is inspired by conventional and established wisdoms, simultaneous embracing both the KISS and DRY ethos. Why attempt to reinvent the wheel when you should just embrace standard web authoring practise? Makes no sense. Therefore if you want to selectively activate an accordion pane do so on the markup. Either add the enabling class or alternatively the presence of any of the applicable ARIA states will trigger a role of applied intention, and do this for you automagically with javascript. Of course I acknowledge there are limitations to this "Stalinist" approach - most pressing being the inflexibility in prescriptive css class declarations - however I will try to weed out any shortcomings over time.

## API
### Events
======= pix8.click
CRITERIA: when any toggle is clicked
- provided it isn't disabled
======= pix8.transitionStart
CRITERIA: when any pane begins a css transition
- provided the css transition property is present; compensate for transition-delay property if present
======= pix8.transitionEnd
CRITERIA: when any pane ends a css transition

======= pix8.toggle
CRITERIA: when any pane is activated or deactivate. non-discriminatory
======= pix8.show
CRITERIA: when a pane is activated and becomes visible
======= pix8.hide
CRITERIA: when a pane is deactivated and becomes invisible

======= pix8.initialised
CRITERIA: when script is primed and ready to accept component invocation
======= pix8.create
CRITERIA: when a new component has been invocated
======= pix8.render (soft reset)
CRITERIA: when a component has redrawn itself
======= pix8.refresh (hard reset)
CRITERIA: when a component has been re-initialised and re-invocated
======= pix8.destroy
CRITERIA: when a component has been destroyed


## Support
Quite frankly I'm not following any mantra here other than following best practise, using my initiative to research specific areas if there is doubt and applying my cool old wise developer's head. There is no bar set other than it should be compatible with most modern web browsers and devices. Such formalities will kill my buzz and bring back haunting memories of ie6/7/8 conformity from my development youth. Please feel free to chip in by launching an ticket on [Github](https://github.com/pix8/ui-accordion/issues) if you encounter an issue. Thanks.


### Possible improvements
* Lint routines
* Formulate and write tests
* Closer alignment to the web component spec(custom elements) and possible translation or forking
* Migrate event handling to event delegation
* Improve transition performance with transform3d
* Expose lifecycle API
* ~Expose events API~
* Persistant active pane for hard refresh or bookmarking(hash url? local storage?)
* Reapply package dependent styles to inline javascript injection on the elements concerned as oppose to internal stylesheet injection
* Seamless integration with MV* libraries - react, vue - removing the need to compose specialised derivatives of the same darn thing

### Future extensions
#### UI 101
accordion || concertina/collapsible || tabular

_These all share the same functionality(with discreet behavioural and cosmetic differences) and are siblings of the same UI family) - You do not need to produce separate implementations to achieve these interfaces. If you are then let this be your eureka moment to assist in intelligently dissecting UI and UX patterns so you don't repeat the mistakes of simply following the crowd. They can(and should) all spawn from one universal treatment.(In theory a carousel UI could be added to that family - however it would be a bit of a black sheep in the family so for now I will steer clear)_

_If you thought that was cool. This will blow your mind. Not only are all the aforementioned UI skeuomorphisms in fact one and the same but they are all basically the plural derivatives of another common UI pattern. They are simply collections of the 'visibility/state' toggle(or disclosure) UI; which is itself a direct relative to the popover UI(not to be confused with a tooltip UI), ...a drawer UI and a dialog UI - most recently the smart bods on the Bootstrap team have cottoned onto this relationship and implemented this mantra in their latest greatest version of Bootstrap so now hopefully, everyone will start to grep and wake up to such phenomenon(I remember trying to explain this concept to a collegue; once he looked at me as if I was mad)_

_I ultimately hope and aim to put this mantra of **UI polymorphism** into practise and ultimately this package represents the first inteprid steps on that journey_

* Concertina/Collapsible UI variant (shared from same codebase)
* Tabular UI variant (shared from same codebase)
* Toggle visibility functionality/behaviours(i.e. a [disclosure interface](http://w3c.github.io/aria-practices/#disclosure)) ringfenced and encapsulated into distinct reusable UI component and retrofitted back in
* Collection of UI components migrated into @pix8/ui-js (possibly as a monorepo)

## License

All I ask in return for publishing and maintaining this module is kudos and respect. 🤘 Peace out.
