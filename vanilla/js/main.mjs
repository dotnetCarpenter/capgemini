import '../style.css'
import doT from 'dot'
import {
	formatNorwegianDateWithTime,
	formatNorwegianDate,
	safeFormatDate
} from './dates.js'

const formatDate = safeFormatDate (formatNorwegianDate)
const formatDateTime = safeFormatDate (formatNorwegianDateWithTime)

const endpoint = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

const responseData = await fetch (endpoint, {headers: {'Accept': 'application/json'}})
	.then (response => {
		if (!response.ok) {
			throw new Error (`HTTP error! status: ${response.status}`)
		}
		return response.json ()
	})
	.catch (console.error)

const speedBumps = responseData.objekter.map (item => ({
	status: 'Registrert',
	id: item.id,
	href: item?.href,
	name: item?.metadata?.type?.navn,
	version: item?.metadata?.versjon,
	startDate: formatDate (item?.metadata?.startdato),
	lastModified: formatDateTime (item?.metadata?.sist_modifisert),
}))

// console.debug (responseData.objekter[0].metadata.startdato)
// console.debug (speedBumps.map (x => x.lastModified))

const tmpl = document.querySelector ('#rowTmpl').textContent
const render = doT.template (tmpl)

document.querySelector ('#rows').innerHTML = render (speedBumps)
