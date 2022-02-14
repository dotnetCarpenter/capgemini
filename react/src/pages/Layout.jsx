import logo from '../favicon.svg'
import { Outlet, Link } from "react-router-dom"

const Layout = () => (
  (
    <div className="app antialiased absolute overflow-hidden">
      <header className="app__header bg-svv-grey flex items-center flex-row mb-3 leading-8">
				<Link to="/">
					<img src={logo} className="logo h-12 md:h-24" alt="logo" />
				</Link>

        <nav className="grow justify-self-stretch">
          <ol className="text-zinc-50 text-center space-x-1 md:space-x-4">
            <li className="inline-block">
							<Link className="hover:underline" to="/overview">Oversikt</Link>
						</li>
            <li className="inline-block">
							<Link className="hover:underline" to="/register">Registrer</Link>
						</li>
          </ol>
        </nav>

        <button className="button mr-1 md:mr-4">Logg ut</button>
      </header>

      <Outlet />

			<footer className="app__footer bg-slate-100 h-48 grid grid-rows-3 pl-1">
				<section className="max-w-md row-start-3">
					<h3 className="text text-base font-semibold tracking-wider">Drevet av ferske vegdata fra Nasjonal vegdatabank</h3>
					<ol className="text-sm flex items-end">
						<li className="flex-grow">Statens vegvesen</li>
						<li className="flex-grow">Vegkart</li>
						<li className="flex-grow">Kartverket</li>
					</ol>
				</section>
			</footer>
		</div>
  )
)

export default Layout
