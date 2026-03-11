import { RedirectToSignIn, SignedIn,SignedOut} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Login from "../pages/Signin";
import "../App.css"

export function Sign(){
    return(
                <div style={{display:"flex", justifyContent:"center", alignItems:"center",marginTop:"50px"}}>
                    <SignedIn>
                    <Navigate to="/home" replace/>
                    </SignedIn>
                    <SignedOut>
                        <RedirectToSignIn/>
                    </SignedOut>
                    </div>
               
    )
}

