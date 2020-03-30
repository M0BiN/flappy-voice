import React from "react";
import sketch from "./sketch";
import P5Wrapper from "react-p5-wrapper";
import "./App.css";
import { useSelector } from "react-redux";
import { setSpeed, setshowBest } from "./sketch";
import voice from "./tensorFlow/voice";
// import './FlappyBirdContainer.css';
navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        console.log('You let me use your mic!')
      })
      .catch(function(err) {
        console.log('No mic for you!')
      });


  
const App = () => {
  
  const [load, setLoad] = React.useState(false);
  const speed = useSelector(store => store.speed);
  const showBest = useSelector(store => store.showBest);
  voice(setLoad);
  setSpeed(speed);
  setshowBest(showBest);

  const game = React.useMemo(() => <P5Wrapper sketch={sketch} />, []);
  return (
    <div className={"FlappyBirdContainer"}>
      {load ? game : <h1>Loading...</h1>}
    </div>
  );
};

export default App;
