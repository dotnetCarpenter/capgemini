import '../assets/style.css'

import doT      from 'dot'
import overview from './pages/overview.js'
import register from './pages/registration.js'

const pageNotFound = {
  main () {console.error ('404: page not found')},
  onUnmounted () {},
  mountElement: document.getElementById ('page-not-found')
}

const setInnerHtml = f => elements => {
  elements.forEach (headerElement => { headerElement.innerHTML = f () })
}

const setHeaderAndFooter = () => {
  // logo in header needs path to favicon and the path is changed by vite
  setInnerHtml (doT.template (document.getElementById ('headerTmpl').textContent).bind (doT, import.meta.env.BASE_URL))
               (document.querySelectorAll ('.header'))

  setInnerHtml (doT.template (document.getElementById ('footerTmpl').textContent))
               (document.querySelectorAll ('.footer'))
  }

//#region region ANIMATION **************
const animateOutClass = 'animate-backOutUp'
const animateInClass  = 'animate-backInDown'

const isAnimatingOut = element => element.classList.contains (animateOutClass)

const setAnimationHandler = element => {
  element.addEventListener ('animationend', () => {

    if (isAnimatingOut (element)) {
      element.classList.remove ('animate-animated', animateOutClass)
      element.classList.add    ('hidden-force', 'pointer-events-none')
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
    previousPage.onUnmounted ()
  }

  page.mountElement.classList.add    ('animate-animated', animateInClass)
  page.mountElement.classList.remove ('hidden-force')
}

window.addEventListener("hashchange", router, false)

setHeaderAndFooter () // set head with navigation on all pages
document.querySelectorAll ('.page').forEach (setAnimationHandler) // set animationend cleanup on all pages
router ({newURL: window.location}) // animate to first page
