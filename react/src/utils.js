const compose = f => g => x => f (g (x))

const pipe = (...fs) => x => fs.reduce ((x, f) => f (x), x)

const map = f => list => list.map (f)

const forEach = f => list => Array.prototype.forEach.call (list, f)

export {
	map,
	pipe,
	compose,
	forEach,
}
