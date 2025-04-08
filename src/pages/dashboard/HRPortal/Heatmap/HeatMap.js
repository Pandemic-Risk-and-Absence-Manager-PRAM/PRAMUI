import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../../components/layout/Header.js';
import NavigationBar from '../../../../components/layout/NavigationBar.js';
import { ReactComponent as UKMap } from '../../../../assets/images/counties.svg';
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
  };

  // Assign random risk levels to regions
  const regionColors = useRef({});
  useEffect(() => {
    if (mapdata && mapdata.state_specific) {
      // Step 1: Generate random case numbers for each region
      const cases = Object.keys(mapdata.state_specific).map((regionId) => {
        let caseCount;
      
        // Simulate "not reported" for ~10% of regions
        const isNotReported = Math.random() < 0.1;
      
        // Assign case count dynamically
        caseCount = isNotReported ? 0 : Math.floor(Math.random() * 5000); // Random cases between 0 and 5000
      
        // If specific logic is needed for Slough, handle it here
        if (regionId === 'GBSLG' && !isNotReported) {
          caseCount = 809; // Ensure Slough has at least 100 cases if reported
        }
      
        regionCases.current[regionId] = caseCount;
      
        return { regionId, caseCount };
      });

      // Step 2: Sort regions by case count in descending order
      const sortedCases = cases.sort((a, b) => b.caseCount - a.caseCount);

      // Step 3: Determine thresholds for risk levels
      const totalRegions = sortedCases.length;
      const highRiskThreshold = Math.floor(totalRegions * 0.25); // Top 25% for high risk
      const mediumHighThreshold = Math.floor(totalRegions * 0.50); // Next 25% for medium-high risk
      const mediumLowThreshold = Math.floor(totalRegions * 0.75); // Next 25% for medium-low risk

      // Step 4: Assign risk levels and colors
      sortedCases.forEach((region, index) => {
        const { regionId, caseCount } = region;

        if (caseCount === 0) {
          regionColors.current[regionId] = riskColors.notReported; // Not reported
        } else if (index < highRiskThreshold) {
          regionColors.current[regionId] = riskColors.high; // High risk
        } else if (index < mediumHighThreshold) {
          regionColors.current[regionId] = riskColors.mediumHigh; // Medium-high risk
        } else if (index < mediumLowThreshold) {
          regionColors.current[regionId] = riskColors.mediumLow; // Medium-low risk
        } else {
          regionColors.current[regionId] = riskColors.low; // Low risk
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

//   // Generate random case numbers for each region
// useEffect(() => {
//   if (mapdata && mapdata.state_specific) {
//     Object.keys(mapdata.state_specific).forEach((regionId) => {
//       regionCases.current[regionId] = Math.floor(Math.random() * 10001); // Random number between 0 and 10,000
//     });
//   }
// }, []);

// Update the handleRegionMouseEnter function
const handleRegionMouseEnter = (e) => {
  const target = e.target;
  const regionId = extractRegionId(target);

  // Skip hover effect if the region is the currently clicked region
  if (regionId && regionId !== clickedRegion) {
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

  // Update the tooltip
  setTooltip({
    visible: true,
    text: `${regionName} - Confirmed cases: ${confirmedCases}`,
    x: e.clientX + 10, // Position slightly to the right of the cursor
    y: e.clientY + 10,
    persist: false,
  });
};

const handleRegionMouseLeave = (e) => {
  const target = e.target;
  const regionId = extractRegionId(target);

  // Only reset styles if the region is not clicked
  if (regionId !== clickedRegion) {
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

// const handleRegionClick = (e) => {
//   const target = e.target;
//   const regionId = extractRegionId(target);

//   if (regionId) {
//     // Unhighlight the previously clicked region
//     if (clickedRegion && clickedRegion !== regionId) {
//       const svgElement = mapRef.current;
//       const previousRegion = svgElement.querySelector(`#${clickedRegion}`);
//       if (previousRegion) {
//         previousRegion.style.stroke = 'none'; // Remove the border
//         previousRegion.style.strokeWidth = '0'; // Reset the border width
//         previousRegion.style.opacity = '1'; // Reset the opacity
//         previousRegion.style.filter = 'none'; // Remove the shadow
//       }
//     }

//     // Set the clicked region
//     setClickedRegion(regionId);

//     // Highlight the clicked region (apply hover styles)
//     target.style.stroke = '#000'; // Add a black border
//     target.style.strokeWidth = '2px'; // Make the border thicker
//     target.style.opacity = '0.8'; // Slightly dim the region
//     target.style.filter = 'drop-shadow(0px 0px 10px #7a7979)';

//     // Update the tooltip with the clicked region's name and confirmed cases
//     const regionName =
//       (regionId &&
//         mapdata &&
//         mapdata.state_specific &&
//         mapdata.state_specific[regionId] &&
//         mapdata.state_specific[regionId].name) ||
//       'Unknown Region';

//     const confirmedCases = regionCases.current[regionId] || 0; // Get the random case number for the region

//     setTooltip({
//       visible: true,
//       text: `${regionName} - Confirmed cases: ${confirmedCases}`, // Include confirmed cases
//       x: tooltip.x, // Keep the current tooltip position
//       y: tooltip.y,
//       persist: true, // Make the tooltip persist
//     });
//   }
// };

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
     // el.addEventListener('click', handleRegionClick); // Ensure click event is added
    });

    return () => {
      regionElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleRegionMouseEnter);
        el.removeEventListener('mouseleave', handleRegionMouseLeave);
     //   el.removeEventListener('click', handleRegionClick); // Clean up click event
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
                height: '800px',
                display: 'flex',
                marginLeft: '0%',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
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
                 // onClick={() => setTooltip({ visible: true, text: '', x: 0, y: 0, persist: true })}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;