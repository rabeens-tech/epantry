import React, { useState } from "react";
import "./Cards.css";
import { Container, Row, Col } from "react-bootstrap";
import Cardd from "../card/Cardd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cardsDataScheme={
  "NOW":{
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",

    },
   "SOON": {
      backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    
    },
  "LATER":{
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
  },
  // {
  //   "id":3,
  //   "title":"Products to Order Later",
  //   "value":5 ,
  //   "color": {
  //     backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
  //     boxShadow: "0px 10px 20px 0px #e0c6f5",
  //   },

}
const Cards = (props) => {
   // const cardsData=props.cardsData
    const [record, setRecords] = useState(props.data || []);
    let data = Object.keys(record).map((x,i)=>{
      // console.log(x, record[x])
      return {
        id:i,
        title:record[x]["itemStatus"],
        value:record[x]["itemCount"],
        "color":cardsDataScheme[x]
      }
    })
    // console.log(data)
  return (
    <div className="Cards">
      {data&&data.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Cardd
              title={card.title}
             value={card.value}
             color={card.color}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;