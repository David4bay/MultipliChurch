

function Signup(props) {

    if (props.login) {
        return null
    }

    return (
        <div className="signup">
            <h1>Signup</h1>
            <form>
                <input type="text" placeholder="Username" name="username" />
                <input type="password" placeholder="Password" name="password" />
                <button type="button">Signup</button>
            </form>
        </div>
    )
}

export default Signup;