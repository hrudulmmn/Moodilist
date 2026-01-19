import {useState,useRef} from "react";
import audioBufferToWav from "audiobuffer-to-wav";


export function Record(){
    const [recording,recordState] = useState(false);
    const [audiodata,setAudiodata] = useState(new Uint8Array(0));
    const audiorec = useRef(null);
    const chunks = useRef([]);
    const [time,limit] = useState(5);
    const [state,setState] = useState("idle");
    const [mood,setMood] = useState(null);
    const [url,seturl] = useState(null)
    const animationref = useRef();

    const Startrec = async () => {
        if (recording) return;
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});

        const Audiocontent = new(window.AudioContext || window.webkitAudioContext)();
        const source = Audiocontent.createMediaStreamSource(stream);
        const analyse = Audiocontent.createAnalyser();
        analyse.fftSize = 256;
        source.connect(analyse)
        const Update = () =>{
            const data = new Uint8Array(analyse.frequencyBinCount);
            analyse.getByteFrequencyData(data);
            setAudiodata(data);
            animationref.current = requestAnimationFrame(Update);
        }
        Update();

        audiorec.current = new MediaRecorder(stream);
        chunks.current = [];

        audiorec.current.ondataavailable = (e) =>{
           if(e.data.size>0) chunks.current.push(e.data);
        }

        audiorec.current.onstop = async () => {
            setState("processing");
            cancelAnimationFrame(animationref.current);
            const WBlob = new Blob(chunks.current,{type:'audio/webm'});
            const arraybuffer = await WBlob.arrayBuffer();
            const context = new (window.AudioContext || window.webkitAudioContext)({sampleRate:22050});
            const audiobuffer = await context.decodeAudioData(arraybuffer);
            const wavarr = audioBufferToWav(audiobuffer);
            const wav = new Blob([wavarr],{type:"audio/wav"});

            stream.getTracks().forEach(track => track.stop());
            recordState(false);

            const formdata = new FormData();
            formdata.append("file",wav,"recording.wav");
            try{
                const resp = await fetch("http://127.0.0.1:8000/predict",{
                    method: "POST",
                    body: formdata
                });
                const res = await resp.json();
                console.log(res);
                setState("result");
                setMood(res.mood);
                seturl(res.url)
                
                setTimeout(()=>{
                    setState("playing");
                },4000)
            }
            catch(error){
                console.log("Connection error");
            }
        }
        audiorec.current.start();
        recordState(true);
        setState("recording");
        limit(5);


        const timer = setInterval(()=>{
            limit((prev)=>{
                if(prev<=1){
                    clearInterval(timer);
                    if(audiorec.current.state ==='recording'){
                        audiorec.current.stop();
                    }
                    return 0;
                }
                return prev-1;
            });
        },1000)
    }
    return {Startrec,recording,audiodata,state,mood,url};
}