import { useState } from "react";
import Signup from "./features/Signup";
import Login from "./features/Login";
import "../Auth.css";

function Auth() {

    const [login, setLogin] = useState(true)

    return (
        <div className="auth">
        <Login login={login} />
        <Signup login={login} />
        <div className="auth__divider">or</div>
        <button 
        onClick={
            () => setLogin(!login)
        }
        className="auth__toggle"
        >{login ? "Switch to Signup" : "Switch to Login"}</button>
        </div>
    )
    
}

export default Auth;