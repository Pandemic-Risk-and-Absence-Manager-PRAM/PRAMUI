import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AbsencePortal from './Pages/AbsencePortal/AbsencePortal';
import ManagerPortal from './Pages/ManagerPortal/ManagerPortal';
import HRPortal from './Pages/HRPortal/HRPortal';

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
