import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

//import BulkDialog from '../src/react/components/bulk-dialog/BulkDialog.jsx' //DEFUNCT

import Toggle from '../src/react/components/ui/toggle'
import Tabs from '../src/react/components/ui/tabs'
import Collapsible from '../src/react/components/ui/collapsible'
import Accordion from '../src/react/components/ui/accordion'
import Dialog from '../src/react/components/ui/dialog'
import Modal from '../src/react/components/ui/modal'
import Carousel from '../src/react/components/ui/carousel'
import Breadcrumbs from '../src/react/components/ui/breadcrumbs'
import Tooltip from '../src/react/components/ui/tooltip'
import Dropdown from '../src/react/components/ui/dropdown'
import Lazyload from '../src/react/components/ui/lazyload'
import Spinner from '../src/react/components/ui/spinner'
import Videoplayer from '../src/react/components/ui/videoplayer'

import Typeahead from '../src/react/components/webform/typeahead'
import Fileupload from '../src/react/components/webform/fileupload'
import Calendar from '../src/react/components/webform/calendar'
import NumericStepper from '../src/react/components/webform/numericStepper'
import Password from '../src/react/components/webform/password'
import Select from '../src/react/components/webform/select'
import Textarea from '../src/react/components/webform/textarea'

import Pagination from '../src/react/modules/dataset/pagination'

// import helpIcon from '../src/png/help-icon.png';
let helpIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAwNS8xOC8xMdotyE8AAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAABgUlEQVQ4jaWTOUsDQRTHfxtj2OzOJmLwKMQDBFN4gVoJQcXC0k4QBXub5JPEQnsPFKz0A0QRsRAsbRQEwSoe0TXxiOLu2CSTrBtR8Q8D773/wTyG0aSUrOzGk0CavyG1OH22pC3v9CSF0Zjuj08RrAv92n1+ecT13UUqCKQ72wbRNBfHLQJwk7vEzmc9hoZIK82xLtV3dwxzfXeRDgIIYeHIVwBuc1c8Fm6ZSWQ8AduHk7jynaZYu2ceAHDcojp2PuszA8wkMtj5rEcLEAT4KDUArnRUvXWQAGB27FBx1VoV4FQNhSnYPBgFwDKjFJ4fFSdxPNqqgFc1iEQFkajAth/IP90zN35cCZCOR1sJkN5UgMKTzfzEieo39kcwhenT+laoXNdV9fr+EIahI6zQzyuUoYcDrO0NABA2QphWoKbO9wplvDwXWZg8BWA100dY+CSVAJA1KPmlrqVRAX7oRh2rmV5Vf4cAkMrdvPkI06on1qITa9ExrXofX/KktP9+5096Fa8qjs5R2QAAAABJRU5ErkJggg==';

//import DigitalCommons, { Accordion, Breadcrumbs, Carousel, Dataset } from '../src/react'

//import '../src/sass/commons.scss'


storiesOf('Digital Commons UI', module)
	//CONTENT COMPONENTS
	.add('Toggle', () => (
		<Toggle />
	))

	.add('Tabs', () => (
		<Tabs />
	))

	.add('Collapsible', () => (
		<Collapsible />
	))
	.add('Accordion', () => (
		<Accordion />
	))

	.add('Dialog', () => (
		<Dialog />
	))

	.add('Modal', () => (
		<Modal />
	))

	.add('Carousel', () => (
		<Carousel />
	))

	.add('Tooltip', () => (
		<div>
			<span>Hover over the icon to see a tooltip. </span>
			<Tooltip image={helpIcon} text="We need a sustainable, inclusive, and trustworthy digital future, where individuals and institutions can share data in ways that create economic and social value without jeopardizing privacy."/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<span>And here is another example of a tooltip. </span>
			<Tooltip image={helpIcon} text="Tooltips are exposed and triggered when hovering over, typically, a question mark icon."/>
		</div>
	))

	.add('Breadcrumbs', () => (
		<Breadcrumbs />
	))

	.add('Dropdown', () => (
		<Dropdown />
	))

	.add('Lazyload', () => (
		<Lazyload />
	))

	.add('Pagination', () => (
		<Pagination />
	))

	.add('Spinner', () => (
		<Spinner />
	))

	.add('Videoplayer', () => (
		<Videoplayer />
	))

	//WEFORM COMPONENTS
	.add('Typeahead', () => (
		<Typeahead />
	))

	.add('Calendar', () => (
		<Calendar />
	))

	.add('Fileupload', () => (
		<Fileupload />
	))

	.add('NumericStepper', () => (
		<NumericStepper />
	))

	.add('Password', () => (
		<Password />
	))

	.add('Select', () => (
		<Select />
	))

	.add('Textarea', () => (
		<Textarea />
	))

	/*
	.add('default', () => (
		<BulkDialog data-js-react-bulk-dialog data-options="%7B%0A%09%22checkbox%22%3A%20%22Notify%20me%20via%20email%20once%20it's%20complete.%22%2C%0A%09%22email%22%3A%20%22roger.smith%40qz.com%22%2C%0A%09%22cta%22%3A%20%7B%0A%09%09%22closed%22%3A%20%7B%0A%09%09%09%22text%22%3A%20%22Closed%22%2C%0A%09%09%09%22action%22%3A%20%22toggle()%22%0A%09%09%7D%2C%0A%09%09%22opened%22%3A%20%7B%0A%09%09%09%22text%22%3A%20%22Notify%20me%22%2C%0A%09%09%09%22action%22%3A%20%22http%3A%2F%2Fnotify.me.test.page.com%2F%22%0A%09%09%7D%0A%09%7D%0A%7D%0A" />
	));*/
