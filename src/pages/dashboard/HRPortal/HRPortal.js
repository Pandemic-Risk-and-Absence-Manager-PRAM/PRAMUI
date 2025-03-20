import React from 'react';
import NavigationBar from '../../../components/layout/NavigationBar';
import Header from '../../../components/layout/Header';

const HRPortal = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleNavigationBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex-1 flex flex-col">
        <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} /> 
    <div className="flex h-screen">
      <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
      </div>
    </div>
  );
};

export default HRPortal;