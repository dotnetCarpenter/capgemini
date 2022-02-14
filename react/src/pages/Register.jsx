function Register () {

	return (
		//  hidden-force h-screen pointer-events-none
		<section id="page-register" className="page overflow-auto">

			<article className="md:p-2">
				<h1 className="text-3xl font-bold text-svv-grey mb-3 pl-1">Registrer ny fartsdemper</h1>

				<p className="mb-3 md:w-1/2 px-1">
					Her kan du registrere din nye fartsdemper ved å legge til metadata og lokasjon.
				</p>

				<form id="registration" className="max-w-md mt-8 mx-auto px-1" action="#">
					<div className="grid grid-cols-1 gap-6">
						<label className="block">
							<span className="text-gray-700">Navn</span>
							<input type="text" minLength="3" required aria-required="true" name="name" className="
								mt-1
								block
								w-full
								bg-gray-100
								border-transparent
								focus:border-gray-500
								focus:bg-white
								focus:ring-0
							" placeholder="F.eks. Fartsdemper" />
						</label>

						<label className="block">
							<span className="text-gray-700">Type</span>
							<input type="text" minLength="3" required aria-required="true" className="
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
							<input type="number" required aria-required="true" min="{1.toString()}" className="
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
							<input name="date" type="date" required aria-required="true" pattern="\d{2}/\d{2}/\d{4}" className="
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
								<input type="number" pattern="^\d+(\.|,)?\d+?$" step="0.000001" required aria-required="true" className="
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
								<input type="number" pattern="^\d+(\.|,)?\d+?$" step="0.000001" required aria-required="true" className="
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

export default Register