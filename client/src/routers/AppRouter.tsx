import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Manager from "../components/Manager";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {children}
    </div>
  );
}

const getUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    const user = JSON.parse(storedUser);
    if (!user.role) return null;
    return user;
  } catch {
    return null;
  }
};

export default function AppRouter() {
  const user = getUser();

  return (
    <Router>
      <Routes>
        <Route
          path="/" element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/manager" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            user && user.role === "user" ? (
              <Layout>
                <Home />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/manager" element={
            user && user.role === "admin" ? (
              <Layout>
                <Manager />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
