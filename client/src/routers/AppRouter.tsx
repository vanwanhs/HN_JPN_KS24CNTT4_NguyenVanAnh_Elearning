import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Management from "../pages/Management";


export default function AppRouter() {
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </Router>
    </div>
  )
}

