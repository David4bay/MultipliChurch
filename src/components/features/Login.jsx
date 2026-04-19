import { useLogin } from "../../hooks/useAuth"

function Login({ login }) {
    const { mutate, isPending, isError, error } = useLogin()

    if (!login) return null

    function handleLogin(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        mutate(Object.fromEntries(formData.entries()))
    }

    return (
        <>
            <h1 className="auth__title">Login</h1>
            {isError && <p className="auth__error">{error.message}</p>}
            <form className="auth__form" onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    minLength={6}
                    autoComplete="username"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength={8}
                    autoComplete="current-password"
                    required
                />
                <button type="submit" className="auth__button" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>
        </>
    )
}

export default Login