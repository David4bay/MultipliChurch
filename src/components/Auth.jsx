import { useState } from "react"
import Signup from "./features/Signup"
import Login from "./features/Login"
import "../Auth.css"

function Auth() {
    const [showLogin, setShowLogin] = useState(true)

    return (
        <div className="auth">
            <Login login={showLogin} />
            <Signup login={showLogin} />
            <div className="auth__divider">or</div>
            <button
                onClick={() => setShowLogin(!showLogin)}
                className="auth__toggle"
            >
                {showLogin ? "Switch to Signup" : "Switch to Login"}
            </button>
        </div>
    )
}

export default Auth