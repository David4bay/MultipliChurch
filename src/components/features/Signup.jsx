import { useSignup } from "../../hooks/useAuth"

function Signup({ login }) {
    const { mutate, isPending, isError, isSuccess, error } = useSignup()

    if (login) return null

    function handleSignup(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        mutate(Object.fromEntries(formData.entries()))
    }

    return (
        <>
            <h1 className="auth__title">Signup</h1>
            {isError && <p className="auth__error">{error.message}</p>}
            {isSuccess && <p className="auth__success">Account created! Please log in.</p>}
            <form className="auth__form" onSubmit={handleSignup}>
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
                    autoComplete="new-password"
                    required
                />
                <select name="role" required defaultValue="Member">
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                </select>
                <button type="submit" className="auth__button" disabled={isPending}>
                    {isPending ? "Creating account..." : "Signup"}
                </button>
            </form>
        </>
    )
}

export default Signup