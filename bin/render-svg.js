#!/usr/bin/env node
'use strict'

const h = require('vhtml')
const render = require('../render')

process.stdout.write(render(h) + '\n')
