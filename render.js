'use strict'

const common = `
#lines .line {
	fill: none;
	stroke-width: 1;
}

#stations .station {
	fill: none;
	stroke-width: 1;
}

#stations #interchanges .station {
	fill: #fff;
	stroke: #000;
	stroke-width: .5;
}

#stations .station.wifi {
	/* fill: #f9e800; */
}
`

const renderStyles = (data) => {
	let css = common

	for (let line of Object.keys(data.lines)) {
		const color = data.lines[line].color
		css += `
#lines .line.${line},  #stations .station.${line}  {stroke: ${color}}`
	}

	return css
}

const renderDefs = (h, data) => {
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

const renderLabel = (h, id, [x, y]) => {
	return h('use', {
		class: 'label ' + id,
		'xlink:href': '#label-' + id,
		href: '#label-' + id,
		transform: `translate(${x}, ${y})`
	})
}

const renderLabels = (h, data) => {
	const r = []
	for (let id of Object.keys(data.labels)) {
		const label = data.labels[id]
		for (let position of label.positions) {
			r.push(renderLabel(h, id, position))
		}
	}
	return r
}

const renderLine = (h, id, line) => {
	return h('path', {
		id: 'line-' + id,
		class: 'line ' + id,
		d: line.shape
	})
}

const renderLines = (h, data) => {
	const r = []
	for (let id of Object.keys(data.lines)) {
		const line = data.lines[id]
		r.push(renderLine(h, id, line))
	}
	return r
}

const renderStation = (h, id, station) => {
	return h('path', {
		id: 'station-' + id,
		'data-id': id,
		class: 'station ' + station.lines.join(' ') + (station.wifi ? ' wifi' : ''),
		d: station.shape
	})
}

const renderInterchanges = (h, data) => {
	const r = []
	for (let id of Object.keys(data.stations)) {
		const station = data.stations[id]
		if (!station.interchange) continue
		r.push(renderStation(h, id, station))
	}
	return r
}

const renderStops = (h, data) => {
	const r = []
	for (let id of Object.keys(data.stations)) {
		const station = data.stations[id]
		if (station.interchange) continue
		r.push(renderStation(h, id, station))
	}
	return r
}

const render = (h, data) => {
	return h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		width: data.width,
		height: data.height,
		viewBox: `0 0 ${data.width} ${data.height}`
	}, [
		h('style', {}, renderStyles(data)),
		h('defs', {}, renderDefs(h, data)),
		h('g', {id: 'labels'}, renderLabels(h, data)),
		h('g', {id: 'lines'}, renderLines(h, data)),
		h('g', {id: 'stations'}, [
			h('g', {id: 'interchanges'}, [
				renderInterchanges(h, data)
			]),
			...renderStops(h, data)
		])
	])
}

module.exports = render
