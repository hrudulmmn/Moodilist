import React from 'react';
import {motion} from 'framer-motion';

const Player = ({url}) =>{
    return(
    <motion.div initial={{opacity:0 , y:10}} animate={{opacity:1,y:0}} transition={{delay:0.5}} className='player'>
        <iframe className='player-iframe' 
            title='Player' 
            style={{borderRadius:"15%",border:"none",boxShadow: "0 10px 30px rgba(0,0,0,0.3)"}}
            width="100%"
            height="375"
            src={url}
            allow= "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading='lazy'>
        </iframe>
    </motion.div>
    );
}

export default Player;