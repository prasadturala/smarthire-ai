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
