import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout'
import Overview from './pages/Overview'
import Register from './pages/Register'
import NoPage from './pages/NoPage'

function Router () {

	return (
		<BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Overview />} /> */}
          <Route path="/capgemini/react/" element={<Overview />} />
          <Route path="/capgemini/react/overview" element={<Overview />} />
          <Route path="/capgemini/react/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
	)
}

export default Router