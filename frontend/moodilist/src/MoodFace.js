import React from "react";

const Mood = ({mood})=>{
    switch(mood){
        case "calm":
            return(
                <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
  <rect x="50" y="50" width="100" height="100" 
        fill="black"
        transform="rotate(45,100,100)"  />
        <line x1="65" y1="80" x2="85" y2="80" stroke="white" stroke-width="12" stroke-linecap="round" />
        <line x1="115" y1="80" x2="135" y2="80" stroke="white" stroke-width="12" stroke-linecap="round" />

  <g fill="#4a4ae2" transform="translate(28,45) scale(0.8)">
    <rect x="80" y="70" width="6" height="60" rx="3" />
    <rect x="90" y="82" width="6" height="35" rx="3" />
    <rect x="100" y="90" width="6" height="20" rx="3" />
    <rect x="110" y="82" width="6" height="35" rx="3" />
    <rect x="120" y="95" width="6" height="10" rx="3" />
    <rect x="70" y="88" width="6" height="25" rx="3" />
    <rect x="60" y="95" width="6" height="10" rx="3" />
  </g>
</svg>
            );

    case "happy":
        return(
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
  <rect x="50" y="50" width="100" height="100" 
        fill="black"
        transform="rotate(45,100,100)"  />
        <path d="M 65 95 Q 75 50 85 95" stroke="white" stroke-width="12" fill="none"/>
        <path d="M 113 95 Q 123 50 133 95" stroke="white" stroke-width="12" fill="none" />
  <g fill="#4a4ae2" transform="translate(28,45) scale(0.8)">
    <rect x="80" y="70" width="6" height="60" rx="3" />
    <rect x="90" y="82" width="6" height="35" rx="3" />
    <rect x="100" y="90" width="6" height="20" rx="3" />
    <rect x="110" y="82" width="6" height="35" rx="3" />
    <rect x="120" y="95" width="6" height="10" rx="3" />
    <rect x="70" y="88" width="6" height="25" rx="3" />
    <rect x="60" y="95" width="6" height="10" rx="3" />
  </g>
</svg>
        );

    case "sad":
        return(
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
  <rect x="50" y="50" width="100" height="100" 
        fill="black"
        transform="rotate(45,100,100)"  />
        <path d="M 52 91 Q 62 46 72 91" stroke="white" stroke-width="12" fill="none" transform="rotate(180,70,80)"/>
        <path d="M 113 91 Q 123 46 133 91" stroke="white" stroke-width="12" fill="none" transform="rotate(180,122,79.75)" />
  <g fill="#4a4ae2" transform="translate(28,45) scale(0.8)">
    <rect x="80" y="70" width="6" height="60" rx="3" />
    <rect x="90" y="82" width="6" height="35" rx="3" />
    <rect x="100" y="90" width="6" height="20" rx="3" />
    <rect x="110" y="82" width="6" height="35" rx="3" />
    <rect x="120" y="95" width="6" height="10" rx="3" />
    <rect x="70" y="88" width="6" height="25" rx="3" />
    <rect x="60" y="95" width="6" height="10" rx="3" />
  </g>
</svg>
        );

    case "stressed":
        return(
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" transform="scale(1.4)">
  <rect x="50" y="50" width="100" height="100" 
        fill="black"
        transform="rotate(45,100,100)"  />
        <path d="M 52 91 Q 62 46 72 91" stroke="white" stroke-width="12" fill="none" transform="rotate(90,59,79.75) translate(0,-15)"/>
        <path d="M 113 95 Q 123 50 133 95" stroke="white" stroke-width="12" fill="none" transform="rotate(270,123,83.75)" />
  <g fill="#4a4ae2" transform="translate(28,45) scale(0.8)">
    <rect x="80" y="70" width="6" height="60" rx="3" />
    <rect x="90" y="82" width="6" height="35" rx="3" />
    <rect x="100" y="90" width="6" height="20" rx="3" />
    <rect x="110" y="82" width="6" height="35" rx="3" />
    <rect x="120" y="95" width="6" height="10" rx="3" />
    <rect x="70" y="88" width="6" height="25" rx="3" />
    <rect x="60" y="95" width="6" height="10" rx="3" />
  </g>
</svg>
        );

    default:return null;
    }
}
export default Mood;