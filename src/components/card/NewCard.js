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
            onClick = {e=>{
              props.setFilters(card)
            }}
            key={id}
          >
            <Item
              style={{
                background:"rgba(180,180,180,0.4)",
                borderRadius:"10%",
                justifyContent:"space-around",
                flexDirection:"column",
                fontSize:"1em",
                color:"#355",
                fontWeight:"bold",
                textAlign:"center"
                // display:"inline-block"
              }}
            >

              <div>
               {card.categoryName&&card.categoryName.substr(0,255)}
              </div>


              <div>
                <span
                  style={{
                    fontSize:"1.5em"
                  }}
                >
                  {card.inventoryList.length } {" "}
                </span>
                <span>
                  SKU in stock 
                </span>
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