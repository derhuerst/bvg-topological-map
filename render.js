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

const renderLabelDef = (h, id, label) => {
	return h('g', {
		id: 'label-' + id
	}, ([
		h('path', {
			fill: label.bg, d: label.body
		})
	]).concat(label.caption.map((part) =>
		h('path', {
			fill: label.fg, d: part
		})
	)))
}

const renderLabelDefs = (h, labels) => {
	const r = []
	for (let id of Object.keys(labels)) {
		const label = labels[id]
		r.push(renderLabelDef(h, id, label))
	}
	return r
}

const renderLabelUse = (h, id, label, [x, y]) => {
	return h('use', {
		class: 'label ' + id,
		'xlink:href': '#label-' + id,
		href: '#label-' + id,
		transform: `translate(${x}, ${y})`
	})
}

const renderLabelUses = (h, labels) => {
	const r = []
	for (let id of Object.keys(labels)) {
		const label = labels[id]
		for (let position of label.positions)
			r.push(renderLabelUse(h, id, label, position))
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

const renderLines = (h, lines) => {
	const r = []
	for (let id of Object.keys(lines)) {
		const line = lines[id]
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

const renderInterchanges = (h, stations) => {
	const r = []
	for (let id of Object.keys(stations)) {
		const station = stations[id]
		if (!station.interchange) continue
		r.push(renderStation(h, id, station))
	}
	return r
}

const renderStops = (h, stations) => {
	const r = []
	for (let id of Object.keys(stations)) {
		const station = stations[id]
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
		h('defs', {}, renderLabelDefs(h, data.labels)),
		h('g', {id: 'labels'}, renderLabelUses(h, data.labels)),
		h('g', {id: 'lines'}, renderLines(h, data.lines)),
		h('g', {id: 'stations'}, [
			h('g', {id: 'interchanges'}, [
				renderInterchanges(h, data.stations)
			]),
			...renderStops(h, data.stations)
		])
	])
}

module.exports = render
