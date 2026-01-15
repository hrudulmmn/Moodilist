import mic  from './assets/microphone-svgrepo-com.svg';
import './App.css';
import {Record} from './Record';
import Face from './Liveface';
import Silk from './Silk';
import Mood from './MoodFace';


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
  switch(state){
      case "idle":return <Mic StartRecord={StartRecord}/> ;
      case "recording":return <Face audiodata={audiodata}/>;
      case "processing":return(
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
        <rect x="50" y="50" width="100" height="100" 
        fill="black"
        transform="rotate(45,100,100)"  />
        </svg>
      );
      case "result":return <Mood mood={mood}/>;
      default: return null;
  }
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
