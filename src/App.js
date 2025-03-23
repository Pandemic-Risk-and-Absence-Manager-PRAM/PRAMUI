import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/navigation/Profile/Profile';
import Calendar from './pages/navigation/Calendar/Calendar';
import MyRequests from './pages/navigation/MyRequests/MyRequests';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:dashboardType/*" element={<Dashboard />} />
        <Route path="/dashboard/:dashboardType/profile" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/my-requests" element={<MyRequests />} />
        <Route path="/dashboard/:dashboardType/calendar" element={<Calendar />} />
        <Route path="/dashboard/:dashboardType/report-absence" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/upload-documents" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/resources" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
