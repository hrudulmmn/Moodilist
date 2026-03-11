import {SignIn } from "@clerk/clerk-react";
import {motion} from 'framer-motion';

export default function Login(){
    return(
        <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3 }}
      exit={{opacity:0, y:20}}>
       <div className="auth">
        <h1 className="heading2">Moodilist</h1>
        <SignIn signUpUrl="/signup" routing="path" path="/signin" afterSignInUrl="/home" appearance={{
                            elements:{
                                rootBox:"mx-auto",
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
                        </motion.div>
                        
    );
}