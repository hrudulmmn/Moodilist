import mic  from './assets/microphone-svgrepo-com.svg';
import './App.css';
import {Record} from './Record';
import Face from './Liveface';
import Silk from './Silk';
import Mood from './MoodFace';
import {AnimatePresence, motion} from 'framer-motion';

function Mic({StartRecord}){
  return(
    <div>
        <button className="record" onClick={StartRecord}>
          <img className='imgmic' src={mic} alt="mic" />
        </button>
      </div>
  );
}

function Name(){
  return(
    <p className="heading">Moodilist</p>
  );
}
function Description({state,mood}){
  {
    switch(state){
      case "idle":return <p>Click mic to start speaking</p>;
      case "recording":return <p>Audio is being recorded</p>;
      case "processing":return <p>Detecting Mood...</p>;
      case "result":return <p>You are {mood}. Playing appropriate Music!</p>;
      default: return null;
    }
  }
}

function Render({state,mood,StartRecord,audiodata}){
  return(
  <AnimatePresence mode='wait'>
    {(()=>{
  switch(state){
      case "idle":return(
        <motion.div key="idle" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.2,ease:"easeIn"}} exit={{opacity:0,scale:0}}>
        <Mic StartRecord={StartRecord}/> 
        </motion.div>
      );

      case "recording":return(
        <motion.div key="rec" initial={{opacity:0,scale:0, y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0,y:-20}}>
        <Face audiodata={audiodata}/>
        </motion.div>
      );
      case "processing":return(
        <motion.div key="pros" initial={{opacity:0,rotateY:0}} animate={{opacity:1,rotateY:[0,180,360]}} exit={{opacity:0,scale:2,transition:{duration:2}}} transition={{rotateY:{repeat:Infinity , duration:1.5,ease:'linear'}}}>
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
        <rect x="50" y="50" width="100" height="100" 
        fill="black"
        transform="rotate(45,100,100)"  />
        </svg>
        </motion.div>
      );
      case "result":return(
        <motion.div key="res" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,scale:0}} transition={{type:"spring",bounce:0.5}}>
        <Mood mood={mood}/>
        </motion.div>
      );
      default: return null;
  }
  })()}
  </AnimatePresence>
  );
}

export default function App() {
  const {Startrec,recording,audiodata,state,mood} = Record();
  return (
    <section className='App'>
    <div className='bg'>  <Silk
          speed={5}
          scale={1}
          color="#4a3aff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>
      <div className='contents'>
      <Name/>
      <div className="box">
        <Render state={state} mood={mood} StartRecord={Startrec} audiodata={audiodata}/>
      </div>
      <div className='desc'>
          <Description state={state} mood={mood}/>
      </div>
      </div>
    </section>
  );
}
