import React from "react";

const Face = ({audiodata})=>{
    const volume = audiodata.length>0?audiodata.reduce((a,b)=>a + b)/audiodata.length : 0;

    return(
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
            <rect x="50" y="50" width="100" height="100" 
            fill="black" stroke="white" stroke-width="2"
            transform="rotate(45,100,100)"  />
            <path d="M 52 91 Q 62 46 72 91" stroke="white" stroke-width="12" fill="none" transform="rotate(180,70,80)"/>
            <path d="M 113 95 Q 123 50 133 95" stroke="white" stroke-width="12" fill="none" />

            <g>
                {volume<5?
                    (<line x1="75" y1="130" x2="125" y2="130" 
                stroke="#4a4ae2" strokeWidth="6" strokeLinecap="round" />):
                ([...Array(7)].map((_,i) => {
                    const h = (audiodata[i*5]/255)* 40 +2;
                    return(
                        <rect
                            key={i}
                            x={80 + i * 6} 
                            y={130 - h / 2} 
                            width="4.8" 
                            height={h} 
                            fill="#4a4ae2" 
                            rx="3" />
                    );
                })
                )}
            </g>
        </svg>
    );
};

export default Face;