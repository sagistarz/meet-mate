import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/UserProfile/UserProfile";
import Chatbot from "./pages/Chatbot/Chatbot";
import Reservation from "./pages/Reservation.jsx/Reservation";

function App() {
  // const [reservations, setReservations] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservation/:id" element={<Reservation />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
