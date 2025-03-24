import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/shared/Profile/Profile.js';
import Calendar from './components/calendar/Calendar.js';
import MyRequests from './pages/dashboard/AbsencePortal/MyRequests/MyRequests.js';
import EmployeeAbsenceRequest from "./pages/dashboard/ManagerPortal/EmployeeAbsenceRequests/EmployeeAbsenceRequest.js";
import ReportAbsence from './pages/dashboard/AbsencePortal/ReportAbsence/ReportAbsence.js';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
    <Router>
      <Routes>
        {/* Shared Pages - All */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/:dashboardType/*" element={<Dashboard />} />
        <Route path="/dashboard/:dashboardType/profile" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/resources" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/help" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/settings" element={<Profile />} />

        {/* Shared Pages - Manager + HR */}
        <Route path="/dashboard/:dashboardType/view-documents" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/predictive-insights" element={<Profile />} />

        {/* Employee Pages  */}
        <Route path="/dashboard/:dashboardType/my-requests" element={<MyRequests />} />
        <Route path="/dashboard/:dashboardType/calendar" element={<Calendar />} />
        <Route path="/dashboard/:dashboardType/report-absence" element={<ReportAbsence />} />
        <Route path="/dashboard/:dashboardType/upload-documents" element={<Profile />} />

        {/* Manager Pages */}
        <Route path="/dashboard/:dashboardType/employee-absence-requests" element={<EmployeeAbsenceRequest />} />
        <Route path="/dashboard/:dashboardType/shared-calendar" element={<Calendar />} />

        {/* HR Pages */}
        <Route path="/dashboard/:dashboardType/heatmap" element={<Profile />} />
        <Route path="/dashboard/:dashboardType/previous-reports" element={<Profile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
