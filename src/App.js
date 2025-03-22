import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/navigation/Profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:dashboardType/*" element={<Dashboard />} />
        <Route path="/dashboard/:dashboardType/profile" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/requests" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/calendar" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/report-absence" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/upload-documents" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/resources" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
