import React, { useState, useEffect } from 'react';
import Header from '../../../../components/layout/Header';
import NavigationBar from '../../../../components/layout/NavigationBar';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';// Import the leaflet heat plugin

// Custom component that integrates leaflet.heat with react-leaflet
const HeatmapLayer = ({ points, options }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create the heat layer with given points and options
    const heatLayer = L.heatLayer(points, options).addTo(map);

    // Clean up on unmount
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, options]);

  return null;
};

const HeatMap = () => {
  console.log("Revised HeatMap component rendered");

  const [isOpen, setIsOpen] = useState(true);
  const toggleNavigationBar = () => setIsOpen(!isOpen);

  // Heatmap points format: [latitude, longitude, intensity]
  const heatmapPoints = [
    [51.5074, -0.1278, 0.5],  // London
    [53.4808, -2.2426, 0.5],  // Manchester
    [55.9533, -3.1883, 0.5],  // Edinburgh
    // Add more data points as needed
  ];

  // Options for the heat layer
  const heatOptions = {
    radius: 25,
    blur: 15,
    maxZoom: 17,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      {/* Page Header */}
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
        
        {/* Main Content */}
        <div
          className="flex-1 min-h-screen p-6"
          style={{ paddingLeft: isOpen ? "280px" : "100px", transition: "padding-left 0.3s ease" }}
        >
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col flex-grow">
            <h1 className="text-4xl text-black dark:text-white font-bold mb-6" style={{ fontFamily: 'Kanit, sans-serif' }}>
              Heatmap
            </h1>
            <div className="border rounded-lg shadow-md overflow-hidden" style={{ height: "600px", width: "100%" }}>
              <MapContainer
                center={[55, -3]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
                dragging={false}
                touchZoom={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <HeatmapLayer points={heatmapPoints} options={heatOptions} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
