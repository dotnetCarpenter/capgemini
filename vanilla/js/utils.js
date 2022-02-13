const compose = f => g => x => f (g (x))

const pipe = (...fs) => x => fs.reduce ((x, f) => f (x), x)

const map = f => list => list.map (f)

const forEach = f => list => Array.prototype.forEach.call (list, f)

const animateCSS = (element, animation, prefix = 'animate-') => (
  // We create a Promise and return it
  new Promise ((resolve, reject) => {
    const animationName = `${prefix}${animation}`

    element.classList.add (`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    const handleAnimationEnd = event => {
      event.stopPropagation ()
      element.classList.remove (`${prefix}animated`, animationName)
      resolve ()
    }

    element.addEventListener ('animationend', handleAnimationEnd, {once: true})
  })
)


export {
	map,
	pipe,
	compose,
	forEach,
	animateCSS
}
