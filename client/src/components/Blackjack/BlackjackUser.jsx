import React from 'react';
import axios from 'axios';


const BlackjackUser = (props) => {
  //need a mapping function... from the userHand array--> for each need a component <img /> with an src=cardObj.image
  const {userHand} = props;
  // console.log(userHand);

  const hand = userHand.map(cardObj => <img key={cardObj.code} height={170} src={cardObj.image}/>);


  

  return (
    <div>
      
      {hand}
 
    </div>
  );
};

export default BlackjackUser;