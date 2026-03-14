import { BrowserRouter,Navigate,Route,Routes,useLocation } from "react-router-dom";
import Login from "../pages/Signin";
import Home from "../pages/Home";
import Logup from "../pages/Signup";
import {AnimatePresence} from 'framer-motion';
import Silk from "../components/Silk";
import { Sign } from "../auth/Auth";

function Animatewait(){
    const location=useLocation();

    return(
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Sign/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/signup" element={<Logup/>}></Route>
                <Route path="/signin" element={<Login/>}></Route>
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