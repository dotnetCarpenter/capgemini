import React from 'react'

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

const transform = responseData => (
  responseData?.objekter?.map (item => ({
    status: 'Registrert',
    id: item.id,
    href: item?.href,
    name: item?.metadata?.type?.navn,
    version: item?.metadata?.versjon,
    startDate: createDate (item?.metadata?.startdato),
    lastModified: createDate (item?.metadata?.sist_modifisert),
  }))
)

const sort = comparer => list => list.sort (comparer)

const sortSpeedBumps = (x1, x2) => (
  x1.startDate < x2.startDate
    ? -1
    : x1.startDate > x2.startDate
      ? 1
      : 0
)

const formatDates = speedBump => ({
	...speedBump,
	startDate: formatDate (speedBump.startDate),
	lastModified: formatDateTime (speedBump.lastModified),
})

const Row = props => (
	<tr title={`Sist modifisert ${props.speedBump.lastModified || 'er ikke spesifisert'}`}>
		<td className="tabular-nums border-b border-slate-100 py-2 pl-2 md:pl-8 text-svv-grey">{props.speedBump.id || '-'}</td>
		<td className="border-b border-slate-100 py-2 pl-2 md:pl-8 text-svv-grey">{props.speedBump.version || '-'}</td>
		<td className="border-b border-slate-100 py-2 pl-2 md:pl-8 text-svv-grey">{props.speedBump.name || '-'}</td>
		<td className="tabular-nums border-b border-slate-100 py-2 pl-2 md:pl-8 text-svv-grey">{props.speedBump.startDate || '-'}</td>
		<td className="border-b border-slate-100 py-2 pl-2 md:pl-8 text-svv-grey">{props.speedBump.status || '-'}</td>
		<td className="border-b border-slate-100 py-2 pl-2 md:pl-8 text-svv-grey">
			{props.speedBump?.href && (
				<a href={props.speedBump.href} target="_blank">🗺️</a>
			)}
		</td>
	</tr>
)

const RowError = ({ message }) => (
	<tr>
		<td colSpan="6" className="text-red-800 text-xl font-bold">{String (message)}</td>
	</tr>
)

const endpoint = 'https://nvdbapiles-v3.atlas.vegvesen.no/vegobjekter/103?kartutsnitt=270153.519,7040213.023,270332.114,7040444.864&kommune=5001&segmentering=true&inkluder=metadata'

class Overview extends React.Component {
	constructor (props) {
		super (props)

		this.state = {
			speedBumps: [],
			abortController: null,
			error: null
		}
	}

	setStateHelper (state) {
		this.setState ({
			...this.state,
			...state
		})
	}

	fetchData () {
		const abortController = new AbortController

		this.state.abortController = abortController

		fetch (endpoint, {
			headers: {'Accept': 'application/vnd.vegvesen.nvdb-v3-rev1+json'},
			signal: abortController.signal
		})
    .then (response => {
      if (!response.ok) {
        throw new Error (`HTTP error! status: ${response.status}`)
      }
      return response.json ()
    })
    .then (pipe (
			transform,
			sort (sortSpeedBumps),
			map (formatDates),
			speedBumps => {
				this.setStateHelper ({ speedBumps, abortController: null })
			}
		))
    .catch (error => {
			this.setStateHelper ({ error })
			this.state.abortController.abort ()
			console.error (error)
		})
	}

	componentDidUpdate (prevProps, prevState, snapshot) {
		console.log ('componentDidUpdate')

		if (this.state.abortController === null && this.state.speedBumps.length === 0) {
			this.fetchData ()
		}
	}

	render () {
		// FIXME: not sure why componentDidUpdate is not called automagically
		if (this.state.speedBumps.length === 0) {
			this.componentDidUpdate ()
		}
		return (
			//  hidden-force h-screenpointer-events-none
			<section id="page-overview" className="page overflow-auto">

				<article className="md:p-2">
					<h1 className="text-3xl font-bold text-svv-grey mb-3 pl-1">Mine fartsdempere</h1>

					<p className="max-w-x-screen mb-3 md:w-1/2 px-1">
						Mine fartsdempere er en oversikt over alle fartsdemperene som har blitt
						sendt inn. Her kan du raskt se statusen på registreringen, og se de i
						vegkart.
					</p>

					<table className="table-auto border-collapse text-sm w-full">
						<caption className="text-lg font-bold text-svv-grey text-left bg-slate-300 py-2 pl-2">Fartsdempere</caption>
						<thead className="bg-slate-100">
							<tr>
								<th className="border-b border-slate-600 font-semibold py-2 pl-2 md:pl-8 text-svv-grey text-left">Id</th>
								<th className="border-b border-slate-600 font-semibold py-2 pl-2 md:pl-8 text-svv-grey text-left">Versjon</th>
								<th className="border-b border-slate-600 font-semibold py-2 pl-2 md:pl-8 text-svv-grey text-left">Navn</th>
								<th className="border-b border-slate-600 font-semibold py-2 pl-2 md:pl-8 text-svv-grey text-left">Startdato</th>
								<th colSpan="2" className="border-b border-slate-600 font-semibold py-2 pl-2 md:pl-8 text-svv-grey text-left">Status</th>
							</tr>
						</thead>
						<tbody id="rows" className="bg-white">
							{
								this.state.error
									? <RowError message={this.state.error} />
									: this.state.speedBumps.map (speedBump => <Row speedBump={speedBump} key={String (speedBump.id)} />)
							}
						</tbody>
					</table>
				</article>

			</section>
		)
	}
}

export default Overview
