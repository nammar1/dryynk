import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/Home'
import ComingSoonPage from './pages/ComingSoon'
import AdminDashboard from './pages/AdminDashboard'
import { useEffect } from "react";
import { initGA, trackPage } from "./lib/analytics";

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPage(location.pathname + location.search);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<ComingSoonPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App