// src/routers/AppRouter.tsx
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

import ManagerLayout from "../pages/Manager";
import ManagementSubject from "../components/ManagementSubject";
import ManagementLesson from "../components/ManagementLesson";
import Statistics from "../components/Statistics";

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="w-full min-h-screen bg-gray-100">{children}</div>;
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
        <Route path="/" element={
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

        {/* Tạo route con cho manager */}
        <Route
          path="/manager"
          element={
            user && user.role === "admin" ? (
              <ManagerLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="subjects" replace />} />
          <Route path="subjects" element={<ManagementSubject />} />
          <Route path="lessons" element={<ManagementLesson />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </Router>
  );
}
