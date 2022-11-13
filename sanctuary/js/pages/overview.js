import doT from 'dot'
import { S, F, $ } from '../sanctuary.js'
import { get } from '../fetch.js'
import {
  formatNorwegianDateWithTime,
  formatNorwegianDate,
  safeFormatDate,
  createDate
} from '../dates.js'

//    rowTmpl :: String
const rowTmpl = document.getElementById ('rowTmpl').textContent

//    renderFunction :: Object -> String<Html>
const renderFunction = doT.template (rowTmpl)

//    rowInsertionPoint :: Maybe HtmlElement
const rowInsertionPoint = (() => {
  const el = document.getElementById ('rows')
  return el ? S.Just    (el)
            : S.Nothing
}) ()

//    formatDate :: Maybe Date -> String
const formatDate = safeFormatDate (formatNorwegianDate)

//    formatDateTime :: Maybe Date -> String
const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)

//    createSpeedBump :: StrMap -> SpeedBump
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
  S.map (S.sortBy (S.prop ('startDate'))),
  S.map (S.map (formatDates)),
  S.map (renderFunction),
  S.maybe (S.Left (new Error ('Fant ingen fartsdempere')))
          (S.Right)
])

//    resource :: String
const resource = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

//    main :: Undefined -> Undefined
const main = () => {
  if (S.isJust (rowInsertionPoint)) {
    get ({resource, headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'}})
    .pipe (S.map (transformDataToHtmlOrError))
    .pipe (F.fork (renderError)
                  (renderSpeedBumps))
  } else {
    console.error ('Missing HTML tag <... id="rows" ...>')
  }
}


/************ IMPURE CODE *************/

function renderSpeedBumps (eitherErrorOrHtml) {
  S.either (console.error)
           (html => S.map (element => element.innerHTML = html)
                          (rowInsertionPoint))
           (eitherErrorOrHtml)
}

//       renderError :: Error -> Undefined
function renderError (error) {
  const errorTmpl = document.getElementById ('errorTmpl').textContent

  rowInsertionPoint.innerHTML = doT.template (errorTmpl)
                                             (error)
}

export default {
  main,
  onUnmounted () {},
  mountElement: document.getElementById ('page-overview')
}
