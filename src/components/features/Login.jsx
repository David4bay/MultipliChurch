

function Login(props) {

    if (!props.login) {
        return null
    }

    return (
        <>
            <h1 className="auth__title">Login</h1>
            <form className="auth__form">
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="button" className="auth__button">Login</button>
            </form>
        </>
    )
}

export default Login;