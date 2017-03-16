# bvg-topological-map 🔜

**The official public transport map for Berlin**, as an SVG. Every station and every line is tagged.

[![build status](https://img.shields.io/travis/derhuerst/bvg-topological-map.svg)](https://travis-ci.org/derhuerst/bvg-topological-map)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/bvg-topological-map.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)

[![topological BVG map](https://rawgit.com/derhuerst/bvg-topological-map/gh-pages/map.svg)](https://rawgit.com/derhuerst/bvg-topological-map/gh-pages/map.svg)

![ISC-licensed](https://img.shields.io/github/license/derhuerst/bvg-topological-map.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Usage

Embed [`map.svg`](https://raw.githubusercontent.com/derhuerst/bvg-topological-map/gh-pages/map.svg) directly into your HTML. You can change the look of the map in your CSS:

```css
#my-map #stations .station {
	stroke: red;
}
#my-map #interchanges .station {
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
