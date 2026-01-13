import mic  from './assets/microphone-svgrepo-com.svg';
import './App.css';
import {Record} from './Record';
import Face from './Liveface';

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
      <Name/>
      <div className="box">
        {recording?<Face audiodata={audiodata}/>:<Mic StartRecord={Startrec}/>}
      </div>
    </section>
  );
}
