import '../style.css'
import doT from 'dot'

const data = {
	objekter: [{
		id: 489331915,
		href: "https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103/489331915/2",
		navn: "Fartsdemper",
		versjon: 2,
		startdato: "2016-03-17",
		status: 'Registrert'
	}, {
		id: 489331916,
		href: "https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103/489331916/1",
		navn: "Fartsdemper",
		versjon: 1,
		startdato: "2014-03-29",
		status: 'Registrert'
	}]
}

const tmpl = document.querySelector ('#rowTmpl').textContent
const render = doT.template (tmpl)

document.querySelector ('#rows').innerHTML = render (data)
