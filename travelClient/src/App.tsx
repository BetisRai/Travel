import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './pages/home'
import DashboardLayout from './pages/dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
      </Routes>
    </Router>
  )
}

export default App
