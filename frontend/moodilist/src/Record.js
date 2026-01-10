import { useState,useRef} from "react";
import audioBufferToWav from "audiobuffer-to-wav";


export function Record(){
    const [recording,recordState] = useState(false);
    const audiorec = useRef(null);
    const chunks = useRef([]);
    const [time,limit] = useState(5);

    const Startrec = async () => {
        if (recording) return;
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});

        audiorec.current = new MediaRecorder(stream);
        audiorec.current.start();
        chunks.current = [];
        recordState(true);
        limit(5);

        audiorec.current.ondataavailable = (e) =>{
           if(e.data.size>0) chunks.current.push(e.data);
        }

        audiorec.current.onstop = async () => {
            const WBlob = new Blob(chunks.current,{type:'audio/webm'});
            const arraybuffer = await WBlob.arrayBuffer();
            const context = new (window.AudioContext || window.webkitAudioContext)({sampleRate:22050});
            const audiobuffer = await context.decodeAudioData(arraybuffer);
            const wavarr = audioBufferToWav(audiobuffer);
            const wav = new Blob([wavarr],{type:"audio/wav"})

            stream.getTracks().forEach(track => track.stop())
            recordState(false)
        }

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
        },5000)
    }
    return {Startrec};
}