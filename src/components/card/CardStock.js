import React, { useState } from "react";
import "./Card.css";



// parent Card

const CardStock = (props) => {
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
      <div className="radialBars">
      <span>{param.value } </span>
      <span>SKU Product</span>
      </div>
      <div className="details">
      
      <span>{param.title}</span>
       
        </div> 
      </div>
    //</motion.div>
  
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {

  return (
    // <motion.div
     <div className="ExpandedCard"
      style={{
        background:"linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        {/* <UilTimes onClick={setExpanded} /> */}
      </div>
        <span>{param.title}</span>
      <div className="chartContainer">
        {/* <Chart options={data.options} series={param.series} type="area" /> */}
        <h2>productList</h2>

<ol>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol> 
      </div>
      {/* <span>Sku in stockS</span> */}
    {/* </motion.div> */}
    </div>
  );
}

export default CardStock;