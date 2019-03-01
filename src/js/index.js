'use strict';

import Accordion from "./accordion"


document.documentElement.classList.remove("client__no-js");

var test = new Accordion(".ui__accordion");
//TODO: change this to work off a nominated root DOM node passed in as an argument. This abstracts the process of iteration and multiple instances and clearly separates such concerns away from the UI.
// I think this utimately a better approach.
//var instance1 = new Accordion(element1);
//var instance2 = new Accordion(element2);
