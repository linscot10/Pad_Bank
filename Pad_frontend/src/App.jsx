
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import SchoolDashboardPage from './pages/SchoolDashboardPage';
import SponsorDashboardPage from './pages/SponsorDashboardPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './pages/AdminLayout';
import InventoryManager from './components/admin/InventoryManager';
import PadApplications from './components/admin/PadApplications'
import DonationsList from './components/admin/DonationsList'
import PadApplicationPage from './components/school/PadApplicationPage';
import SchoolDashboardLayout from './pages/SchoolDashboardLayout';
import SponsorLayout from './components/sponsor/SponsorLayout';
import Profile from './pages/Profile';
import Donate from './pages/Donate';
import History from './pages/History';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/sponsor" element={
          <PrivateRoute roles={['sponsor']}>
            <SponsorLayout />
          </PrivateRoute>
        }>
          <Route path="profile" element={<Profile />} />
          <Route path="donate" element={<Donate />} />
          <Route path="history" element={<History />} />
        </Route>

        <Route path="/admin/" element={
          <PrivateRoute roles={['admin']}>
            <AdminLayout />
          </PrivateRoute>
        } >
          <Route index element={<AdminDashboard />}></Route>
          <Route path='inventory' element={<InventoryManager />}></Route>
          <Route path='applications' element={<PadApplications />}></Route>
          <Route path='donations' element={<DonationsList />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />



        <Route path="/school/" element={<PrivateRoute><SchoolDashboardLayout /></PrivateRoute>}>
          <Route path="home" element={<SchoolDashboardPage />} />
          <Route path="apply" element={<PadApplicationPage />} />
          
        </Route>
        <Route
          path="/"
          element={
            <PrivateRoute roles={['school', 'admin', 'sponsor']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router >
  )
}

export default App
