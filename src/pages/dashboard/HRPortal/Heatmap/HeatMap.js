import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../../components/layout/Header.js';
import NavigationBar from '../../../../components/layout/NavigationBar.js';
import AccessibilityWidget from '../../../../components/accessibility/AccessibilityWidget.js';
import { ReactComponent as UKMap } from '../../../../assets/images/counties.svg';
import mapdata from '../../../../assets/images/data/mapdata.js';

const HeatMap = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNavigationBar = () => setIsOpen(!isOpen);

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
  const mapRef = useRef(null);

  // Define risk levels and their corresponding colors
  const riskColors = {
    low: '#1e88e5',
    mediumLow: '#d3eaf2',
    mediumHigh: '#f7c663',
    high: '#d84315',
    notReported: '#cccccc',
  };

  // Assign random risk levels to regions
  const regionColors = useRef({});
  useEffect(() => {
    if (mapdata && mapdata.state_specific) {
      Object.keys(mapdata.state_specific).forEach((regionId) => {
        const randomRisk = Object.keys(riskColors)[Math.floor(Math.random() * Object.keys(riskColors).length)];
        regionColors.current[regionId] = riskColors[randomRisk];
      });
    }
  }, []);

  const extractRegionId = (el) => {
    let regionId = el.getAttribute('id');
    if (regionId && regionId.trim() !== '') return regionId;

    const classAttr = el.getAttribute('class');
    if (classAttr) {
      const classes = classAttr.split(' ');
      for (let cls of classes) {
        if (cls.indexOf('sm_state_') === 0) {
          return cls.replace('sm_state_', '');
        }
      }
    }
    return null;
  };


  const handleRegionMouseEnter = (e) => {
    const target = e.target;
    const regionId = extractRegionId(target);
  
    if (regionId) {
      // Highlight the region by changing its style
      target.style.stroke = '#000'; // Add a black border
      target.style.strokeWidth = '2px'; // Make the border thicker
      target.style.opacity = '0.8'; // Slightly dim the region
    }
  
    // Check if the hovered element is the location mark
    if (target.classList.contains('location-mark')) {
      target.style.stroke = '#000'; // Add a black border
      target.style.strokeWidth = '2px'; // Make the border thicker
    }
  
    const regionName =
      (regionId &&
        mapdata &&
        mapdata.state_specific &&
        mapdata.state_specific[regionId] &&
        mapdata.state_specific[regionId].name) ||
      'Your location: Slough';
  
    const containerRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
  
    setTooltip({ visible: true, x, y, text: regionName });
  };
  
  const handleRegionMouseLeave = (e) => {
    const target = e.target;
  
    // Remove the highlight effect
    target.style.stroke = 'none'; // Remove the border
    target.style.strokeWidth = '0'; // Reset the border width
    target.style.opacity = '1'; // Reset the opacity
  
    // Check if the hovered element is the location mark
    if (target.classList.contains('location-mark')) {
      target.style.stroke = 'none'; // Remove the black border
      target.style.strokeWidth = '0'; // Reset the border width
    }
  
    setTooltip({ visible: false, x: 0, y: 0, text: '' });
  };

  document.querySelectorAll('.sm_location').forEach((location) => {
    location.addEventListener('mouseenter', () => {
      const path = location.querySelector('path');
      path.style.stroke = '#000000';
      path.style.strokeWidth = '2';
    });
  
    location.addEventListener('mouseleave', () => {
      const path = location.querySelector('path');
      path.style.stroke = 'none';
      path.style.strokeWidth = '0';
    });
  });
  
  useEffect(() => {
    const svgElement = mapRef.current;
    if (!svgElement) return;

    const regionElements = svgElement.querySelectorAll('path');
    regionElements.forEach((el) => {
      const regionId = extractRegionId(el);
      if (regionId && regionColors.current[regionId]) {
        el.style.fill = regionColors.current[regionId];
      }
      el.addEventListener('mouseenter', handleRegionMouseEnter);
      el.addEventListener('mouseleave', handleRegionMouseLeave);
    });

    return () => {
      regionElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleRegionMouseEnter);
        el.removeEventListener('mouseleave', handleRegionMouseLeave);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
      <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
      <div className="flex flex-1 overflow-hidden">
        <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />

        <div
          className="flex-1 min-h-screen p-6"
          style={{
            paddingLeft: isOpen ? '280px' : '100px',
            transition: 'padding-left 0.3s ease',
          }}
        >
          <div
            className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col flex-grow"
            style={{ position: 'relative' }}
          >
            <h1
              className="text-4xl text-black dark:text-white font-bold mb-6"
              style={{ fontFamily: 'Kanit, sans-serif' }}
            >
              HEATMAP
            </h1>

            <div
              id="map"
              className="border rounded-lg shadow-md overflow-hidden relative"
              style={{
                width: '100%',
                height: '900px',
                display: 'flex',
                marginLeft: '0%',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden', 
              }}
              onMouseLeave={handleRegionMouseLeave}
            >
              <UKMap
                id="map-svg"
                ref={mapRef}
                style={{
                  width: '150%', // Enlarged map width
                  height: '100%', // Keep the height consistent
                  marginLeft: '-25%', // Center the enlarged map within the container
                  objectFit: 'contain',
                }}
              />

              {tooltip.visible && (
                <div
                  style={{
                    position: 'absolute',
                    top: tooltip.y + 10,
                    left: tooltip.x + 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                  }}
                >
                  {tooltip.text}
                </div>
              )}
            </div>

            {/* Legend/Key */}
            <div
            className="legend"
            style={{
              position: 'absolute',
              top: '200px', // Adjusted position
              right: '100px',
              backgroundColor: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '350px',
            }}
          >
            <h3 className="text-lg font-bold mb-2" style={{ textAlign: 'center', marginBottom: '40px', color: 'black' }} >
              KEY
            </h3>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '12px', color: 'black', position: 'absolute', left: '0' }}>
                not reported
              </span>
              <span style={{ fontSize: '12px', color: 'black', position: 'absolute', left: '28%' }}>
                high risk
              </span>
              <span style={{ fontSize: '12px', color: 'black', position: 'absolute', right: '0' }}>
                low risk
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '10px',
                marginTop: '20px',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <div style={{ flexGrow: 1.5, backgroundColor: '#cccccc' }}></div> {/* Grey (longer) */}
              <div style={{ flexGrow: 1, backgroundColor: '#d84315' }}></div> {/* Red */}
              <div style={{ flexGrow: 1, backgroundColor: '#f7c663' }}></div> {/* Yellow */}
              <div style={{ flexGrow: 1, backgroundColor: '#d3eaf2' }}></div> {/* Light Blue */}
              <div style={{ flexGrow: 1, backgroundColor: '#1e88e5' }}></div> {/* Blue */}
            </div>
          </div>
          </div>
        </div>
      </div>
      <AccessibilityWidget />
    </div>
  );
};

export default HeatMap;