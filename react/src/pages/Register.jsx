import React from 'react'
import {
  formatNorwegianDate,
  safeFormatDate,
  createDate
} from '../dates.js'
import Notification from '../Notification'

const formatDate = safeFormatDate (formatNorwegianDate)

class Register extends React.Component {
	constructor (props) {
		super (props)

		this.state = {
			name: '',
			type: '',
			version: '',
			date: '',
			longitude: '',
			latitude: '',
			notification: {
				message: '',
				className: 'hidden',
			}
		}

		this.handleChange = this.handleChange.bind (this)
		this.handleSubmit = this.handleSubmit.bind (this)
		this.cleanUpForm = this.cleanUpForm.bind (this)
		this.hideNotification = this.hideNotification.bind (this)
		this.notificationDisplayNone = this.notificationDisplayNone.bind (this)
	}

	setStateHelper (state) {
		this.setState ({
			...this.state,
			...state
		})
	}

	handleChange (name) {
		return event => {
			this.setStateHelper ({ [name]: event.target.value })
		}
	}

	handleSubmit (event) {
		event.preventDefault ()

  	// Dato skal velges fra en kalender. Format: dd/mm/åååå
		// very strange requirement... let's log the date as dd/mm/åååå
		// and show a nofitication
		const date = createDate (this.state.date)
		if (date) {
			const dateString = safeFormatDate (s => s.replaceAll ('.', '/'))
																				(formatDate (date))

			console.log (dateString)

			this.showNotification (`Du registrerte ${this.state.name} den ${dateString}`)

			setTimeout (this.cleanUpForm, 3000)
		}

		// console.debug ('state', JSON.stringify(this.state))
	}

	cleanUpForm () {
		this.hideNotification ()
		this.setStateHelper ({
			name: '',
			type: '',
			version: '',
			date: '',
			longitude: '',
			latitude: '',
		})
	}

	// TEST NOTIFICATION SNIPPET
	// componentDidMount () {
	// 	this.showNotification ('foo baaar')
	// 	setTimeout (this.cleanUpForm, 4000)
	// }

	showNotification (message) {
		this.setStateHelper ({
			notification: {
				message: String (message),
				className: 'animate-backInDown'
			}
		})

	}

	hideNotification () {
		this.setStateHelper ({
			notification: {
				message: this.state.notification.message,
				className: 'animate-backOutDown'
			}
		})

	}

	notificationDisplayNone () {
		if (this.state.notification.className === 'animate-backOutDown') {
			this.setStateHelper ({
				notification: {
					message: '',
					className: 'hidden'
				}
			})
		}
	}

	render () {
		return (
			//  hidden-force h-screen pointer-events-none
			<section id="page-register" className="page overflow-auto">
				<>
					<Notification
						message={this.state.notification.message}
						className={this.state.notification.className}
						onAnimationEnd={this.notificationDisplayNone}
					/>
				</>

				<article className="md:p-2">
					<h1 className="text-3xl font-bold text-svv-grey mb-3 pl-1">Registrer ny fartsdemper</h1>

					<p className="mb-3 md:w-1/2 px-1">
						Her kan du registrere din nye fartsdemper ved å legge til metadata og lokasjon.
					</p>

					<form id="registration" className="max-w-md mt-8 mx-auto px-1" onSubmit={this.handleSubmit}>
						<div className="grid grid-cols-1 gap-6">
							<label className="block">
								<span className="text-gray-700">Navn</span>
								<input
									type="text"
									name="name"
									onChange={this.handleChange('name')}
									value={this.state.name}
									minLength="3"
									required
									aria-required="true"
									className="
										mt-1
										block
										w-full
										bg-gray-100
										border-transparent
										focus:border-gray-500
										focus:bg-white
										focus:ring-0
									"
									placeholder="F.eks. Fartsdemper" />
							</label>

							<label className="block">
								<span className="text-gray-700">Type</span>
								<input
									type="text"
									name="type"
									onChange={this.handleChange('type')}
									value={this.state.type}
									required
									minLength="3" aria-required="true"
									className="
										mt-1
										block
										w-full
										bg-gray-100
										border-transparent
										focus:border-gray-500
										focus:bg-white
										focus:ring-0
								" />
							</label>

							<label className="block">
								<span className="text-gray-700">Versjon</span>
								<input
									type="number"
									name="version"
									onChange={this.handleChange('version')}
									value={this.state.version}
									required
									aria-required="true"
									className="
										mt-1
										block
										w-full
										bg-gray-100
										border-transparent
										focus:border-gray-500
										focus:bg-white
										focus:ring-0
								" />
							</label>

							<label className="block">
								<span className="text-gray-700">Dato</span>
								<input
									type="date"
									name="date"
									max="6000-12-31"
									onChange={this.handleChange('date')}
									value={this.state.date}
									required
									aria-required="true"
									pattern="\d{2}/\d{2}/\d{4}"
									className="
										mt-1
										block
										w-full
										bg-gray-100
										border-transparent
										focus:border-gray-500
										focus:bg-white
										focus:ring-0
								" />
							</label>

							<div className="flex gap-4">
								<label className="block w-1/2">
									<span className="text-gray-700">Breddegrad</span>
									<input
										type="number"
										name="longitude"
										onChange={this.handleChange('longitude')}
										value={this.state.longitude}
										required
										pattern="^\d+(\.|,)?\d+?$"
										step="0.000001"
										aria-required="true"
										className="
											mt-1
											block
											w-full
											bg-gray-100
											border-transparent
											focus:border-gray-500
											focus:bg-white
											focus:ring-0
									" placeholder="63.435948" />
								</label>

								<label className="block w-1/2">
									<span className="text-gray-700">Lengegrad</span>
									<input
										type="number"
										name="latitude"
										onChange={this.handleChange('latitude')}
										value={this.state.latitude}
										required
										pattern="^\d+(\.|,)?\d+?$"
										step="0.000001"
										aria-required="true"
										className="
											mt-1
											block
											w-full
											bg-gray-100
											border-transparent
											focus:border-gray-500
											focus:bg-white
											focus:ring-0
									" placeholder="10.456106" />
								</label>
							</div>

							<input type="submit" value="Registrer" className="button" />

						</div>
					</form>
				</article>

			</section>
		)
	}
}

export default Register