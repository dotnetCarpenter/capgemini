import React from 'react'

const Notification = props => (
	<div
		className={props.className}
		onAnimationEnd={props.onAnimationEnd}>
		<section className="notification z-40 absolute p-6 max-w-sm bg-white rounded-xl shadow-lg border">
			<h1 className="text-xl font-bold text-svv-grey mb-3 pl-1">Notifikasjon</h1>
			<p className="notification__message mb-3 px-1">{props.message}</p>
		</section>
	</div>
)

export default Notification
