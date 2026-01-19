import mic  from './assets/microphone-svgrepo-com.svg';
import './App.css';
import {Record} from './Record';
import Face from './Liveface';
import Silk from './Silk';
import Mood from './MoodFace';
import {AnimatePresence, motion} from 'framer-motion';
import Player from './Embed';
import retry from './assets/retry-svgrepo-com.svg'

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
    <motion.p className="heading" initial={{opacity:0,filter:"blur(20px)"}} animate={{opacity:1,filter:"blur(0px)"}} transition={{duration:0.7, type:"spring",stiffness:50,delay:0.2}}>Moodilist</motion.p>
  );
}
function Description({state,mood}){
  return(
    <AnimatePresence mode="wait">
    {(()=>{
    switch(state){
      case "idle":return <motion.p key="idle" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.2}} exit={{opacity:0,scale:0}}>Click mic to start speaking</motion.p>;
      case "recording":return <motion.p key="rec" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}>Audio is being recorded</motion.p>;
      case "processing":return <motion.p key="pro" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}>Detecting Mood...</motion.p>;
      case "result":return <motion.p key="res" initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}>You are {mood}. Playing appropriate Music!</motion.p>;
      default: return null;
    }
  })()}
    </AnimatePresence>
  );
}

function Render({state,mood,StartRecord,audiodata,url}){
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
      case "playing": return(
        <motion.div initial={{opacity:0,h:20}} animate={{opacity:1,h:0}}><Player url={url}/>
        <button onClick={()=>window.location.reload()} className='retbtn'>
          <img src={retry} className='retry'/>
        </button>
        </motion.div>
      );
      default: return null;
  }
  })()}
  </AnimatePresence>
  );
}

export default function App() {
  const {Startrec,recording,audiodata,state,mood,url} = Record();
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
        <Render state={state} mood={mood} StartRecord={Startrec} audiodata={audiodata} url={url}/>
      </div>
      <div className='desc'>
          <Description state={state} mood={mood}/>
      </div>
      </div>
    </section>
  );
}
