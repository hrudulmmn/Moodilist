import { BrowserRouter,Route,Routes } from "react-router-dom";
import {Sign} from "../pages/Auth";
import Home from "../pages/Home";

export function RouteMan(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Sign/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}