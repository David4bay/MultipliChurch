

function Login(props) {

    if (!props.login) {
        return null
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="button">Login</button>
            </form>
        </div>
    )
}

export default Login;