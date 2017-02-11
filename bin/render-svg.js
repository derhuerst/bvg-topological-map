#!/usr/bin/env node
'use strict'

const h = require('vhtml')
const render = require('../render')
const data = require('../index.json')

process.stdout.write(render(h, data))
