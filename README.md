# Vanilla javascript accordion

[JS Fiddle](https://jsfiddle.net/jonathanbrincat/c1h6487k/171/)

## Introduction
Simple UI example with absolutely no embellishments. Although not stringent would still sematically comply with accessiblity standards. Although a positive enhancement would still be further refinement of accessibility criteria; assignment of the appropiate ARIA metadata; defining keyboard interactivity according to WAI-ARIA guidelines.

Next release will address the default open pane scenario(likely allied to presence of aria-selected attribute and/or state class - although might remove the state class altogether and use the aria-selected attribute in place).

A further possible enhancement would be to incorporate auxilary classes to transition state so these can be tracked and flagged in stylesheets.

Migrate event handling to event delegation

## Usage

```javascript
new uiAccordion(".ui__accordion");
```

Note you can choose to prescribe the suggestive markup or not however the node hierarchy must be preserved for obvious reasons.
