# @pix8/ui-accordion

## Vanilla javascript accordion

[![npm (scoped)](https://img.shields.io/npm/v/@pix8/ui-accordion.svg)](https://www.npmjs.com/package/@pix8/ui-accordion)
[![CircleCI](https://circleci.com/bb/pix8/npm.ui-accordion.svg?style=svg&circle-token=1087e02408bd932a6ad3430268cc484bd6735ba5)](https://circleci.com/bb/pix8/npm.ui-accordion)

[JS Fiddle](https://jsfiddle.net/jonathanbrincat/c1h6487k/171/)

### Introduction
Simple UI example with absolutely no embellishments. Although not strict would still semantically comply with accessiblity standards. Although a positive enhancement would still be further refinement of accessibility criteria; ~~assignment of the appropiate ARIA metadata~~; defining keyboard interactivity according to WAI-ARIA guidelines.

A further possible enhancement would be to incorporate auxilary classes to transition state so these can be tracked and flagged in stylesheets.

Migrate event handling to event delegation

### Usage

```javascript
new uiAccordion(".ui__accordion");
```

Note you can choose to prescribe the suggestive markup or not however the node hierarchy must be preserved for obvious reasons.
