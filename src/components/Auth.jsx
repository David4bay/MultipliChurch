import { useState } from 'react';
import Signup from './features/Signup';

function Auth() {

    const [login, setLogin] = useState(true)

    return (
        <>
        <Login login={login} />
        <Signup login={login} />
        <button onClick={() => setLogin(!login)}>{login ? 'Switch to Signup' : 'Switch to Login'}</button>
        </>
    )
    
}

export default Auth;