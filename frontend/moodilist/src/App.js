import mic  from './assets/microphone-svgrepo-com.svg';
import './App.css';
import {Record} from './Record';

function Mic(){
  const {Startrec} = Record();
  return(
    <div>
        <button className="record" onClick={Startrec}>
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
  return (
    <section className='App'>
      <Name/>
      <div className="box">
        <Mic/>
      </div>
    </section>
  );
}
