import React, { useState } from "react";
import "./Card.css";

import CloseIcon from "@material-ui/icons/Close";

// parent Card

const Cardd = (props) => {
  const [expanded, setExpanded] = useState(false);
  return <CompactCard param={props} setExpanded={() => setExpanded(true)} />
  return (
    <div>
    {/* ////<AnimateSharedLayout> */}
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    {/* //</AnimateSharedLayout> */}
    </div>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
 // const Png = param.png;
  return (
   // <motion.div
      <div className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutid="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
      <span>{param.value}</span>
    
      </div>
      <div className="detail">
      <span>{param.title}</span>
     
      
        </div> 
      </div>
    //</motion.div>
  
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
   //const data = {}
//     options: {
//       chart: {
//         type: "area",
//         height: "auto",
//       },

//       dropShadow: {
//         enabled: false,
//         enabledOnSeries: undefined,
//         top: 0,
//         left: 0,
//         blur: 3,
//         color: "#000",
//         opacity: 0.35,
//       },

//       fill: {
//         colors: ["#fff"],
//         type: "gradient",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//         colors: ["white"],
//       },
//       tooltip: {
//         x: {
//           format: "dd/MM/yy HH:mm",
//         },
//       },
//       grid: {
//         show: true,
//       },
//       xaxis: {
//         type: "datetime",
//         categories: [
//           "2018-09-19T00:00:00.000Z",
//           "2018-09-19T01:30:00.000Z",
//           "2018-09-19T02:30:00.000Z",
//           "2018-09-19T03:30:00.000Z",
//           "2018-09-19T04:30:00.000Z",
//           "2018-09-19T05:30:00.000Z",
//           "2018-09-19T06:30:00.000Z",
//         ],
//       },
//     },
//   };

  return (
    // <motion.div
     <div className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutid="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <CloseIcon onClick={setExpanded} /> 
      </div>
       
      <div className="chartContainer">
      <span>{param.title}</span>
        <h3>productList</h3>

<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol> 
      </div>
    
    </div>
  );
}

export default Cardd;