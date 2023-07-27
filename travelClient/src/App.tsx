import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import UserHome from './pages/userHome'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserHome />} />

        {/* <Route path='/check' element={<UserHome />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
        </Route>
        <Route path='/admin' element={<></>}>
          <Route path="/" element={<DashboardLayout />} />
        </Route>
        <Route path='/user' element={<></>} >

        </Route> */}
      </Routes>
    </Router>
  )
}

export default App
