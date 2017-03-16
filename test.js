'use strict'

const fs = require('fs')
const path = require('path')
const test = require('tape')
const cheerio = require('cheerio')
const stations = require('vbb-stations')

const map = fs.readFileSync(path.join(__dirname, 'dist/map.svg'))
const $ = cheerio.load(map)

test('every station has a valid id', (t) => {
	const els = Array.from($('.station'))
	t.plan(els.length)

	for (let el of els) {
		const id = el.attribs['data-id']
		const [station] = stations(id)
		t.ok(station, `station ${id} does not exist`)
	}
})
