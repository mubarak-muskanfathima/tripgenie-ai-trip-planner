import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PlanTrip from "./pages/PlanTrip";
import TripResult from "./pages/TripResult";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyTrips from "./pages/MyTrips";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/plan-trip"
          element={
            <ProtectedRoute>
              <PlanTrip />
            </ProtectedRoute>
          }
        />

        <Route path="/trip-result" element={<TripResult />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
  path="/my-trips"
  element={
    <ProtectedRoute>
      <MyTrips />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;