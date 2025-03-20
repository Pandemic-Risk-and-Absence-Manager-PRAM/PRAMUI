import React from 'react';
import { useParams } from 'react-router-dom';
import AbsencePortal from './AbsencePortal/AbsencePortal';
import ManagerPortal from './ManagerPortal/ManagerPortal';
import HRPortal from './HRPortal/HRPortal';

const Dashboard = () => {
  const { dashboardType } = useParams();

  const renderDashboard = () => {
    switch (dashboardType) {
      case 'employee':
        return <AbsencePortal />;
      case 'manager':
        return <ManagerPortal />;
      case 'hr':
        return <HRPortal />;
      default:
        return <div>Invalid Dashboard Type</div>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default Dashboard;