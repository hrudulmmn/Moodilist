import { BrowserRouter,Route,Routes,useLocation } from "react-router-dom";
import Login from "../pages/Signin";
import Home from "../pages/Home";
import Logup from "../pages/Signup";
import {AnimatePresence} from 'framer-motion';
import Silk from "../components/Silk";

function Animatewait(){
    const location=useLocation();

    return(
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/signup" element={<Logup/>}></Route>
            </Routes>
        </AnimatePresence>
    )
}

export function RouteMan(){
    return(
        <BrowserRouter>
            <div className="bg">
                <Silk
                    speed={5}
                    scale={1}
                    color="#4a3aff"
                    noiseIntensity={1.5}
                    rotation={0}
                />
                </div>
            <Animatewait/>
        </BrowserRouter>
    )
}