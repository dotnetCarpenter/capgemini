import 'animate.css'
import '../style.css'

import overview from './pages/overview.js'

const register = {
  main () {console.debug ('page register')},
  mountElement: document.querySelector ('#page-register')
}
const pageNotFound = {
  main () {console.error ('404: page not found')},
  mountElement: document.querySelector ('#page-not-found')
}

const routes = {
  ''         : overview,
  '#overview': overview,
  '#register': register,
  '#404'     : pageNotFound,
}
let previousPage
const router = event => {
  const page = routes[window.location.hash]

  if (page) {
    page.mountElement.classList.remove ('invisible')
    page.main ()
  } else {
    routes['#404'].main ()
  }

  if (previousPage) {
    previousPage.mountElement.classList.add ('invisible')
  }

  previousPage = page
}

window.addEventListener("hashchange", router, false)
router ()
