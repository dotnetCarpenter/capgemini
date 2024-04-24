const forEach = f => list => Array.prototype.forEach.call (list, f)

const animateCSS = (element, animation) => (
  new Promise ((resolve, _) => {
    const animationName = animation

    element.classList.add (`animate-animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    const handleAnimationEnd = event => {
      event.stopPropagation ()
      element.classList.remove (`animate-animated`, animationName)
      resolve ()
    }

    element.addEventListener ('animationend', handleAnimationEnd, {once: true})
  })
)


export {
	forEach,
	animateCSS
}
