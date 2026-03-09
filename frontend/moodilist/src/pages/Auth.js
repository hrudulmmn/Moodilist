import { SignInButton,SignUpButton,UserButton,SignedIn,SignedOut } from "@clerk/clerk-react";
import Home from "./Home";

export function Sign(){
    return(
        <div>
            <header>
                <div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
                    <SignedIn>
                    <Home/>
                    </SignedIn>
                    <SignedOut>
                    <SignInButton/>
                    <SignUpButton/>
                    </SignedOut>
                </div>
            </header>
        </div>
    )
}

