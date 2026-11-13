import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Jobs = lazy(() => import('./pages/Jobs'));
const CandidateDashboard = lazy(() => import('./pages/CandidateDashboard'));
const RecruiterDashboard = lazy(() => import('./pages/RecruiterDashboard'));
const ResumeUpload = lazy(() => import('./pages/ResumeUpload'));

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
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import ResumeUpload from './pages/ResumeUpload';
import CandidateDashboard from './pages/CandidateDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

function ProtectedRoute({ user, allowedRole, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard'} replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Suspense fallback={<div className="page-loading" role="status">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidate-dashboard" element={<ProtectedRoute role="candidate"><CandidateDashboard /></ProtectedRoute>} />
            <Route path="/recruiter-dashboard" element={<ProtectedRoute role="recruiter"><RecruiterDashboard /></ProtectedRoute>} />
            <Route path="/upload-resume" element={<ProtectedRoute role="candidate"><ResumeUpload /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smarthire-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('smarthire-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smarthire-user');
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('smarthire-token');
    localStorage.removeItem('smarthire-user');
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar user={user} onLogout={handleLogout} />

        <main className="app-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to={user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard'} replace /> : <Login setUser={setUser} />} />
            <Route path="/register" element={user ? <Navigate to={user.role === 'recruiter' ? '/recruiter-dashboard' : '/candidate-dashboard'} replace /> : <Register setUser={setUser} />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/resume-upload" element={<ResumeUpload />} />

            <Route
              path="/candidate-dashboard"
              element={
                <ProtectedRoute user={user} allowedRole="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recruiter-dashboard"
              element={
                <ProtectedRoute user={user} allowedRole="recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
