import '../style.css'
import doT from 'dot'
import {
  formatNorwegianDateWithTime,
  formatNorwegianDate,
  safeFormatDate
} from './dates.js'

const compose = f => g => x => f (g (x))
const formatDate = safeFormatDate (formatNorwegianDate)
const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)
const tmpl = document.querySelector ('#rowTmpl').textContent
const renderFunction = doT.template (tmpl)
const rowInsertionPoint = document.querySelector ('#rows')

const endpoint = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

fetch (endpoint, {headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}})
  .then (response => {
    if (!response.ok) {
      throw new Error (`HTTP error! status: ${response.status}`)
    }
    return response.json ()
  })
  .then (compose (renderSpeedBumps)
                 (tranform))
  .catch (renderError)


function tranform (responseData) {
  return responseData?.objekter?.map (item => ({
    status: 'Registrert',
    id: item.id,
    href: item?.href,
    name: item?.metadata?.type?.navn,
    version: item?.metadata?.versjon,
    startDate: formatDate (item?.metadata?.startdato),
    lastModified: formatDateTime (item?.metadata?.sist_modifisert),
  }))
}

function renderSpeedBumps (speedBumps) {
  if (speedBumps) {
    rowInsertionPoint.innerHTML = renderFunction (speedBumps)
  } else {
    renderError (new Error ('Fant ingen fartsdempere'))
  }
}

function renderError (error) {
  const errorTmpl = document.querySelector ('#errorTmpl').textContent

  rowInsertionPoint.innerHTML = doT.template (errorTmpl) (error)
}
