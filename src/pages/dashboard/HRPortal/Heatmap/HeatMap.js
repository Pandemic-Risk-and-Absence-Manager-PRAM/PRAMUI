import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../../components/layout/Header.js';
import NavigationBar from '../../../../components/layout/NavigationBar.js';
import { ReactComponent as UKMap } from '../../../../assets/images/counties.svg';
import mapdata from '../../../../assets/images/data/mapdata.js';

const HeatMap = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNavigationBar = () => setIsOpen(!isOpen);

  const [tooltip, setTooltip] = useState({ visible: false, text: '' });
  const mapRef = useRef(null);
  const [clickedRegion, setClickedRegion] = useState(null);

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
  
    if (regionId && regionId !== clickedRegion) {
      // Highlight the region by changing its style
      target.style.stroke = '#000'; // Add a black border
      target.style.strokeWidth = '2px'; // Make the border thicker
      target.style.opacity = '0.8'; // Slightly dim the region
      target.style.filter = 'drop-shadow(0px 0px 10px #7a7979)';
    }
  
    const regionName =
      (regionId &&
        mapdata &&
        mapdata.state_specific &&
        mapdata.state_specific[regionId] &&
        mapdata.state_specific[regionId].name) ||
      'Your location: Slough';
  
    setTooltip({ visible: true, text: regionName });
  };
  
  const handleRegionMouseLeave = (e) => {
    const target = e.target;
    const regionId = extractRegionId(target);
  
    // Only reset styles if the region is not clicked
    if (regionId !== clickedRegion) {
      target.style.stroke = 'none'; // Remove the border
      target.style.strokeWidth = '0'; // Reset the border width
      target.style.opacity = '1'; // Reset the opacity
      target.style.filter = 'none';
    }
  
    setTooltip({ visible: false, text: '' });
  };

  const handleRegionClick = (e) => {
    const target = e.target;
    const regionId = extractRegionId(target);
  
    if (regionId) {
      // Unhighlight the previously clicked region
      if (clickedRegion) {
        const svgElement = mapRef.current;
        const previousRegion = svgElement.querySelector(`#${clickedRegion}`);
        if (previousRegion) {
          previousRegion.style.stroke = 'none'; // Remove the border
          previousRegion.style.strokeWidth = '0'; // Reset the border width
          previousRegion.style.opacity = '1'; // Reset the opacity
          previousRegion.style.filter = 'none';
        }
      }
  
      // Set the clicked region
      setClickedRegion(regionId);
  
      // Highlight the clicked region
      target.style.stroke = '#000'; // Add a black border
      target.style.strokeWidth = '2px'; // Make the border thicker
      target.style.opacity = '0.8'; // Slightly dim the region
      target.style.filter = 'drop-shadow(0px 0px 10px #7a7979)';
  
      // Update the tooltip with the clicked region's name
      const regionName =
        (regionId &&
          mapdata &&
          mapdata.state_specific &&
          mapdata.state_specific[regionId] &&
          mapdata.state_specific[regionId].name) ||
        'Unknown Region';
  
      setTooltip({ visible: true, text: regionName });
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (mapRef.current && !mapRef.current.contains(e.target)) {
        setTooltip({ visible: false, text: '' });
        setClickedRegion(null);
      }
    };
  
    document.addEventListener('click', handleOutsideClick);
  
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleKeyMouseEnter = (color) => {
    const svgElement = mapRef.current;
    if (!svgElement) return;
  
    const regionElements = svgElement.querySelectorAll('path');
    regionElements.forEach((el) => {
      if (el.style.fill === color) {
        el.style.stroke = '#000'; // Add a black border
        el.style.strokeWidth = '2px'; // Make the border thicker
        el.style.opacity = '0.8'; // Slightly dim the region
        el.style.filter = 'drop-shadow(0px 0px 10px #7a7979)';
      }
    });
  };
  
  const handleKeyMouseLeave = (color) => {
    const svgElement = mapRef.current;
    if (!svgElement) return;
  
    const regionElements = svgElement.querySelectorAll('path');
    regionElements.forEach((el) => {
      if (el.style.fill === color && extractRegionId(el) !== clickedRegion) {
        el.style.stroke = 'none'; // Remove the border
        el.style.strokeWidth = '0'; // Reset the border width
        el.style.opacity = '1'; // Reset the opacity
        el.style.filter = 'none';
      }
    });
  };
  
  useEffect(() => {
    const svgElement = mapRef.current;
    if (!svgElement) return;
  
    const regionElements = svgElement.querySelectorAll('path');
    regionElements.forEach((el) => {
      const regionId = extractRegionId(el);
      if (regionId && regionColors.current[regionId]) {
        el.style.fill = regionColors.current[regionId]; // Assign color based on risk level
      }
      el.addEventListener('mouseenter', handleRegionMouseEnter);
      el.addEventListener('mouseleave', handleRegionMouseLeave);
      el.addEventListener('click', handleRegionClick); // Ensure click event is added
    });
  
    return () => {
      regionElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleRegionMouseEnter);
        el.removeEventListener('mouseleave', handleRegionMouseLeave);
        el.removeEventListener('click', handleRegionClick); // Clean up click event
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
                  top: '20px', // Fixed position at the top
                  left: '11%', // Center horizontally
                  transform: 'translateX(-50%)', // Adjust for centering
                  backgroundColor: 'rgba(21, 59, 116, 0.99)',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  pointerEvents: 'auto',
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
              top: '200px',
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
            <h3
              className="text-lg font-bold mb-2"
              style={{ textAlign: 'center', marginBottom: '40px', color: 'black' }}
            >
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
              {Object.entries(riskColors).map(([riskLevel, color]) => (
                <div
                  key={riskLevel}
                  style={{ flexGrow: 1, backgroundColor: color }}
                  onMouseEnter={() => handleKeyMouseEnter(color)}
                  onMouseLeave={() => handleKeyMouseLeave(color)}
                ></div>
              ))}
            </div>
          </div>
             
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;