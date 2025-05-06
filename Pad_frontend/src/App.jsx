
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import SchoolDashboardPage from './pages/SchoolDashboardPage';
import SponsorDashboardPage from './pages/SponsorDashboardPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {


  return (
    <Router>
      <Routes>

        <Route path="/sponsor/dashboard" element={
          <PrivateRoute roles={['admin', 'sponsor']}>
            <SponsorDashboardPage />
          </PrivateRoute>
        } />
        <Route path="/admin/dashboard" element={
          <PrivateRoute roles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/school/dashboard" element={
          <PrivateRoute roles={['school', 'admin']}>
            <SchoolDashboardPage />
          </PrivateRoute>
        } />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={['school', 'admin', 'sponsor']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  )
}

export default App
