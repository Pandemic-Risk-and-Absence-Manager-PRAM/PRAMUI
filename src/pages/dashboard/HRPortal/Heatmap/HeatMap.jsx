import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../../components/layout/Header.js';
import NavigationBar from '../../../../components/layout/NavigationBar.js';
import AccessibilityWidget from '../../../../components/accessibility/AccessibilityWidget.js';
import { ReactComponent as UKMap } from '../../../../assets/images/counties-cropped.svg';
import mapdata from '../../../../assets/images/data/mapdata.js';

const HeatMap = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNavigationBar = () => setIsOpen(!isOpen);

  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0, persist: false });
  const mapRef = useRef(null);
  const [clickedRegion, setClickedRegion] = useState(null);
  const regionCases = useRef({});

  // Define risk levels and their corresponding colors
  const riskColors = {
    low: '#1e88e5',
    mediumLow: '#d3eaf2',
    mediumHigh: '#f7c663',
    high: '#d84315',
    notReported: '#cccccc',
    nonOperational: '#636363',
  };

  const supportedRegions = [
    'GBARD', 'GBARM', 'GBBDG', 'GBBEN', 'GBBEX', 'GBBIR', 'GBBLA', 'GBBLY', 'GBBNE', 'GBBNS',
'GBBOL', 'GBBRC', 'GBBRD', 'GBBUR', 'GBCAY', 'GBCHW', 'GBCHE', 'GBCLK', 'GBCLD', 'GBCRF',
'GBCRY', 'GBDNC', 'GBDOW', 'GBDUD', 'GBEDH', 'GBEDU', 'GBEAY', 'GBELN', 'GBENF', 'GBERW',
'GBESS', 'GBFAL', 'GBFER', 'GBFIF', 'GBGLG', 'GBGRE', 'GBHCK', 'GBHIL', 'GBHMF', 'GBHNS',
'GBHRT', 'GBHRW', 'GBHRY', 'GBISL', 'GBIVC', 'GBKEC', 'GBKEN', 'GBKIR', 'GBKTT', 'GBLAN',
'GBLBH', 'GBLDS', 'GBLEW', 'GBLMV', 'GBLSB', 'GBMAN', 'GBMFT', 'GBMLN', 'GBMRT', 'GBNTA',
'GBNTH', 'GBNLK', 'GBNYK', 'GBNYM', 'GBNWM', 'GBNWP', 'GBOLD', 'GBOMH', 'GBPOW', 'GBRCC',
'GBRCH', 'GBRDB', 'GBRDG', 'GBRFW', 'GBRIC', 'GBROT', 'GBSAW', 'GBSHF', 'GBSKP', 'GBSLF',
'GBSLK', 'GBSOL', 'GBSRY', 'GBSTB', 'GBSTG', 'GBSTN', 'GBSTS', 'GBSWK', 'GBTAM', 'GBTHR',
'GBTOF', 'GBTRF', 'GBTWH', 'GBVGL', 'GBWAR', 'GBWBK', 'GBWDU', 'GBWFT', 'GBWGN', 'GBWLL',
'GBWLN', 'GBWLV', 'GBWNM', 'GBWOK', 'GBWRT', 'GBYOR', 'GBSLG'

  ];

  // Assign random risk levels to regions
  const regionColors = useRef({});

  useEffect(() => {
    if (mapdata && mapdata.state_specific) {
      // Step 1: Filter supported regions
      const filteredRegions = Object.keys(mapdata.state_specific).filter((regionId) =>
        supportedRegions.includes(regionId)
      );
  
      // Step 2: Generate random case numbers for each supported region
      const cases = Object.keys(mapdata.state_specific).map((regionId) => {
        let caseCount;
  
        // Check if the region is not in supportedRegions
        const isNonOperational = !supportedRegions.includes(regionId);
  
        if (isNonOperational) {
          // Mark as non-operational
          regionCases.current[regionId] = -1; // Use -1 to indicate non-operational
          return { regionId, caseCount: -1 };
        }
  
        // Simulate "not reported" for ~10% of supported regions
        const isNotReported = Math.random() < 0.1;
  
        // Assign case count dynamically
        caseCount = isNotReported ? 0 : Math.floor(Math.random() * 1000); // Random cases between 0 and 3000
  
        regionCases.current[regionId] = caseCount;
  
        return { regionId, caseCount };
      });
  
      // Step 3: Filter out "non-operational" and "not reported" regions
      const validCases = cases.filter((region) => region.caseCount > 0);
  
      // Step 4: Sort valid regions by case count in descending order
      const sortedCases = validCases.sort((a, b) => b.caseCount - a.caseCount);
  
      // Step 5: Determine thresholds for risk levels
      const totalValidRegions = sortedCases.length;
      const highRiskThreshold = Math.floor(totalValidRegions * 0.25); // Top 25% for high risk
      const mediumHighThreshold = Math.floor(totalValidRegions * 0.50); // Next 25% for medium-high risk
      const mediumLowThreshold = Math.floor(totalValidRegions * 0.75); // Next 25% for medium-low risk
  
      // Step 6: Assign risk levels and colors
      sortedCases.forEach((region, index) => {
        const { regionId } = region;
  
        if (index < highRiskThreshold) {
          regionColors.current[regionId] = riskColors.high; // High risk
        } else if (index < mediumHighThreshold) {
          regionColors.current[regionId] = riskColors.mediumHigh; // Medium-high risk
        } else if (index < mediumLowThreshold) {
          regionColors.current[regionId] = riskColors.mediumLow; // Medium-low risk
        } else {
          regionColors.current[regionId] = riskColors.low; // Low risk
        }
      });
  
      // Step 7: Assign colors for "non-operational" and "not reported" regions
      cases.forEach((region) => {
        const { regionId, caseCount } = region;
  
        if (caseCount === -1) {
          regionColors.current[regionId] = riskColors.nonOperational; // Non-operational
        } else if (caseCount === 0) {
          regionColors.current[regionId] = riskColors.notReported; // Not reported
        }
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

// Update the handleRegionMouseEnter function
const handleRegionMouseEnter = (e) => {
  const target = e.target;
  const regionId = extractRegionId(target);

  // Skip hover effect if the region is the currently clicked region or if the region is non-operational or not reported
  if (
    regionId &&
    regionId !== clickedRegion &&
    regionCases.current[regionId] >= 0 // Only apply hover effect for supported regions
  ) {
    target.style.filter = 'drop-shadow(0px 0px 10px #7a7979)';
  }

  // Determine the region name and case count
  const regionName =
    (regionId &&
      mapdata &&
      mapdata.state_specific &&
      mapdata.state_specific[regionId] &&
      mapdata.state_specific[regionId].name) ||
    'Your location: Slough';

  // Fetch the correct case count for the region
  const confirmedCases =
    regionId === 'GBSLG' || regionName === 'Your location: Slough'
      ? regionCases.current['GBSLG'] // Explicitly fetch Slough's case count
      : regionCases.current[regionId] || 0; // Default to 0 if no case count is found

  // Update the tooltip only for supported regions
  if (regionCases.current[regionId] >= 0 || regionName === 'Your location: Slough') {
    setTooltip({
      visible: true,
      text: `${regionName} - Confirmed cases: ${confirmedCases}`,
      x: e.clientX + 10, // Position slightly to the right of the cursor
      y: e.clientY + 10,
      persist: false,
    });
  }
};

const handleRegionMouseLeave = (e) => {
  const target = e.target;
  const regionId = extractRegionId(target);

  // Only reset styles if the region is not clicked and if the region is supported
  if (regionId !== clickedRegion && regionCases.current[regionId] >= 0) {
    target.style.stroke = 'none'; // Remove the border
    target.style.strokeWidth = '0'; // Reset the border width
    target.style.opacity = '1'; // Reset the opacity
    target.style.filter = 'none'; // Remove the shadow
  }

  // Do not hide the tooltip if it is set to persist
  if (!tooltip.persist) {
    setTooltip({ visible: false, text: '', x: 0, y: 0, persist: false });
  }
};

useEffect(() => {
  const svgElement = mapRef.current;
  if (!svgElement) return;

  const regionElements = svgElement.querySelectorAll('path');
  regionElements.forEach((el) => {
    const regionId = extractRegionId(el);
    if (regionId) {
      // Assign color based on risk level
      if (regionColors.current[regionId]) {
        el.style.fill = regionColors.current[regionId];
      }

      // Set cursor style based on operational status
      if (regionCases.current[regionId] === -1) {
        // Non-operational region
        el.style.cursor = 'default';
      } else {
        // Operational region
        el.style.cursor = 'pointer';
      }
    }

    el.addEventListener('mouseenter', handleRegionMouseEnter);
    el.addEventListener('mouseleave', handleRegionMouseLeave);
    // el.addEventListener('click', handleRegionClick); // Ensure click event is added
  });

  return () => {
    regionElements.forEach((el) => {
      el.removeEventListener('mouseenter', handleRegionMouseEnter);
      el.removeEventListener('mouseleave', handleRegionMouseLeave);
      // el.removeEventListener('click', handleRegionClick); // Clean up click event
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
              className="border border-gray-100 rounded-lg shadow-md overflow-hidden relative dark:border-gray-800"
              style={{
                width: '100%',
                height: '700px',
                display: 'flex',
                marginLeft: '0%',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
               {/* Add Subheading Here */}
            <h2
              className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-4"
              style={{
                fontFamily: 'Kanit, sans-serif',
                position: 'absolute', // Position it inside the map container
                top: '10px', // Adjust the position as needed
                left: '10px', // Adjust the position as needed
                zIndex: 10, // Ensure it appears above the map
                margin: '10px',
              }}
            >
              Risk Levels Across Operational Regions
            </h2> 

              <UKMap
                id="map-svg"
                ref={mapRef}
                style={{
                  width: '110%', // Enlarged map width
                  height: '85%', // Keep the height consistent // Center the enlarged map within the container
                  marginLeft: '7%', // Adjust the left margin to center the map
                  marginTop: '5%', // Adjust the top margin to center the map
                  objectFit: 'contain',
                }}
              />

            {tooltip.visible && (
              <div
                style={{
                  position: 'fixed',
                  top: tooltip.y,
                  left: tooltip.x,
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(21, 59, 116, 0.99)',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: '8px',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  zIndex: 10,
                }}
              >
                {tooltip.text}
                <button
                  style={{
                    marginLeft: '10px',
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                </button>
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
                <span style={{ fontSize: '12px', color: 'black', position: 'absolute', left: '82%' }}>
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

              {/* Row 1: Non-operational region */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column', // Stack text above the color bar
                  alignItems: 'left', // Center align the text and bar
                  justifyContent: 'left', // Center align vertically
                  width: '100%',
                  marginTop: '20px',
                  marginBottom: '20px', // Add spacing between rows
                }}
              >
                <span style={{ fontSize: '12px', color: 'black', marginBottom: '5px' }}>
                  non-operational region
                </span>
                <div
                  style={{
                    width: '125px',
                    height: '10px',
                    backgroundColor: '#636363', // Grey color for non-operational region
                    borderRadius: '5px',
                  }}
                ></div>
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