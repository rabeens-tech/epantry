import React, { useState } from "react";
import "./Cards.css";
import { Container, Row, Col } from "react-bootstrap";
//import Cardd from "../card/Cardd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardStock from "../card/CardStock";

    const cards_Data=[
        {
        "id":1,
        "title":"rice and grain",
        "value":2,
    },   {
        "id":2,
        "title":" grain",
        "value":8,
    },   {
        "id":3,
        "title":"pzza",
        "value":23,
    },
    {
        "id":4,
        "title":"biscuits",
        "value":4,
    },
       {
        "id":5,
        "title":"milks",
        "value":4,
    },
    {
        "id":6,
        "title":"bis",
        "value":12,
    }
]
const CardsStock = (props) => {
   // const cardsData=props.cardsData
    const [record, setRecords] = useState(cards_Data);
  return (
    <div className="Cards">
      {record&&record.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <CardStock
              title={card.title}
             value={card.value}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsStock;