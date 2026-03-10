import { SignUp } from "@clerk/clerk-react";
import logo from "../assets/logo.svg"
import {motion} from 'framer-motion';

export default function Logup(){
    return(
        <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:-20 }}
      transition={{ duration:0.3 }}>

        <div className="signup">
            <div className="headlogo">
                <h1 className="heading2">Moodilist</h1>
                <img src={logo} alt="logo" className="logo"/>
            </div>
        <div className="signupform">
        <SignUp
        routing="path" 
        signInUrl="/"
        afterSignUpUrl="/home"
        appearance={{
                            elements:{
                                rootBox:"mx-auto my-auto",
                                card:"shadow-2xl",
                                formButtonPrimary:{backgroundColor:"#4a3aff"

                                },
                                socialButtonsBlockButton:{
                                    backgroundColor:"#27272a"
                                },
                                socialButtonsBlockButton__hover:{
                                    backgroundColor:"#3f3f46"
                                }
                            },
                            variables:{
                                colorBackground:"black",
                                colorText:"white",
                                colorInputBackground:"#27272a"
                            }
                        }
                        }/>
                        </div>
                        </div>
                        </motion.div>
                        
    );
    
}