import React, { useState } from "react";
import "./Card.css";
//import { CircularProgressbar } from "react-circular-progressbar";
//import "react-circular-progressbar/dist/styles.css";
//import { motion, AnimateSharedLayout } from "framer-motion";
//import {AnimatePresence} from "framer-motion/dist/framer-motion";


// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
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
        background:"linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
       
        <span>{param.title}</span>
      </div>
      <div className="detail">
       </div> 
       {/* <Png /> */}
        <span>{param.value}</span>
        <span>Sku in stockS</span>
      </div>
    //</motion.div>
  
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
//   const data = {
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
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        {/* <UilTimes onClick={setExpanded} /> */}
      </div>
        <span>{param.title}</span>
      <div className="chartContainer">
        {/* <Chart options={data.options} series={param.series} type="area" /> */}
      </div>
      <span>Sku in stockS</span>
    {/* </motion.div> */}
    </div>
  );
}

export default Card;