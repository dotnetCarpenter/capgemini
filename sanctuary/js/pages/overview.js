import doT from 'dot'
import { S, F } from '../sanctuary.js'
import { get } from '../fetch.js'
import {
  formatNorwegianDateWithTime,
  formatNorwegianDate,
  safeFormatDate,
  createDate
} from '../dates.js'

const formatDate = safeFormatDate (formatNorwegianDate)
const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)

const rowTmpl = document.getElementById ('rowTmpl').textContent
const renderFunction = doT.template (rowTmpl)
const rowInsertionPoint = document.getElementById ('rows')

const resource = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

const main = () => {
  get ({resource, headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}})
  .pipe (S.map (S.pipe ([transform, S.sortBy (S.prop ('id')), S.map (formatDates)])))
  .pipe (F.fork (renderError)
                (renderSpeedBumps))
}


function transform (responseData) {
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