import '../style.css'

import doT      from 'dot'
import overview from './pages/overview.js'

const register = {
  main () {console.debug ('page register')},
  mountElement: document.getElementById ('page-register')
}
const pageNotFound = {
  main () {console.error ('404: page not found')},
  mountElement: document.getElementById ('page-not-found')
}

const setHeader = () => {
  const render = doT.template (document.getElementById ('headerTmpl').textContent)
  document.querySelectorAll ('.header')
    .forEach (headerElement => { headerElement.innerHTML = render () })
}

//#region region ANIMATION **************
const animateOutClass = 'animate-backOutUp'
const animateInClass  = 'animate-backInDown'

const isAnimatingOut = element => element.classList.contains (animateOutClass)

const setAnimationHandler = element => {
  element.addEventListener ('animationend', () => {

    if (isAnimatingOut (element)) {
      element.classList.remove ('animate-animated', animateOutClass)
      element.classList.add    ('invisible', 'pointer-events-none')
    } else {
      element.classList.remove ('animate-animated', animateInClass, 'pointer-events-none')
    }

  })
}
//#endregion END ANIMATION **************

const routes = {
  ''         : overview,
  '#overview': overview,
  '#register': register,
  '#404'     : pageNotFound,
}

const getRoute = hash => (
  routes [hash] || routes ['#404']
)

const router = event => {
  const route        = new URL (event.newURL)
  const previousPage = event.oldURL && getRoute (new URL (event.oldURL).hash)
  const page         = getRoute (route.hash)

  // abort if the next page is the same as the previous
  if (previousPage === page) return

  page.main ()

  if (previousPage) {
    previousPage.mountElement.classList.add  ('animate-animated', animateOutClass)
  }
  page.mountElement.classList.add    ('animate-animated', animateInClass)
  page.mountElement.classList.remove ('invisible')
}

window.addEventListener("hashchange", router, false)

setHeader () // set head with navigation on all pages
document.querySelectorAll ('.page').forEach (setAnimationHandler) // set animationend cleanup on all pages
router ({newURL: window.location}) // animate to first page
