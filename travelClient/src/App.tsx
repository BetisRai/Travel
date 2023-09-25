import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Bus from "./pages/admin pages/bus";
import AdminHome from "./pages/admin pages/home";
import BusRoutes from "./pages/admin pages/routes";
import BookTicket from "./pages/bookTicket";
import DashboardLayout from "./pages/dashboard";
import ListAvailable from "./pages/listAvailable";
import Login from "./pages/login";
import {
  default as Home,
  default as UserHomeSearch,
} from "./pages/user pages/home";
import UserHome from "./pages/user pages/userHome";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserHome />}>
            <Route path="/" element={<UserHomeSearch />} />
            <Route path="/routes" element={<ListAvailable />} />
            <Route path="/routes/:id" element={<BookTicket />} />
          </Route>
          {/* <Route path="/book" element={<BookTicket />} /> */}
          <Route path="admin" element={<DashboardLayout />}>
            <Route path="home" element={<AdminHome />} />
            <Route path="registerbus" element={<Bus />} />
            <Route path="registerroutes" element={<BusRoutes />} />
            <Route path="tickets" element={<AdminHome />} />
          </Route>

          <Route path="/check" element={<Home />} />
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
  );
}

export default App;
