function Overview () {

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
					<tbody id="rows" className="bg-white"></tbody>
				</table>
			</article>

		</section>
	)
}

export default Overview