'use strict'

const data = require('.')

const common = `
#lines .line {
	fill: none;
	stroke-width: 1;
}

#stations .station {
	fill: none;
	stroke-width: 1;
}

#stations .station.interchange {
	fill: #fff;
	stroke: #000;
	stroke-width: .5;
}

#stations .station.wifi {
	/* fill: #f9e800; */
}
`

const renderStyles = (h, opt, data) => {
	let css = common

	for (let line of Object.keys(data.lines)) {
		const color = data.lines[line].color
		css += `
#lines .line.${line}, #stations .station.${line} {stroke: ${color}}
#stations .station.interchange.${line} {stroke: #000}`
	}

	return css
}

const renderDefs = (h, opt, data) => {
	const defs = []
	for (let id of Object.keys(data.labels)) {
		const label = data.labels[id]
		defs.push(h('g', {
			id: 'label-' + id
		}, ([
			h('path', {
				fill: label.bg, d: label.body
			}),
			...label.caption.map((part) => {
				return h('path', {
					fill: label.fg, d: part
				})
			})
		])))
	}

	return defs
}

const labelProps = (h, id, [x, y]) => ({
	class: 'label ' + id,
	'xlink:href': '#label-' + id,
	href: '#label-' + id,
	transform: `translate(${x}, ${y})`
})

const renderLabels = (h, opt, data) => {
	const r = []
	for (let id of Object.keys(data.labels)) {
		const label = data.labels[id]
		for (let position of label.positions) {
			r.push(h('use', opt.labelProps(h, id, position)))
		}
	}
	return r
}

const lineProps = (h, id, line) => ({
	id: 'line-' + id,
	class: 'line ' + id,
	d: line.shape
})

const renderLines = (h, opt, data) => {
	const r = []
	for (let id of Object.keys(data.lines)) {
		const line = data.lines[id]
		r.push(h('path', opt.lineProps(h, id, line)))
	}
	return r
}

const stationProps = (h, id, station) => {
	let cls = 'station ' + station.lines.join(' ')
	if (station.wifi) cls += ' wifi'
	if (station.interchange) cls += ' interchange'
	return {
		id: 'station-' + id,
		'data-id': id,
		class: cls,
		d: station.shape
	}
}

const renderStations = (h, opt, data) => {
	const r = []
	for (let id of Object.keys(data.stations)) {
		const station = data.stations[id]
		r.push(h('path', opt.stationProps(h, id, station)))
	}
	return r
}

const defaults = {
	renderStyles,
	renderDefs,
	labelProps,
	renderLabels,
	lineProps,
	renderLines,
	stationProps,
	renderStations
}

const render = (h, opt = {}) => {
	opt = Object.assign({}, defaults, opt)

	return h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		width: data.width,
		height: data.height,
		viewBox: `0 0 ${data.width} ${data.height}`
	}, [
		h('style', {}, opt.renderStyles(h, opt, data)),
		h('defs', {}, opt.renderDefs(h, opt, data)),
		h('g', {id: 'labels'}, opt.renderLabels(h, opt, data)),
		h('g', {id: 'lines'}, opt.renderLines(h, opt, data)),
		h('g', {id: 'stations'}, opt.renderStations(h, opt, data))
	])
}

render.defaults = defaults
module.exports = render
