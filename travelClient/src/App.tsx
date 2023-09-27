import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/protectedRoute";
import Bus from "./pages/admin pages/bus";
import AdminHome from "./pages/admin pages/home";
import BusRoutes from "./pages/admin pages/routes";
import Tickets from "./pages/admin pages/tickets";
import BookTicket from "./pages/bookTicket";
import DashboardLayout from "./pages/dashboard";
import ListAvailable from "./pages/listAvailable";
import { default as UserHomeSearch } from "./pages/user pages/home";
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
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<AdminHome />} />
            <Route path="registerbus" element={<Bus />} />
            <Route path="registerroutes" element={<BusRoutes />} />
            <Route path="tickets" element={<Tickets />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
