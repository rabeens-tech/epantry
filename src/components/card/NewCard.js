import React from 'react';
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./Card.css";
const breakPoints = [
    { width: 1, itemsToShow: 2 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 2 },
  ];



function NewCard(props) {
  let cards_Data = props.data || []

  console.log(cards_Data)
  return (
    <div>
    <Carousel breakPoints={breakPoints}>
    {cards_Data.map((card, id) => {
        return (
          <div  key={id}>
            <Item>
              <div
                style={{
                  fontSize:"0.3em"
                }}
              >
               {card.categoryName}
              </div>
                <br/>
              <div
                style={{
                  fontSize:"0.5em"
                }}
              >
              {card.inventoryList.length }
              </div>
            </Item>
              {/* title={card.title}
             value={card.value}
            /> */}

          </div>
        );
      })}
  </Carousel>
  </div>
  )
}

export default NewCard