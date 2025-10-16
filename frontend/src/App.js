import './App.css';
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from "./components/Home/Home";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import UserDashboard from "./components/Dashboards/UserDash";
import RegisterAdmin from "./components/Register/RegisterAdmin";
import LoginUser from "./components/Login/Login";
import RegisterUser from "./components/Register/RegisterUser";
import RegisterCollector from './components/Register/RegisterCollector';
import CollectorDashboard from './components/Dashboards/CollectorDashboard';


export default function App() {
  return (
    <Router>

    <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mainhome" element={<HomePage />} />
           <Route path="/admindash" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/login" element={<LoginUser />} />

        <Route path="/register" element={<RegisterUser />} />
        <Route path="/register-collector" element={<RegisterCollector />} />
        <Route path="/collector-dashboard" element={<CollectorDashboard />} />

</Routes>
</Router>
  );
}