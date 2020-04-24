
const express = require('express');
const router = express.Router();
const data  = require('../sampleData/stocks.json')


///Many code I have not used yet because of lack of time I wanted to use it to increase accuracy.

const maxEver = (myData=data) => {
  arrayOfHigh = [];
  for (let i = 0; i< myData.length; i++){
    arrayOfHigh.push(myData[i].High)
  }
  let max = Math.max(...arrayOfHigh)
  return max;
}

const minEver = (myData=data) => {
  arrayOfLow = [];
  for (let i = 0; i< myData.length; i++){
    arrayOfLow.push(myData[i].Low)
  }
  let min = Math.min(...arrayOfLow)
  return min;
}
const biggestWinOn1Week = (myData = data) => {
  let bw = 0;
  let holdingValue = 0;
  for (let i = 0; i < myData.length; i++){
    holdingValue = myData[i].Close - myData[i].Open;
    if(holdingValue > 0 && bw < holdingValue){
      bw = holdingValue;
     
    }
    
  }
  return bw;
}
const biggestWinOn2Week = (myData = data) => {
  let bw = 0;
  let holdingValue = 0;
  for (let i = 0; i < myData.length-1; i++){
    holdingValue = myData[i+1].Close - myData[i].Open;
    if(holdingValue > 0 && bw < holdingValue){
      bw = holdingValue;
     
    }
    
  }
  return bw;
}

const biggestWinOn3Week = (myData = data) => {
  let bw = 0;
  let holdingValue = 0;
  for (let i = 0; i < myData.length-2; i++){
    holdingValue = myData[i+2].Close - myData[i].Open;
    if(holdingValue > 0 && bw < holdingValue){
      bw = holdingValue;
     
    }
    
  }
  return bw;
}

const smallestWinOnWeek = (myData = data) => {
  arrayOfWins = []
   for (let i = 0; i < myData.length; i++){
     arrayOfWins.push(myData[i].Close- myData[i].Open)
   }
   
   const filtered = arrayOfWins.filter(element => {
     return element > 0;
   })
  
  let sw = Math.min(...filtered);
return sw;
}

const smallestWinOn2Week = (myData = data) => {
  arrayOfWins = []
   for (let i = 0; i < myData.length-1; i++){
     arrayOfWins.push(myData[i+1].Close- myData[i].Open)
   }
   
   const filtered = arrayOfWins.filter(element => {
     return element > 0;
   })
  
  let sw = Math.min(...filtered);
return sw;
} 

const smallestWinOn3Week = (myData = data) => {
  arrayOfWins = []
   for (let i = 0; i < myData.length-2; i++){
     arrayOfWins.push(myData[i+2].Close- myData[i].Open)
   }
   
   const filtered = arrayOfWins.filter(element => {
     return element > 0;
   })
  
  let sw = Math.min(...filtered);
return sw;
}

//I am sure there are some losses
const biggestLossOn1Week = (myData = data) => {
  arrayOfLoss = []
    for (let i = 0; i < myData.length; i++){
      arrayOfLoss.push(myData[i].Close- myData[i].Open)
    }
      
   let bl = Math.min(...arrayOfLoss);
 return bl;
 }

 const biggestLossOn2Week = (myData = data) => {
  arrayOfLoss = []
    for (let i = 0; i < myData.length-1; i++){
      arrayOfLoss.push(myData[i+1].Close- myData[i].Open)
    }
      
   let bl = Math.min(...arrayOfLoss);
 return bl;
 }

 const biggestLossOn3Week = (myData = data) => {
  arrayOfLoss = []
    for (let i = 0; i < myData.length-2; i++){
      arrayOfLoss.push(myData[i+2].Close- myData[i].Open)
    }
      
   let bl = Math.min(...arrayOfLoss);
 return bl;
 }

 const smallestLossOn1Week= (myData = data) => {
  arrayOfLoss = []
    for (let i = 0; i < myData.length; i++){
      arrayOfLoss.push(myData[i].Close- myData[i].Open)
    }
 
      const filtered = arrayOfLoss.filter(element => {
      return element < 0;
    }) 
    
 
   let bl = Math.max(...filtered);
 return bl;
 }

 const smallestLossOn2Week= (myData = data) => {
  arrayOfLoss = []
    for (let i = 0; i < myData.length-1; i++)
    {
      arrayOfLoss.push(myData[i+1].Close- myData[i].Open)
    }
 
      const filtered = arrayOfLoss.filter(element => {
      return element < 0;
    }) 
    
 
   let bl = Math.max(...filtered);
  return bl;
 }

 const smallestLossOn3Week= (myData = data) => {
  arrayOfLoss = []
    for (let i = 0; i < myData.length; i++){
      arrayOfLoss.push(myData[i].Close- myData[i].Open)
    }
 
      const filtered = arrayOfLoss.filter(element => {
      return element < 0;
    }) 
    
 
   let bl = Math.max(...filtered);
  return bl;
 }

 function decidesOnSellingStrategy(week, twoWeeks, threeWeeks)  {
  //in this case I do not care if there are same values bcoz it is almost impossible in real job of course I would thought about it.

    const array = [week, twoWeeks, threeWeeks];
    let biggest = Math.max(...array);
    let strategy = array.indexOf(biggest)

      return strategy+1;
}

function decidesOnBuyingStrategy(week, twoWeeks, threeWeeks) {
  //in this case I do not care if there are same values bcoz it is almost impossible in real job of course I would thought about it.

  const array = [week, twoWeeks, threeWeeks];
  let biggest = Math.max(...array);
  let strategy = array.indexOf(biggest)

  return strategy+1;
}



const simulator =() => {
//it is simulating working bot 
    let buying = decidesOnBuyingStrategy(biggestWinOn1Week(), biggestWinOn2Week(), biggestWinOn3Week());
    //console.log(buying)
    let selling = decidesOnSellingStrategy(biggestLossOn1Week(), biggestLossOn2Week(), biggestLossOn3Week());
    //console.log(selling);
    let previousState = data[0].Open;
    //console.log(previousState) 
    let sum = 100000;
    let condition = true;
    let xState = data[0].Open;
    let i = 0;
    let quantity = 100000/xState;
      while( i != data.length-1)
      {
        xState = data[i].Close;
        console.log(xState)
        if( ((previousState < xState && (xState-previousState) >= 0.3*biggestWinOn1Week()) || xState < previousState) && condition == true ){
          console.log(biggestWinOn1Week)
          sum = quantity*xState;
          condition = false;
          console.log('sell!')
      }

        //Now I decide when to buy
    
        if(((xState > previousState && xState < maxEver() || xState >= 0.3*minEver() ) && condition==false)){
          condition = true;
          previousState = xState;
          console.log('buy!')
        }   
     
        i = i + buying;

      }
  return sum;
}

console.log(simulator())





router.get('/', (req, res) => {
  res.send('Console');
});

module.exports = router;