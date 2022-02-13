import doT from 'dot'
import {
  formatNorwegianDateWithTime,
  formatNorwegianDate,
  safeFormatDate,
  createDate
} from '../dates.js'

import {
  map,
  pipe
} from '../utils.js'

const formatDate = safeFormatDate (formatNorwegianDate)
const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)

const rowTmpl = document.getElementById ('rowTmpl').textContent
const renderFunction = doT.template (rowTmpl)
const rowInsertionPoint = document.getElementById ('rows')

const endpoint = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

const main = () => {
  fetch (endpoint, {headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}})
    .then (response => {
      if (!response.ok) {
        throw new Error (`HTTP error! status: ${response.status}`)
      }
      return response.json ()
    })
    .then (pipe (tranform, sort (sortSpeedBumps), map (formatDates), renderSpeedBumps))
    .catch (renderError)
}


function tranform (responseData) {
  return responseData?.objekter?.map (item => ({
    status: 'Registrert',
    id: item.id,
    href: item?.href,
    name: item?.metadata?.type?.navn,
    version: item?.metadata?.versjon,
    startDate: createDate (item?.metadata?.startdato),
    lastModified: createDate (item?.metadata?.sist_modifisert),
  }))
}

function sort (comparer) {
  return list => list.sort (comparer)
}

function sortSpeedBumps (x1, x2) {
  return x1.startDate < x2.startDate
    ? -1
    : x1.startDate > x2.startDate
      ? 1
      : 0
}

function formatDates (speedBump) {
  return {
    ...speedBump,
    startDate: formatDate (speedBump.startDate),
    lastModified: formatDateTime (speedBump.lastModified),
  }
}

function renderSpeedBumps (speedBumps) {
  if (speedBumps) {
    rowInsertionPoint.innerHTML = renderFunction (speedBumps)
  } else {
    renderError (new Error ('Fant ingen fartsdempere'))
  }
}

function renderError (error) {
  const errorTmpl = document.getElementById ('errorTmpl').textContent

  rowInsertionPoint.innerHTML = doT.template (errorTmpl) (error)
}

export default {
  main,
  onUnmounted () {},
  mountElement: document.getElementById ('page-overview')
}