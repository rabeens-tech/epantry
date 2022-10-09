import React from 'react';
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import "./Card.css";
import Cardd from "../card/Cardd";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];



function NewCard(props) {
  let cards_Data = props.data || []

  console.log(cards_Data)
  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {cards_Data.map((card, id) => {

          return (
            <div
              onClick={e => {
                props.setFilters(card)
              }}
              key={id}
            >
              <Item>
                <div className="row" style={{height: "100%"}}>
                  <div className='col-sm-4'>
<img src="https://i.imgur.com/VVuoqig.jpg" style={{height: "100%", width: "100%", borderRadius:"10px"}}/>
                  </div>
                  <div className='col-sm-8' style={{display: "flex", flexDirection: "column", justifyContent:"center"}}>
                  <div
                      style={{
                        fontSize: "0.38em"
                      }}
                    >
                      {card.categoryName}
                    </div>
                    <div className='slidercard'>
                      {card.inventoryList.length}
                      <span style={{fontSize:"12px", paddingLeft: "10px"}}>SKU product</span>
                    </div>
                  </div>
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