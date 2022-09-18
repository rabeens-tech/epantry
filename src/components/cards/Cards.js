import React,{useState} from "react";
import "./Cards.css";


import Card from "../card/Card";
const cardsData=[
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
const Cards = (props) => {
   // const cardsData=props.cardsData
    const [record, setRecords] = useState(cardsData);
  return (
    <div className="Cards">
      {record&&record.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
             value={card.value}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;