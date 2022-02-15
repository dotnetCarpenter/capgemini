//    compose :: (b -> c) -> (a -> b) -> a -> c
const compose = f => g => x => f (g (x))

//    pipe :: Rest (a -> b) -> a -> b
const pipe = (...fs) => x => fs.reduce ((x, f) => f (x), x)

//    pipeAsync :: Rest (a -> b) -> Promise -> b
const pipeAsync = (...as) => x => (
	as.reduce ((x, a) => Promise.resolve (x).then (a), x)
)

//    map :: (a -> b) -> Array a -> Array b
const map = f => list => list.map (f)

//    forEach :: length m, Array m => (a -> Void) -> m a -> Void
const forEach = f => list => Array.prototype.forEach.call (list, f)

//    sort :: (a -> a -> b) -> Array a -> Array a
const sort = comparer => list => list.sort (comparer)

export {
	compose,
	forEach,
	map,
	pipe,
	pipeAsync,
	sort,
}


// TODO: move test to unit test
// test pipeAsync
// cat utils.js | node --input-type module
// test ()
// async function test () {
// 	const f = await pipeAsync (
// 		Number,
// 		res => Promise.resolve (res + 100),
// 		res => res.toString (),
// 	)

// 	// https://catchjs.com/Docs/AsyncAwait
// 	const a = await pipeAsync (
// 		Number,
// 		res => Promise.reject (new Error ('reject hello world')),
// 		res => res.toString (),
// 	)

// 	const b = await pipeAsync (
// 		Number,
// 		res => {throw new Error ('throw hello world')},
// 		res => res.toString (),
// 	)

// 	const result1 = await f ('1')
// 	console.debug ('result1', result1)

// 	try {
// 		const result = await a ('1')
// 		console.debug ('result a', result)
// 	} catch (error) {
// 		console.debug ('error a', error.message)
// 	}

// 	try {
// 		const result = await b ('1')
// 		console.debug ('result b', result)
// 	} catch (error) {
// 		console.debug ('error b', error.message)
// 	}
// }