import 'animate.css'
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

const header = doT.template (document.getElementById ('headerTmpl').textContent)
document.querySelectorAll ('.header')
  .forEach (headerElement => { headerElement.innerHTML = header () })

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
    page.mountElement.classList.remove ('invisible', 'pointer-events-none')
    page.main ()
  } else {
    routes['#404'].main ()
  }

  if (previousPage) {
    previousPage.mountElement.classList.add ('invisible', 'pointer-events-none')
  }

  previousPage = page
}

window.addEventListener("hashchange", router, false)
router ()
