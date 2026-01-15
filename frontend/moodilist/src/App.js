import mic  from './assets/microphone-svgrepo-com.svg';
import './App.css';
import {Record} from './Record';
import Face from './Liveface';
import Silk from './Silk';


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

export default function App() {
  const {Startrec,recording,audiodata} = Record();
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
        {recording?<Face audiodata={audiodata}/>:<Mic StartRecord={Startrec}/>}
      </div>
      </div>
    </section>
  );
}
