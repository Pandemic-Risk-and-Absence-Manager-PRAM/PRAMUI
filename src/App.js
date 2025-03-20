import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import AbsencePortal from './pages/dashboard/AbsencePortal/AbsencePortal';
import ManagerPortal from './pages/dashboard/ManagerPortal/ManagerPortal';
import HRPortal from './pages/dashboard/HRPortal/HRPortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employee" element={<AbsencePortal />} />
        <Route path="/manager" element={<ManagerPortal />} />
        <Route path="/hr" element={<HRPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
