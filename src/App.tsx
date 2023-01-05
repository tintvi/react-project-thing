import {useEffect, useRef, useState} from 'react'
import './App.css'

import click1 from './assets/click1.wav';
import click2 from './assets/click2.wav';

const click1Audio = new Audio(click1);
const click2Audio = new Audio(click2);


function App (){

   const [bpm, setBpm] = useState<number>(150);
   const [playing, setPlaying] = useState<boolean>(false);

   let counter: number = 0;

   useEffect(() => {

       let timer: number | null = null;

       if(playing){
       timer = setInterval(() => {

           if ( (counter % 4) == 0) {
               click1Audio.play();
               console.log('click1');
               counter++;
           }
           else {
               click2Audio.play();
               console.log('click2');
               counter++;
           }

       }, (60/bpm)*1000);

   }
   else {
       clearInterval(timer);
       setPlaying(false);
   }

   return () => {clearInterval(timer)}

   }, [playing, bpm]);

   const stopPlayHandler = () => {
       setPlaying(!playing);
   }

  return (
    <div className="metronome">

        <div className="bpm-slider">
            <div>{bpm} bpm</div>
            <input value={bpm} type="range" min="60" max="240" onChange={event => setBpm(parseInt(event.target.value,10))}/>
        </div>

        <button onClick={stopPlayHandler}>

            {playing ? 'Stop' : 'Play'}

        </button>

    </div>
  )

}
export default App
