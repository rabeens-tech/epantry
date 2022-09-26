import React from 'react';
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./Card.css";
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
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
function NewCard() {
  return (
    <div>
    <Carousel breakPoints={breakPoints}>
    {cards_Data&&cards_Data.map((card, id) => {
        return (
          <div  key={id}>
            <Item>{card.title}</Item>
              {/* title={card.title}
             value={card.value}
            /> */}
          </div>
        );
      })}
    {/* <Item>One</Item>
          <Item>Two</Item>
          <Item>Three</Item>
          <Item>Four</Item>
          <Item>Five</Item>
          <Item>Six</Item>
          <Item>Seven</Item>
          <Item>Eight</Item> */}
  </Carousel>
  </div>
  )
}

export default NewCard