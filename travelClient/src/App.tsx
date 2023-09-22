import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import BookTicket from './pages/bookTicket'
import ListAvailable from './pages/listAvailable'
import UserHome from './pages/userHome'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './pages/login'
import Home from './pages/home'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<UserHome />} />
          <Route path='/list' element={<ListAvailable />} />
          <Route path='/book' element={<BookTicket />} />
          <Route path="/login" element={<Login />} />

          <Route path='/check' element={<Home />} />
          <Route path="/register" element={<Login />} />
          {/* </Route> */}
          {/* <Route path='/admin' element={<></>}>
            <Route path="/" element={<DashboardLayout />} />
          </Route> */}
          {/* <Route path='/user' element={<></>} >

          </Route> */}
        </Routes>
      </Router>
    </Provider>

  )
}

export default App
