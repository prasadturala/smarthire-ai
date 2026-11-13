import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import ResumeUpload from './pages/ResumeUpload';

function ProtectedRoute({ role, children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || 'null');
  } catch {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  if (!token || !user) {
    return <Navigate to="/login" replace state={{ returnTo: `${location.pathname}${location.search}` }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard'} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidate-dashboard" element={<ProtectedRoute role="candidate"><CandidateDashboard /></ProtectedRoute>} />
          <Route path="/recruiter-dashboard" element={<ProtectedRoute role="recruiter"><RecruiterDashboard /></ProtectedRoute>} />
          <Route path="/upload-resume" element={<ProtectedRoute role="candidate"><ResumeUpload /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
