import { S } from '../sanctuary.js'
import {
  formatNorwegianDate,
  safeFormatDate,
  createDate
} from '../dates.js'

import {
  forEach,
  animateCSS
} from '../utils.js'

const formatDate = safeFormatDate (formatNorwegianDate)

const form = document.getElementById ('registration')
const submitButton = form.querySelector ('input[type="submit"]')
const nameElement = form.querySelector ('[name="name"]')
const dateElement = form.querySelector ('[name="date"]')
const notificationElement = document.querySelector ('.notification')

const disableButton = button => {
  button.ariaDisabled = "true"
  button.disabled = true
}

const enableButton = button => {
  button.ariaDisabled = "false"
  button.disabled = false
}

const setDefault = forEach (element => {
  element.value = element.defaultValue
})

const showNotification = message => {
  notificationElement.querySelector ('.notification__message').textContent = String (message)
  notificationElement.classList.add ('animate-backInDown')
  notificationElement.classList.remove ('hidden')
}

const hideNotification = async () => {
  if (notificationElement.classList.contains ('hidden')) return

  await animateCSS (notificationElement, 'animate-backOutDown')

  notificationElement.classList.add ('hidden')
  notificationElement.querySelector ('.notification__message').textContent  = ''
}

const cleanupForm = () => {
  setDefault (form.elements)

  hideNotification ()

  enableButton (submitButton)
}

const validation = event => {
  event.preventDefault ()
  disableButton (submitButton)

  // Dato skal velges fra en kalender. Format: dd/mm/åååå
  // very strange requirement... let's log the date as dd/mm/åååå
  // and show a nofitication
  const date = createDate (dateElement.value)
  if (S.isJust (date)) {
    console.debug (S.show (date))

    const dateString = S.compose (s => s.replaceAll ('.', '/'))
                                 (formatDate)
                                 (date)

    console.debug (S.show (dateString))

    showNotification (`Du registrerte ${nameElement.value} den ${dateString}`)
  }

  setTimeout (cleanupForm, 3000)
}

const main = () => {
  form.addEventListener ('submit', validation)
}

const onUnmounted = () => {
  form.removeEventListener ('submit', validation)
  cleanupForm ()
}

export default {
  main,
  onUnmounted,
  mountElement: document.getElementById ('page-register')
}
