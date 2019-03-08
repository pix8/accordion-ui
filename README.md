# @pix8/ui-accordion


[![npm (scoped)](https://img.shields.io/npm/v/@pix8/ui-accordion.svg)](https://www.npmjs.com/package/@pix8/ui-accordion)
[![CircleCI](https://circleci.com/bb/pix8/npm.ui-accordion.svg?style=svg&circle-token=1087e02408bd932a6ad3430268cc484bd6735ba5)](https://circleci.com/bb/pix8/npm.ui-accordion)

## About

A no-thrills no-spills no-frills accordion UI implemented with plain vanilla JavaScript.

No embellishments. No configuration. This is not a plugin. Think more shim for the HTML equivalent of an accordion element - if such a thing existed. Non-intrusive. Unopinionated and standards compliant - specifically strictly abides by standard browser behaviours and complies with the [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion). WAI-ARIA compliance has been implemented as a separate ES6(ES2015) module and can be removed if so desired without breaking core UI functionality. Similarly the transition mechanics are encapsulated, supported by signposting and intended to be orchestrated exclusively from the donor CSS stylesheets.

Please note: keyboard interactivity involving the up/down arrow and home/end keys to augment tabular navigation have been opted out as these conflict with well established default browser behaviours assigned to these keys correlating to overflow scrolling. The inclusion of these keys are denoted as optional in the spec. This may be reopened and reviewed at a later stage.

## Example

[JS Fiddle](https://jsfiddle.net/jonathanbrincat/c1h6487k/195/)

## Install
Install package from NPM into your project dependencies.

```bash
npm install @pix8/ui-accordion --save
```

## Usage
Accordion component is available as a javascript module. `import`, instantiate and consume.

```javascript
import Accordion from "@pix8/ui-accordion";

new Accordion(".ui__accordion");
```

The markup should be supplemented/denoted with the following prescriptive CSS classes i.e. semantic hooks. Please note the choosen elements in this example are purely suggestive although it is strongly recommended that `ui__toggle` is allied to a `button` element to conform with the WAI-ARIA spec and to correctly attribute focus/blur natively(otherwise with the exception of an `a href`, it would be rendered unsupported).
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

### Possible improvements
* Review and improve instantiation paradigm
* Expose public API
* Migrate event handling to event delegation
* Expose an events API
* Closer alignment to the web component spec(custom elements)
