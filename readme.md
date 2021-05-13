# bvg-topological-map 🔜

**The official public transport map for Berlin**, as an SVG. Every station and every line is tagged.

*Note:* **This dataset does not reflect the current BVG transit map.** See [#7](https://github.com/derhuerst/bvg-topological-map/issues/7) for a guide on how to bring it up to date.

[![build status](https://img.shields.io/travis/derhuerst/bvg-topological-map.svg)](https://travis-ci.org/derhuerst/bvg-topological-map)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/bvg-topological-map.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)

[![topological BVG map](https://derhuerst.github.io/bvg-topological-map/map.svg)](https://derhuerst.github.io/bvg-topological-map/map.svg)

![ISC-licensed](https://img.shields.io/github/license/derhuerst/bvg-topological-map.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)


## Usage

Embed [`map.svg`](https://derhuerst.github.io/bvg-topological-map/map.svg) directly into your HTML. You can change the look of the map in your CSS:

```css
#my-map #stations .station {
	stroke: red;
}
#my-map #stations .station.interchange {
	fill: red;
}
#my-map #station-900000040101 {
	display: none;
}
#my-map #lines .line {
	stroke-width: 3;
}
#my-map #labels .label.U7 {
	opacity: .5;
}
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/bvg-topological-map/issues).
