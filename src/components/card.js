import React from "react";
import Flippy, { FrontSide, BackSide } from 'react-flippy';

export default function Card({cardData}){
    
    return(
        <Flippy
        flipOnHover={false} // default false
        flipOnClick={true} // default false
        flipDirection="horizontal" // horizontal or vertical
        //ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
        // if you pass isFlipped prop component will be controlled component.
        // and other props, which will go to div
        style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
      >
      <FrontSide>
        <img alt={cardData.cardFront.cardImageUrl} src={cardData.cardFront.cardImageUrl} width="125px;" onError={i => i.target.style.display='none'} />
        <br/>
        {cardData.cardFront.cardText}
      </FrontSide>
      <BackSide>
      <img alt={cardData.cardBack.cardImageUrl} src={cardData.cardBack.cardImageUrl} width="125px;" onError={i => i.target.style.display='none'} />
      <br/>
      {cardData.cardBack.cardText}
      </BackSide>
      </Flippy>
    )
}