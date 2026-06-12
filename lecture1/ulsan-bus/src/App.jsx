import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StopSearchPage from './pages/StopSearchPage'
import RouteDetailPage from './pages/RouteDetailPage'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<><Header /><HomePage /></>} />
        <Route path="/search" element={<StopSearchPage />} />
        <Route path="/routes/:routeNumber" element={<RouteDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
