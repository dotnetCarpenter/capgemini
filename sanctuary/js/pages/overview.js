import doT from 'dot'
import { S, F, $ } from '../sanctuary.js'
import { get } from '../fetch.js'
import {
  formatNorwegianDateWithTime,
  formatNorwegianDate,
  safeFormatDate,
  createDate
} from '../dates.js'

const rowTmpl = document.getElementById ('rowTmpl').textContent
const renderFunction = doT.template (rowTmpl)
const rowInsertionPoint = document.getElementById ('rows')

//    formatDate :: Maybe Date -> String
const formatDate = safeFormatDate (formatNorwegianDate)

//    formatDateTime :: Maybe Date -> String
const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)

//    createSpeedBump :: StrMap -> StrMap
const createSpeedBump = data => ({
  status: 'Registrert',
  id: data.id,
  href: data?.href,
  name: data?.metadata?.type?.navn,
  version: data?.metadata?.versjon,
  startDate: createDate (data?.metadata?.startdato),
  lastModified: createDate (data?.metadata?.sist_modifisert),
})

//    transform :: Object -> Maybe (Array SpeedBump)
const transform = S.pipe ([
  S.get (S.is ($.Array ($.Unknown))) ('objekter'),
  S.map (S.map (createSpeedBump))
])

//    formatDates :: SpeedBump -> StrMap<SpeedBump>
const formatDates = speedBump => ({
  ...speedBump,
  startDate: formatDate (speedBump.startDate),
  lastModified: formatDateTime (speedBump.lastModified),
})

//    transformDataToHtmlOrError :: Object -> Either Error Html
const transformDataToHtmlOrError = S.pipe ([
  transform,
  S.map (S.sortBy (S.prop('startDate'))),
  S.map (S.map (formatDates)),
  S.map (renderFunction),
  S.maybe (S.Left (new Error ('Fant ingen fartsdempere')))
          (S.Right)
])

//    renderSpeedBumps :: Either Error Html -> Undefined
const renderSpeedBumps = S.either (renderError)
                                  (html => {
                                    rowInsertionPoint.innerHTML = html
                                  })

//    resource :: String
const resource = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

const main = () => {
  get ({resource, headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}})
  .pipe (S.map (transformDataToHtmlOrError))
  .pipe (F.fork (renderError)
                (renderSpeedBumps))
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
